import { getGuide, mbtiTypes, situations, type Mbti } from "@/data/guides";

type Payload = {
  userRequest?: { utterance?: string };
  action?: {
    params?: Record<string, unknown>;
    detailParams?: Record<string, { value?: unknown }>;
  };
};

function response(text: string) {
  return Response.json({
    version: "2.0",
    template: { outputs: [{ simpleText: { text } }] },
  });
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return response("요청을 읽지 못했어요. MBTI와 상황 번호를 함께 보내 주세요. 예: INFP 1");
  }

  const utterance = (payload.userRequest?.utterance ?? "").slice(0, 1000).toUpperCase();
  const params = payload.action?.params ?? {};
  const detailParams = payload.action?.detailParams ?? {};
  const param = (key: string) => String(params[key] ?? detailParams[key]?.value ?? "").trim();
  const typeText = (param("mbti") || param("type") || utterance).toUpperCase();
  const type = mbtiTypes.find((candidate) => typeText.includes(candidate)) as Mbti | undefined;

  const situationText = param("situation") || param("situationNumber") || "";
  let situationIndex = -1;
  const situationNameIndex = situations.findIndex((name) =>
    (situationText || utterance).includes(name),
  );
  if (situationNameIndex >= 0) situationIndex = situationNameIndex;
  else {
    const numberText = situationText || utterance.match(/\b(10|[1-9])\b/)?.[0] || "";
    const number = Number(numberText);
    if (Number.isInteger(number) && number >= 1 && number <= situations.length) {
      situationIndex = number - 1;
    }
  }

  if (!type || situationIndex < 0) {
    return response("MBTI와 상황 번호를 보내 주세요. 예: INFP 1\n상황 번호는 1부터 10까지예요.");
  }

  const guide = getGuide(type, situationIndex, "natural");
  return response(
    `${type} · ${situations[situationIndex]}\n\n${guide.title}\n${guide.approach}\n\n보내기 좋은 문장\n“${guide.message}”\n\n추가 문장: ${guide.extra}\n\nMBTI는 참고 정보이며 사람마다 다를 수 있어요.`,
  );
}

