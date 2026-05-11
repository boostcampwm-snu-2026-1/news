import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PressGrid from '../components/PressGrid';
import { useNewsstandStore } from '../store/useNewsstandStore';
import React from 'react';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('PressGrid Empty State Edge Case', () => {
  beforeEach(() => {
    // 엣지케이스: 구독 모드이면서 구독한 언론사가 0개일 때
    useNewsstandStore.setState({ tab: 'sub', subscribed: [] });
  });

  it('구독한 언론사가 0개일 때 빈 화면(Empty State)을 렌더링해야 한다', async () => {
    render(<PressGrid />, { wrapper: Wrapper });
    
    // 데이터 페칭(로딩) 완료 후 텍스트가 화면에 나타나는지 비동기 대기 및 단언
    await waitFor(() => {
      expect(screen.getByText('구독한 언론사가 없습니다.')).toBeInTheDocument();
    });
  });
});
