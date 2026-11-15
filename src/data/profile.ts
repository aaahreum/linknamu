export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 기존 집계와 분리됨) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로 또는 이미지 URL */
  avatar: string;
  links: LinkItem[];
};

// TODO: 아래는 보여 주기용 더미 값입니다. 나중에 실제 정보·사진·링크로 바꿔 주세요.
export const profile: Profile = {
  name: "이아름",
  bio: "매일 조금씩 만들고 기록하는 개발자 🌱",
  avatar: "/profile.jpg", // 프로필 사진 (public/profile.jpg)
  links: [
    { id: "github", title: "🐙 깃허브", url: "https://github.com/aaahreum" },
    { id: "blog", title: "✍️ 블로그", url: "https://muerha.tistory.com" },
    { id: "email", title: "✉️ 이메일", url: "mailto:ahreum_1122@naver.com" },
  ],
};
