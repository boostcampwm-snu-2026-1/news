import { Newsstand } from "./_components/newsstand";
import { presses, tickerItems } from "./_data/newsstand";

export default function Home() {
  return <Newsstand initialPresses={presses} tickerItems={tickerItems} />;
}
