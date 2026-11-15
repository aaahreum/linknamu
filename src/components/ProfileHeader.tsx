import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatar: string;
};

export default function ProfileHeader({ name, bio, avatar }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={avatar}
        alt={`${name} 프로필 사진`}
        width={256}
        height={256}
        priority
        className="size-32 rounded-full object-cover shadow-[var(--avatar-shadow)]"
      />
      <h1 className="mt-6 text-xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{bio}</p>
    </header>
  );
}
