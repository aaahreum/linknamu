import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="relative flex flex-1 justify-center overflow-hidden">
      {/* 글래스 카드 뒤로 은은하게 비치는 빛 번짐 (장식용) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-20 size-80 rounded-full bg-[var(--glow-2)] blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-96 rounded-full bg-[var(--glow-1)] blur-3xl" />
      </div>

      <main className="flex w-full max-w-md flex-col items-center px-7 pt-20 pb-16 sm:pt-28">
        <ProfileHeader name={profile.name} bio={profile.bio} avatar={profile.avatar} />
        <LinkList links={profile.links} />
      </main>
    </div>
  );
}
