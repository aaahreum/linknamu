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
        width={160}
        height={160}
        priority
        className="size-40 rounded-full border-2 border-zinc-800 object-cover dark:border-zinc-300"
      />
      <h1 className="mt-6 text-lg font-semibold">{name}</h1>
      <p className="mt-1 text-sm italic text-zinc-600 dark:text-zinc-400">{bio}</p>
    </header>
  );
}
