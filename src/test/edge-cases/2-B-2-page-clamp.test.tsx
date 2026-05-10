/**
 * 엣지케이스 2-B-2: 마지막 페이지에서 구독 해지 → 페이지 수 줄어드는 케이스
 *
 * 시나리오 (state-flow.md S2):
 *   1. 전체 탭 page1에서 모든 미구독 18개를 추가 구독 → 26명 구독
 *   2. 구독 탭으로 전환 → totalPages=2
 *   3. 다음 페이지로 이동 → page=1, 2개 GridCell 표시
 *   4. 표시된 2개를 모두 해지 → subscribed=24, totalPages=1
 *   5. safePage = min(1, 0) = 0 → page1 콘텐츠로 자동 표시
 *   6. 양쪽 chevron 모두 disabled
 *   7. 다시 구독을 늘리면 page state(=1)가 살아있어 마지막 페이지로 복귀 가능
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Newsstand from '../../components/Newsstand';

function pillButtons(label: string): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll('button')).filter(
    (b) => b.textContent === label,
  );
}

async function clickAll(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  cap = 30,
) {
  while (cap-- > 0) {
    const btns = pillButtons(label);
    if (btns.length === 0) break;
    await user.click(btns[0]);
  }
}

describe('Newsstand — 페이지 클램프', () => {
  it('마지막 페이지의 모든 구독을 해지하면 안전 페이지로 클램프되고 chevron 양쪽 disabled', async () => {
    const user = userEvent.setup();
    render(<Newsstand />);

    // 전체 탭 page1: 24 셀 중 6개 기본 구독 / 18개 미구독
    expect(pillButtons('구독하기')).toHaveLength(18);
    expect(pillButtons('해지하기')).toHaveLength(6);

    // 18개 모두 구독 → 24 (page1) + p26 + p49 = 26명 구독
    await clickAll(user, '구독하기');
    expect(
      screen.getByLabelText('구독 중인 언론사 26곳'),
    ).toBeInTheDocument();

    // 구독 탭으로 전환 → 26명 / page0 / totalPages=2
    await user.click(screen.getByRole('tab', { name: /내가 구독한/ }));
    expect(pillButtons('해지하기')).toHaveLength(24); // page0 가득

    const prev = screen.getByRole('button', { name: '이전 페이지' });
    const next = screen.getByRole('button', { name: '다음 페이지' });
    expect(prev).toBeDisabled(); // page0
    expect(next).toBeEnabled();

    // 다음 페이지 → page1: 26 - 24 = 2개 GridCell
    await user.click(next);
    expect(pillButtons('해지하기')).toHaveLength(2);
    expect(prev).toBeEnabled();
    expect(next).toBeDisabled();

    // page1의 2개 GridCell을 명시적으로 해지.
    // clickAll로 돌리면 클램프 후 새로 노출된 page0의 24 pill을 계속 클릭해버림.
    await user.click(pillButtons('해지하기')[0]); // 26 → 25
    await user.click(pillButtons('해지하기')[0]); // 25 → 24 (totalPages 2→1, clamp)

    // 클램프 결과: page state는 1로 남지만 safePage=0 → page1 콘텐츠 표시
    expect(pillButtons('해지하기')).toHaveLength(24);
    expect(
      screen.getByLabelText('구독 중인 언론사 24곳'),
    ).toBeInTheDocument();

    // 양쪽 chevron disabled (single page)
    expect(screen.getByRole('button', { name: '이전 페이지' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '다음 페이지' })).toBeDisabled();
  });

  it('클램프 후 다시 구독을 늘리면 마지막 페이지로 복귀 가능 (page state 보존)', async () => {
    const user = userEvent.setup();
    render(<Newsstand />);

    // 전체 페이지 1에서 모두 구독 (24개 구독, total 26)
    await clickAll(user, '구독하기');

    // 구독 탭으로 전환, 마지막 페이지 진입, 모두 해지
    await user.click(screen.getByRole('tab', { name: /내가 구독한/ }));
    await user.click(screen.getByRole('button', { name: '다음 페이지' }));
    // page1의 2개만 해지
    await user.click(pillButtons('해지하기')[0]);
    await user.click(pillButtons('해지하기')[0]);

    // 다음 페이지 비활성 (totalPages=1)
    expect(screen.getByRole('button', { name: '다음 페이지' })).toBeDisabled();

    // 전체 탭으로 가서 page2 의 미구독 1개 더 구독해 25명으로 만든다
    await user.click(screen.getByRole('tab', { name: '전체 언론사' }));
    // 전체 탭 page0 → 다음 페이지 (page1, p25-p48)
    await user.click(screen.getByRole('button', { name: '다음 페이지' }));
    // 1개 구독
    const subs = pillButtons('구독하기');
    expect(subs.length).toBeGreaterThan(0);
    await user.click(subs[0]);
    expect(
      screen.getByLabelText('구독 중인 언론사 25곳'),
    ).toBeInTheDocument();

    // 구독 탭으로 돌아가면 page=0으로 리셋(설계상)
    await user.click(screen.getByRole('tab', { name: /내가 구독한/ }));
    // 25명 → totalPages=2, page=0, 다음 페이지 enabled
    expect(screen.getByRole('button', { name: '다음 페이지' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '다음 페이지' }));
    // page=1, 1개 표시
    expect(pillButtons('해지하기')).toHaveLength(1);
  });
});
