import { MOCK_PRESS_LIST, generateMockPressDetail, type Press, type PressDetail } from '../mocks/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPressList = async (): Promise<Press[]> => {
  await delay(300); // Network delay simulation
  return MOCK_PRESS_LIST;
};

export const fetchPressDetail = async (pressId: string): Promise<PressDetail> => {
  await delay(200);
  return generateMockPressDetail(pressId);
};
