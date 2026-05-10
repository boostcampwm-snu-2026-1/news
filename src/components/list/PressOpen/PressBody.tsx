import type { Press } from '../../../types/press';

interface PressBodyProps {
  press: Press;
}

const PressBody = ({ press }: PressBodyProps) => {
  if (!press.articles) return null;

  const { headline, subArticles } = press.articles;

  return (
    <div className="flex gap-[24px] px-[24px] pb-[24px] mt-[4px]">
      {/* 왼쪽: 메인 헤드라인 컬럼 */}
      <div className="w-[340px] flex flex-col gap-[16px]">
        <div className="w-full h-[188px] bg-gradient-to-br from-[#EFF1F6] to-[#DDE3EC] border border-[var(--color-line)] flex items-center justify-center">
          <span className="text-[14px] text-[var(--color-mute)] font-medium select-none">
            headline image
          </span>
        </div>
        <h3 className="text-[16px] font-bold text-[var(--color-ink)] leading-[1.45] break-keep">
          {headline.title}
        </h3>
      </div>

      {/* 오른쪽: 서브 기사 리스트 컬럼 */}
      <div className="flex-1 flex flex-col justify-between">
        <ul className="flex flex-col gap-[16px]">
          {subArticles.map((article, index) => (
            <li key={index} className="flex items-center gap-[8px]">
              {/* Bullet */}
              <div className="w-[3px] h-[3px] bg-[var(--color-ink)] -translate-y-[2px]" />
              <span className="text-[14px] font-medium text-[var(--color-ink)] leading-[1.5] hover:underline cursor-pointer">
                {article}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto pt-[16px]">
          <span className="text-[12px] font-medium text-[var(--color-mute)]">
            {press.name} 언론사에서 직접 편집한 뉴스입니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PressBody;
