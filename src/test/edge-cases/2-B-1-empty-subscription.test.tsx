/**
 * 엣지케이스 2-B-1: 구독 0개 상태
 *
 * 검증 대상:
 *  - PressGrid는 items가 비어도 6×4 = 24 셀의 흰 골격을 유지한다.
 *  - 부분적으로 채워진 경우에도 항상 24 셀, 빈 슬롯은 비-인터랙티브.
 *  - Newsstand에서 구독을 모두 해지하면 구독 탭 진입 시 스켈레톤만 표시,
 *    배지가 0곳으로 갱신된다.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import PressGrid from '../../components/PressGrid';
import Newsstand from '../../components/Newsstand';
import type { PressData } from '../../types';

const stub = (n: number): PressData[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `t${i + 1}`,
    name: `T${i + 1}`,
    wordmark: { name: `T${i + 1}`, color: '#000', weight: 500 },
    primaryCategory: '종합/경제',
  }));

function gridChildren(root: Element) {
  return Array.from(root.children) as HTMLElement[];
}
function interactiveCells(root: Element) {
  return gridChildren(root).filter(
    (el) => el.getAttribute('role') === 'button',
  );
}
/**
 * GridCell에 role="button"이 있어 내부 SubscribePill 텍스트가 accessible name으로
 * 합쳐진다. 실제 <button> 태그(=SubscribePill)만 필터링하기 위한 헬퍼.
 */
function pillButtons(label: string): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll('button')).filter(
    (b) => b.textContent === label,
  );
}

describe('PressGrid — 골격 유지', () => {
  it('items=[] 일 때 24개 셀 모두 빈 셀로 렌더된다', () => {
    const { container } = render(
      <PressGrid
        items={[]}
        subscribedIds={new Set()}
        onSubscribe={() => {}}
        onUnsubscribe={() => {}}
        onOpen={() => {}}
      />,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid.children).toHaveLength(24);
    expect(interactiveCells(grid)).toHaveLength(0);
  });

  it('items가 5개면 5 GridCell + 19 빈 셀 (총 24) 유지된다', () => {
    const { container } = render(
      <PressGrid
        items={stub(5)}
        subscribedIds={new Set(['t1', 't2'])}
        onSubscribe={() => {}}
        onUnsubscribe={() => {}}
        onOpen={() => {}}
      />,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid.children).toHaveLength(24);
    expect(interactiveCells(grid)).toHaveLength(5);
  });
});

describe('Newsstand — 구독 0개 통합 시나리오', () => {
  it('모든 언론사 해지 후 구독 탭 진입 시 GridCell 사라지고 배지 0곳', async () => {
    const user = userEvent.setup();
    render(<Newsstand />);

    // 초기: 기본 구독 8개 (DEFAULT_SUBSCRIBED_IDS)
    expect(
      screen.getByLabelText('구독 중인 언론사 8곳'),
    ).toBeInTheDocument();

    // 구독 탭으로 전환
    await user.click(screen.getByRole('tab', { name: /내가 구독한/ }));

    // 구독 탭에서 8개의 해지 pill 노출
    expect(pillButtons('해지하기')).toHaveLength(8);

    // 8개 모두 해지 (재렌더 안전을 위해 매번 재조회)
    let safety = 10;
    while (safety-- > 0) {
      const pills = pillButtons('해지하기');
      if (pills.length === 0) break;
      await user.click(pills[0]);
    }

    // 배지 0곳 + 인터랙티브 셀 사라짐
    expect(
      screen.getByLabelText('구독 중인 언론사 0곳'),
    ).toBeInTheDocument();
    expect(pillButtons('해지하기')).toHaveLength(0);
    // 그리드 골격 자체는 유지 — 24개 빈 셀 (rendered 그리드 컨테이너의 자식 수)
    // 그리드 컨테이너 식별: GridCell이 모두 없어졌으므로 상위 컨테이너를
    // 24개 자식을 가진 div로 구조 탐색
    const candidates = Array.from(
      document.querySelectorAll('div'),
    ).filter((d) => d.children.length === 24);
    expect(candidates.length).toBeGreaterThanOrEqual(1);
  });
});
