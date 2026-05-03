import { Newspaper } from "lucide-react";

import { formatNewsstandDate } from "../utils/date";

type HeaderProps = {
  date: Date;
};

export function Header({ date }: HeaderProps) {
  return (
    <header className="newsstand-header">
      <div className="newsstand-brand">
        <Newspaper aria-hidden="true" size={24} strokeWidth={1.8} />
        <h1>뉴스스탠드</h1>
      </div>
      <time className="newsstand-date" dateTime={toDateTime(date)}>
        {formatNewsstandDate(date)}
      </time>
    </header>
  );
}

function toDateTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
