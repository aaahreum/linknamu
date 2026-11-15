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

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-4 text-center text-[15px] font-medium shadow-[var(--card-shadow)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-[var(--card-bg-hover)] hover:shadow-[var(--card-shadow-hover)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {link.title}
    </a>
  );
}
