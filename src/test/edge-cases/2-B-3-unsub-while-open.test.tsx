/**
 * 엣지케이스 2-B-3: 오픈 상태에서 해당 언론사 구독 해지
 *
 * 현 정책 (state-flow.md S3):
 *   PressOpen은 닫지 않는다. 본문 계속 노출, 구독 pill만 "해지하기" → "구독하기"로 토글.
 *   이는 사용자가 "방금 보고 있던 화면이 사라지는 놀람"을 피하기 위함.
 *
 * 검증 항목:
 *  - 오픈 후 해지: PressOpen 본문(footnote)이 그대로 남는다
 *  - pill 텍스트가 "해지하기" → "구독하기"로 변경
 *  - 그리드 모드로 자동 복귀하지 않는다 (옵션 처리 안 함)
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Newsstand from '../../components/Newsstand';

describe('Newsstand — 오픈 중 구독 해지', () => {
  it('오픈된 언론사 해지 시 PressOpen 유지 + pill만 "구독하기"로 전환', async () => {
    const user = userEvent.setup();
    render(<Newsstand />);

    // 기본 구독 중인 헤럴드경제(p03) 셀을 오픈
    const cell = screen.getByRole('button', { name: /헤럴드경제/ });
    await user.click(cell);

    // PressOpen 마운트 확인 (footnote는 PressOpen에만 존재)
    expect(
      screen.getByText('헤럴드경제 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();

    // 헤더의 해지 pill (오픈 모드에서는 PressGrid가 사라져 pill 1개만 존재)
    const headerPill = screen.getByRole('button', { name: '해지하기' });
    await user.click(headerPill);

    // PressOpen 그대로 — footnote 유지
    expect(
      screen.getByText('헤럴드경제 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();

    // pill이 구독하기로 전환
    expect(
      screen.getByRole('button', { name: '구독하기' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '해지하기' }),
    ).not.toBeInTheDocument();

    // 배지 -1 (8 → 7)
    expect(
      screen.getByLabelText('구독 중인 언론사 7곳'),
    ).toBeInTheDocument();

    // 다시 구독으로 토글 가능 (역방향 검증)
    await user.click(screen.getByRole('button', { name: '구독하기' }));
    expect(
      screen.getByRole('button', { name: '해지하기' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('구독 중인 언론사 8곳'),
    ).toBeInTheDocument();
  });

  it('미구독 언론사 오픈 후 구독해도 PressOpen 유지', async () => {
    const user = userEvent.setup();
    render(<Newsstand />);

    // 미구독 셀(서울경제, p01) 오픈
    const cell = screen.getByRole('button', { name: /서울경제/ });
    await user.click(cell);

    // 헤더의 구독 pill
    const headerPill = screen.getByRole('button', { name: '구독하기' });
    await user.click(headerPill);

    // PressOpen 유지 + pill 전환 + 배지 +1
    expect(
      screen.getByText('서울경제 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '해지하기' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('구독 중인 언론사 9곳'),
    ).toBeInTheDocument();
  });
});
