import { NewsstandShell } from './components/NewsstandShell'

function App() {
  return (
    <NewsstandShell>
      <div className="flex min-h-[var(--layout-content-height)] items-center justify-center border border-dashed border-line bg-card px-6 text-center">
        <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
          930px 뉴스스탠드 콘텐츠 영역
          <br />
          다음 단계에서 언론사 그리드가 이 영역에 들어갑니다.
        </p>
      </div>
    </NewsstandShell>
  )
}

export default App
