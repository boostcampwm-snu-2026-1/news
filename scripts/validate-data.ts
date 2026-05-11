/**
 * publishers.json ↔ frontpages.json 정합성 검증.
 *   npx tsx scripts/validate-data.ts
 *
 * 실패 시 비정상 종료(exit 1) — CI/사전 커밋에 연결 가능.
 */
import publishers from '../src/data/publishers.json' with { type: 'json' };
import frontpages from '../src/data/frontpages.json' with { type: 'json' };
import type { Publisher, FrontPage, PublisherCategory } from '../src/types';

const VALID_CATEGORIES: PublisherCategory[] = ['종합/경제', '방송/통신', 'IT'];
const MIN_SUB_ARTICLES = 5;
const REQUIRED_HOT_RANKS: Array<1 | 2 | 3> = [1, 2, 3];

const errors: string[] = [];
const warn = (msg: string) => errors.push(msg);

const pubs = publishers as Publisher[];
const fps = frontpages as FrontPage[];

// 1. publishers 자체 검증
const seenIds = new Set<string>();
for (const p of pubs) {
  if (seenIds.has(p.id)) warn(`[publishers] 중복 id: ${p.id}`);
  seenIds.add(p.id);

  if (!p.name) warn(`[publishers:${p.id}] name 누락`);
  if (!p.logoUrl) warn(`[publishers:${p.id}] logoUrl 누락`);
  if (!p.thumbnailUrl) warn(`[publishers:${p.id}] thumbnailUrl 누락`);
  if (!p.siteUrl) warn(`[publishers:${p.id}] siteUrl 누락`);
  if (!VALID_CATEGORIES.includes(p.category))
    warn(`[publishers:${p.id}] 잘못된 category "${p.category}"`);
  if (typeof p.isMajor !== 'boolean')
    warn(`[publishers:${p.id}] isMajor가 boolean이 아님`);
}

// 2. frontpages 자체 + 매칭 검증
const fpByPublisher = new Map<string, FrontPage>();
for (const fp of fps) {
  if (fpByPublisher.has(fp.publisherId))
    warn(`[frontpages] 중복 publisherId: ${fp.publisherId}`);
  fpByPublisher.set(fp.publisherId, fp);

  if (!seenIds.has(fp.publisherId))
    warn(`[frontpages:${fp.publisherId}] publishers에 없는 id`);

  if (!fp.editedAt || Number.isNaN(Date.parse(fp.editedAt)))
    warn(`[frontpages:${fp.publisherId}] editedAt이 ISO 문자열이 아님`);

  // mainArticle
  const m = fp.mainArticle;
  if (!m) warn(`[frontpages:${fp.publisherId}] mainArticle 누락`);
  else {
    if (!m.id || !m.title) warn(`[frontpages:${fp.publisherId}] mainArticle.id/title 누락`);
    if (!m.lead) warn(`[frontpages:${fp.publisherId}] mainArticle.lead 누락 (메인은 리드 필수)`);
    if (!m.imageUrl) warn(`[frontpages:${fp.publisherId}] mainArticle.imageUrl 누락`);
  }

  // subArticles
  if (!Array.isArray(fp.subArticles) || fp.subArticles.length < MIN_SUB_ARTICLES)
    warn(`[frontpages:${fp.publisherId}] subArticles ${MIN_SUB_ARTICLES}개 미만 (현재 ${fp.subArticles?.length ?? 0})`);
  fp.subArticles?.forEach((a, i) => {
    if (!a.id || !a.title)
      warn(`[frontpages:${fp.publisherId}] subArticles[${i}] id/title 누락`);
  });

  // hotArticles
  if (!Array.isArray(fp.hotArticles) || fp.hotArticles.length !== 3) {
    warn(`[frontpages:${fp.publisherId}] hotArticles는 정확히 3개 (현재 ${fp.hotArticles?.length ?? 0})`);
  } else {
    const ranks = fp.hotArticles.map((h) => h.rank).sort();
    if (JSON.stringify(ranks) !== JSON.stringify(REQUIRED_HOT_RANKS))
      warn(`[frontpages:${fp.publisherId}] hotArticles rank가 1·2·3이 아님 (${ranks.join(',')})`);
    fp.hotArticles.forEach((h, i) => {
      if (!h.title) warn(`[frontpages:${fp.publisherId}] hotArticles[${i}] title 누락`);
    });
  }

  // featureBox (옵션)
  if (fp.featureBox) {
    const f = fp.featureBox;
    if (f.type !== 'person' && f.type !== 'column')
      warn(`[frontpages:${fp.publisherId}] featureBox.type 잘못됨`);
    if (!f.name) warn(`[frontpages:${fp.publisherId}] featureBox.name 누락`);
    if (!Array.isArray(f.bullets) || f.bullets.length === 0)
      warn(`[frontpages:${fp.publisherId}] featureBox.bullets 비어있음`);
  }
}

// 3. 모든 publisher가 frontpage를 가지는지
for (const p of pubs) {
  if (!fpByPublisher.has(p.id))
    warn(`[matching] publisher "${p.id}" 의 frontpage 없음`);
}

// 4. 카테고리 분포 리포트 (정보)
const catCount = pubs.reduce<Record<string, number>>((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1;
  return acc;
}, {});
const majorCount = pubs.filter((p) => p.isMajor).length;

console.log('────── 데이터 정합성 리포트 ──────');
console.log(`publishers: ${pubs.length}개`);
console.log(`frontpages: ${fps.length}개`);
console.log('카테고리 분포:', catCount);
console.log(`주요언론사(isMajor): ${majorCount}개`);
console.log('');

if (errors.length === 0) {
  console.log('✅ 검증 통과');
  process.exit(0);
} else {
  console.error(`❌ 검증 실패 — ${errors.length}건`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
