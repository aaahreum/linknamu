export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 기존 집계와 분리됨) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로 */
  avatar: string;
  links: LinkItem[];
};

// TODO: 아래는 보여 주기용 더미 값입니다. 나중에 실제 정보·사진·링크로 바꿔 주세요.
export const profile: Profile = {
  name: "이아름",
  bio: "매일 조금씩 만들고 기록하는 개발자 🌱",
  avatar: "/avatar.svg", // 더미 사진 (public/avatar.svg)
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-username" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-username" },
    { id: "blog", title: "Blog", url: "https://your-blog.example.com" },
  ],
};
