#!/bin/bash
# Stop hook: when the last user message expresses a permanent directive,
# extract it via `claude -p` and append to ./CLAUDE.md.

# Prevent infinite recursion when this hook spawns `claude -p`
[ "$CLAUDE_MD_HOOK_RUNNING" = "1" ] && exit 0

command -v jq >/dev/null 2>&1 || exit 0
command -v claude >/dev/null 2>&1 || exit 0

INPUT=$(cat)
TRANSCRIPT_PATH=$(printf '%s' "$INPUT" | jq -r '.transcript_path // empty')
CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty')

[ -z "$TRANSCRIPT_PATH" ] && exit 0
[ ! -f "$TRANSCRIPT_PATH" ] && exit 0
[ -z "$CWD" ] && CWD=$(pwd)

CLAUDE_MD="$CWD/CLAUDE.md"

# Last user message text only (skip tool_result/system entries)
LAST_USER=$(jq -c 'select(.type == "user")' "$TRANSCRIPT_PATH" 2>/dev/null | tail -n 1)
[ -z "$LAST_USER" ] && exit 0

LAST_TEXT=$(printf '%s' "$LAST_USER" | jq -r '
  if (.message.content | type) == "string" then .message.content
  else (.message.content | map(select(.type == "text") | .text) | join("\n"))
  end
' 2>/dev/null)

[ -z "$LAST_TEXT" ] && exit 0

# Pre-filter: skip unless the user message looks like a permanent directive
if ! printf '%s' "$LAST_TEXT" | grep -qiE '앞으로|항상|절대|매번|기억|계속|무조건|규칙|지침|always|never|from now on|remember|every time'; then
  exit 0
fi

EXISTING=""
[ -f "$CLAUDE_MD" ] && EXISTING=$(cat "$CLAUDE_MD")

PROMPT=$(cat <<EOF
You extract permanent directives from a user message in a Claude Code session.

Rules:
1. Only extract rules the user wants followed in FUTURE work, not one-off task instructions or questions.
2. Skip anything already covered in the existing CLAUDE.md below (deduplicate).
3. If new rules exist, output ONLY markdown bullet lines starting with "- ".
4. If no new permanent rule, output exactly: NONE
5. Match the language of the user message (Korean stays Korean).
6. No preamble, no explanation, no code fences.

=== Existing CLAUDE.md ===
$EXISTING

=== User message ===
$LAST_TEXT
EOF
)

ANALYSIS=$(CLAUDE_MD_HOOK_RUNNING=1 claude -p --model haiku "$PROMPT" 2>/dev/null)
ANALYSIS=$(printf '%s' "$ANALYSIS" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

if [ -z "$ANALYSIS" ] || [ "$ANALYSIS" = "NONE" ]; then
  exit 0
fi

# First write: seed file with a header
if [ ! -f "$CLAUDE_MD" ]; then
  printf '# Project Rules\n\nAuto-captured permanent directives from session feedback. Edit freely.\n\n' > "$CLAUDE_MD"
fi

printf '%s\n' "$ANALYSIS" >> "$CLAUDE_MD"

printf '{"systemMessage": "CLAUDE.md updated with new directive(s)"}\n'
