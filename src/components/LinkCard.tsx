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
      className="block w-full rounded-xl border-2 border-zinc-800 bg-white px-5 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-zinc-300 dark:bg-zinc-900"
    >
      {link.title}
    </a>
  );
}
