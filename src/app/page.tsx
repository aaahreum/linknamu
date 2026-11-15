import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center sm:items-center sm:py-10">
      {/* 와이어프레임의 세로형 카드 프레임: 모바일에서는 화면 전체, 넓은 화면에서는 테두리 있는 카드 */}
      <main className="flex w-full max-w-sm flex-col items-center px-6 pt-14 pb-10 sm:min-h-[640px] sm:rounded-[2rem] sm:border-2 sm:border-zinc-800 sm:dark:border-zinc-300">
        <ProfileHeader name={profile.name} bio={profile.bio} avatar={profile.avatar} />

        <ul className="mt-8 flex w-full flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
