import type { Press } from "../../_data/newsstand";

const categories = [
  "종합/경제",
  "방송/통신",
  "IT",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

type ListPreviewProps = {
  presses: Press[];
  pageLabel: string;
};

export function ListPreview({ presses, pageLabel }: ListPreviewProps) {
  const first = presses[0];

  return (
    <section className="list-preview">
      <div className="field-tabs">
        {categories.map((category, index) => (
          <span
            className={index === 0 ? "field-tab is-active" : "field-tab"}
            key={category}
          >
            {category}
            {index === 0 ? <b>{pageLabel}</b> : null}
          </span>
        ))}
      </div>
      <div className="opened-press">
        <div className="opened-meta">
          <strong>{first?.name ?? "언론사"}</strong>
          <span>2026.01.14. 18:53 편집</span>
          <button type="button">구독하기</button>
        </div>
        <div className="opened-body">
          <div className="headline-image">headline image</div>
          <ul>
            <li>출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다</li>
            <li>&quot;기다림이 폭신해졌어요&quot; 동네 버스정류장 의자, 새 단장</li>
            <li>데이터 걱정 내려놓기 실험... 통신사, 마음 편한 요금제 선보여</li>
            <li>잠들기 전에 보는 조용한 영상 한 편... OTT, 힐링 추천 기능 도입</li>
            <li>&quot;길 잃지 않게 도와줄게요&quot; 친절해진 환승 안내 목소리</li>
          </ul>
        </div>
        <p>{first?.name ?? "선택한 언론사"} 언론사에서 직접 편집한 뉴스입니다.</p>
      </div>
    </section>
  );
}
