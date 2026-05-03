import { Header } from "./components/Header/Header";
import { Ticker } from "./components/Ticker/Ticker";

export default function App() {
  return (
    <div className="canvas">
      <Header date="2026. 01. 14. 수요일" />
      <Ticker />
    </div>
  );
}
