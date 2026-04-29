function App() {
  return (
    <main className="min-h-svh bg-[var(--color-page)] text-[var(--color-ink)]">
      <section className="mx-auto flex min-h-svh max-w-[930px] flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-sub)] uppercase">
          News Stand
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em]">
          뉴스스탠드
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-sub)]">
          Vite + React + TypeScript + Tailwind CSS 셋업이 완료되었습니다.
        </p>
      </section>
    </main>
  )
}

export default App
