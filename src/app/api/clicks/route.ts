import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

const validIds = new Set(profile.links.map((l) => l.id));

/** 링크 클릭 1회 기록: { linkId } */
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문" }, { status: 400 });
  }
  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("클릭 기록 실패", err);
    return Response.json({ error: "클릭 기록 실패" }, { status: 500 });
  }
}

/** 링크별 클릭 수 조회 */
export async function GET() {
  // 빌드 시 미리 렌더링되지 않고 요청마다 최신 값을 읽도록
  await connection();
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: [...validIds] } }).toArray();
    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("클릭 수 조회 실패", err);
    return Response.json({ error: "클릭 수 조회 실패" }, { status: 500 });
  }
}
