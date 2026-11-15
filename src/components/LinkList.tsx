"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 서버에서 받은 클릭 수 (받기 전에는 비어 있어 0회로 표시)
  const [serverCounts, setServerCounts] = useState<Counts>({});
  // 이 페이지에서 누른 횟수 (서버 응답이 늦게 와도 덮어쓰이지 않도록 따로 보관)
  const [localClicks, setLocalClicks] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Counts }) => setServerCounts(data.counts))
      .catch((err) => {
        if (!controller.signal.aborted) console.error("클릭 수를 불러오지 못했습니다", err);
      });
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) =>
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  return (
    <ul className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
