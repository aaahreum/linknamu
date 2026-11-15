"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // 페이지를 떠나도 요청이 전송되도록 sendBeacon 우선 사용
  if (navigator.sendBeacon?.("/api/clicks", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

type Props = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(link.id);
        onClick?.();
      }}
      className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-4 text-[15px] font-medium shadow-[var(--card-shadow)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-[var(--card-bg-hover)] hover:shadow-[var(--card-shadow-hover)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* 제목은 가운데, 클릭 수는 오른쪽 끝 */}
      <span className="col-start-2 text-center">{link.title}</span>
      <span
        className="col-start-3 justify-self-end text-xs font-normal text-muted tabular-nums"
        aria-label={`클릭 ${count}회`}
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
