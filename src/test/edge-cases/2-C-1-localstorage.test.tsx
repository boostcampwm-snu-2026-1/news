/**
 * 추가 기능 2-C-1: 구독 정보 localStorage 영속화
 *
 * 검증 항목:
 *  - localStorage 비어있을 때 첫 마운트는 DEFAULT_SUBSCRIBED_IDS 사용
 *  - 구독/해지마다 localStorage가 즉시 갱신
 *  - 다음 마운트에서 저장된 IDs로 복원
 *  - 잘못된 형식의 저장값(배열 아님 / JSON 파싱 실패)은 기본값으로 폴백
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Newsstand from '../../components/Newsstand';
import { __TEST__ } from '../../hooks/useSubscriptions';

const KEY = __TEST__.STORAGE_KEY;

function readStored(): string[] | null {
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

describe('useSubscriptions — localStorage 영속화', () => {
  it('localStorage 비어있을 때 기본 구독 8개로 시작 + 첫 마운트 직후 저장', () => {
    expect(window.localStorage.getItem(KEY)).toBeNull();

    render(<Newsstand />);

    expect(
      screen.getByLabelText('구독 중인 언론사 8곳'),
    ).toBeInTheDocument();
    // useEffect가 즉시 첫 영속화를 수행
    const stored = readStored();
    expect(stored).not.toBeNull();
    expect(stored).toHaveLength(8);
  });

  it('해지/구독 시 localStorage가 즉시 갱신된다', () => {
    render(<Newsstand />);

    // 헤럴드경제(p03, 기본 구독) 셀 오픈 → 해지
    fireEvent.click(screen.getByRole('button', { name: /헤럴드경제/ }));
    fireEvent.click(screen.getByRole('button', { name: '해지하기' }));

    expect(readStored()).toHaveLength(7);
    expect(readStored()).not.toContain('p03');

    // 다시 구독
    fireEvent.click(screen.getByRole('button', { name: '구독하기' }));
    expect(readStored()).toHaveLength(8);
    expect(readStored()).toContain('p03');
  });

  it('저장된 IDs가 다음 마운트에서 복원된다', () => {
    // 1차 마운트: p03 해지
    const { unmount } = render(<Newsstand />);
    fireEvent.click(screen.getByRole('button', { name: /헤럴드경제/ }));
    fireEvent.click(screen.getByRole('button', { name: '해지하기' }));
    unmount();

    expect(readStored()).toHaveLength(7);

    // 2차 마운트: 저장된 7개로 복원
    render(<Newsstand />);
    expect(
      screen.getByLabelText('구독 중인 언론사 7곳'),
    ).toBeInTheDocument();
  });

  it('잘못된 저장값은 기본값으로 폴백 + 다음 쓰기에서 정상 복구', () => {
    // 손상된 저장값 시뮬레이션
    window.localStorage.setItem(KEY, '{"not":"an array"}');

    render(<Newsstand />);
    // 폴백된 기본 8개
    expect(
      screen.getByLabelText('구독 중인 언론사 8곳'),
    ).toBeInTheDocument();
    // useEffect가 정상 형식(배열)으로 덮어씀
    const stored = readStored();
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(8);
  });

  it('JSON 파싱 실패 저장값도 기본값으로 폴백', () => {
    window.localStorage.setItem(KEY, '<<not json>>');
    render(<Newsstand />);
    expect(
      screen.getByLabelText('구독 중인 언론사 8곳'),
    ).toBeInTheDocument();
  });
});
