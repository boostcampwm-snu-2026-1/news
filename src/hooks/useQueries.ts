import { useQuery } from '@tanstack/react-query';
import { fetchPressList, fetchPressDetail } from '../api';

export const usePressListQuery = () => {
  return useQuery({
    queryKey: ['pressList'],
    queryFn: fetchPressList,
  });
};

export const usePressDetailQuery = (pressId: string | null) => {
  return useQuery({
    queryKey: ['pressDetail', pressId],
    queryFn: () => fetchPressDetail(pressId!),
    enabled: !!pressId,
  });
};
