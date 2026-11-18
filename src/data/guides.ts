export const mbtiTypes = ["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"] as const;
export type Mbti = typeof mbtiTypes[number];
export const groups: Record<string,string> = { INTJ:"분석가", INTP:"분석가", ENTJ:"분석가", ENTP:"분석가", INFJ:"외교관", INFP:"외교관", ENFJ:"외교관", ENFP:"외교관", ISTJ:"관리자", ISFJ:"관리자", ESTJ:"관리자", ESFJ:"관리자", ISTP:"탐험가", ISFP:"탐험가", ESTP:"탐험가", ESFP:"탐험가" };
export const situations = ["답장이 늦거나 연락이 없을 때","약속이나 만남을 정할 때","상대방이 고민을 털어놓을 때","서로 의견이 다르거나 갈등이 생겼을 때","칭찬하거나 응원해 주고 싶을 때","처음 대화를 시작하거나 어색할 때","부탁하거나 거절해야 할 때","사과하거나 화해하고 싶을 때","관심이나 호감을 표현하고 싶을 때","일상적인 대화를 이어가고 싶을 때"] as const;
const situationKeywords = [
 ["답장", "연락", "읽씹", "답이 없", "늦게 답", "메시지 봤"],
 ["약속", "만남", "만나", "일정", "시간 정", "언제 볼", "동선", "코스", "카페", "경로", "데이트 일정", "가고 싶은 곳"],
 ["고민", "힘들", "속상", "들어주", "위로", "털어놓"],
 ["갈등", "싸웠", "싸움", "다툼", "의견", "화났", "다퉜", "서운", "마음 상"],
 ["칭찬", "응원", "잘했", "축하", "고생했", "인정"],
 ["처음", "어색", "인사", "대화 시작", "첫 대화"],
 ["부탁", "거절", "도와", "빌려", "요청"],
 ["사과", "미안", "잘못", "화해", "상처 줬"],
 ["좋아해", "호감", "고백", "관심 표현", "데이트", "보고 싶"],
 ["일상", "안부", "하루 어땠", "대화 이어", "잡담"]
];
export function matchSituation(text: string): number | null {
 const normalized = text.toLocaleLowerCase().replaceAll(" ", "");
 const scores = situationKeywords.map((keywords) => keywords.reduce((score, keyword) => score + (normalized.includes(keyword.replaceAll(" ", "")) ? 1 : 0), 0));
 const bestScore = Math.max(...scores);
 return bestScore === 0 ? null : scores.indexOf(bestScore);
}
export const replyHabits: Record<Mbti,string> = {
 ISTJ:"약속 장소와 날짜, 시간을 다시 확인하고 필요한 내용이 빠졌다면 질문을 구체적으로 보낼 수 있어요.", ISFJ:"메시지를 보낸 시각과 상대가 바쁜 상황인지 먼저 생각해 볼 수 있어요.", ESTJ:"예약 마감이나 일정이 걸려 있다면 답변 기한을 확인하고, 답이 없을 때의 대안도 정해 둘 수 있어요.", ESFJ:"지난 대화의 말투나 표정을 떠올리며 혹시 마음에 걸린 부분이 있었는지 살필 수 있어요.", ISTP:"급한 일이면 전화로 확인하고, 안부 정도라면 휴대전화를 내려놓고 하던 일을 이어갈 수 있어요.", ISFP:"사진에 반응이 없으면 조금 머쓱해져서 다음 말을 보낼지 잠깐 망설일 수 있어요.", ESTP:"약속 답변이 늦으면 상대 답만 기다리기보다 내 일정을 먼저 잡아 둘 수 있어요.", ESFP:"공유한 영상에 반응이 없으면 크게 의미를 두지 않고 다른 친구에게도 보낼 수 있어요.", INFJ:"최근 대화 흐름과 이전에도 비슷한 일이 반복됐는지 함께 생각해 볼 수 있어요.", INFP:"마음을 담아 보낸 메시지와 이모티콘까지 다시 읽으며 상대의 반응을 기다릴 수 있어요.", ENFJ:"상대가 힘들다고 했던 점을 기억하고, 부담스럽지 않게 안부를 다시 물을 수 있어요.", ENFP:"새로운 이야기를 보내려다가 이전 메시지에 답이 없는 것을 보고 잠시 멈출 수 있어요.", INTJ:"답이 꼭 지금 필요한지 판단하고, 내일까지 기다려도 된다면 대화창을 닫아 둘 수 있어요.", INTP:"마지막 문장을 다시 확인하고, 상대는 대화가 끝났다고 생각했을 가능성도 고려할 수 있어요.", ENTJ:"일정에 관한 내용이라면 선택지를 두 개로 좁혀 다시 물어볼 수 있어요.", ENTP:"농담을 하나 더 보내려다가 메시지를 더하기보다 다음에 직접 이야기하기로 할 수 있어요."
};
// 연락 스타일 원문: 사용자가 제공한 개발 지시서의 8개 유형만 등록한다.
export const contactStyles: Partial<Record<Mbti, string>> = {
 ENFP:"대화가 시작되면 길게 이어지는 편",
 ENTP:"티키타카를 즐기는 편",
 ENTJ:"핵심 위주로 이야기하는 편",
 ENFJ:"안부와 감정을 세심하게 살피는 편",
 ESFP:"일상과 경험을 공유하는 편",
 ESFJ:"안부와 약속을 꼼꼼하게 챙기는 편",
 ESTP:"짧은 연락과 직접 만남을 선호하는 편",
 ESTJ:"정확하고 계획적인 연락을 선호하는 편",
};

// 공개된 MBTI 카톡/문자 스타일 콘텐츠를 교차 요약한 참고 프로필.
// 오락·공감형 인터넷 글의 묘사이므로 사람의 실제 말투를 단정하는 근거로 사용하지 않는다.
export const onlineChatProfiles: Record<Mbti, string> = {
 ISTJ:"필요한 정보를 정확하고 간결하게 전하고 약속을 확인하는 모습으로 자주 묘사돼요.",
 ISFJ:"상대의 근황과 전에 나눈 이야기를 기억해 안부를 챙기는 모습으로 묘사돼요.",
 INFJ:"답을 충분히 생각하고 맥락이나 감정을 담아 한 번에 전하는 모습으로 묘사돼요.",
 INTJ:"용건과 핵심 위주로 필요한 대화를 짧고 분명하게 하는 모습으로 묘사돼요.",
 ISTP:"필요한 내용부터 짧게 주고받고, 긴 채팅보다 행동이나 통화를 택하는 모습으로 묘사돼요.",
 ISFP:"현재 기분이나 취향을 사진·음악·이모티콘 같은 감각적인 표현으로 나누는 모습으로 묘사돼요.",
 INFP:"생각을 정리한 뒤 마음과 상상력을 담아 답하는 모습으로 자주 묘사돼요.",
 INTP:"답을 오래 생각하거나 관심 있는 정보·링크를 덧붙이는 모습으로 묘사돼요.",
 ESTP:"짧고 빠른 연락으로 지금 할 일이나 만남을 제안하는 모습으로 묘사돼요.",
 ESFP:"리액션과 일상 경험을 활발히 나누고 사진·밈으로 분위기를 띄우는 모습으로 묘사돼요.",
 ENFP:"생각난 이야기와 아이디어를 활기 있게 이어가며 주제를 넓히는 모습으로 묘사돼요.",
 ENTP:"농담과 질문을 주고받으며 관점을 바꾸는 티키타카를 즐기는 모습으로 묘사돼요.",
 ESTJ:"일정과 요청을 빠르게 확인하고 다음 행동을 분명히 정리하는 모습으로 묘사돼요.",
 ESFJ:"안부와 관계의 세부 사항을 살피고 약속을 챙기는 모습으로 묘사돼요.",
 ENFJ:"격려와 안부로 대화를 이어가고 상대가 참여할 수 있게 흐름을 이끄는 모습으로 묘사돼요.",
 ENTJ:"결론과 필요한 행동을 짧고 명확하게 전달하는 모습으로 묘사돼요.",
};

// 출처: 사용자가 제공한 개발 지시서의 16개 답장 경향.
// 아래 문장은 그 경향을 바탕으로 새로 쓴 전송용 예시이며, 특정 성격을 단정하지 않는다.
const replyDelayMessages: Record<Mbti, Record<"natural" | "warm" | "short", string>> = {
 ISTJ:{natural:"일정 확인하려고 다시 연락했어. 장소랑 시간 중에 바뀐 게 있으면 알려줘.",warm:"시간 괜찮을 때 일정 확인만 부탁해. 혹시 바뀐 게 있으면 편하게 알려줘.",short:"일정 확인 부탁해. 바뀐 게 있으면 알려줘."},
 ISFJ:{natural:"요즘 바쁜가 봐. 급한 건 아니니까 괜찮을 때 편하게 답해 줘.",warm:"요즘 많이 바쁘지? 여유 생길 때 답해 줘. 네 상황도 괜찮은지 궁금했어 🌿",short:"바쁜가 봐. 편할 때 답 줘!"},
 ESTJ:{natural:"예약 마감 때문에 오늘까지 답이 필요해. 어려우면 다른 방법으로 알아볼게.",warm:"예약 일정 때문에 오늘 답을 알면 좋겠어. 어렵다면 부담 갖지 말고 말해 줘, 다른 방법도 알아볼게.",short:"예약 때문에 오늘 답이 필요해. 어렵다면 알려줘."},
 ESFJ:{natural:"지난번 대화가 혹시 마음에 걸렸어? 편할 때 이야기해 줘.",warm:"지난번 대화가 혹시 마음에 남았을까 궁금했어. 괜찮을 때 네 마음도 들려줘 😊",short:"지난번 얘기, 혹시 마음에 걸렸어?"},
 ISTP:{natural:"급한 일이면 전화할게. 안부라면 편할 때 답해 줘.",warm:"급한 건 아니야. 편할 때 답해 줘도 괜찮고, 급한 일이면 내가 전화할게.",short:"급하면 전화할게. 편할 때 답 줘."},
 ISFP:{natural:"이 사진 보니까 네 생각나서 보냈어. 시간 날 때 봐줘 🙂",warm:"사진 보고 네 생각나서 보냈어. 부담 갖지 말고 편할 때 봐줘 🌿",short:"사진 봤어? 편할 때 답 줘 🙂"},
 ESTP:{natural:"나는 내 일정을 먼저 정해둘게. 가능하면 오늘 안에 알려줘!",warm:"네 답을 기다리느라 일정을 비워두기보다 먼저 정해둘게. 가능하면 오늘 알려주면 고마워!",short:"나는 일정 먼저 정할게. 오늘 알려줘!"},
 ESFP:{natural:"이 영상 보자마자 네 생각났어ㅋㅋ 시간 날 때 봐줘!",warm:"이 영상 보자마자 네 생각났어 😊 시간 날 때 같이 보고 얘기하자!",short:"이 영상 너 생각나서 보냈어ㅋㅋ"},
 INFJ:{natural:"요즘 대화가 뜸해서 안부가 궁금했어. 혹시 무슨 일 있는 건 아니지?",warm:"요즘 대화가 조금 뜸해서 네가 괜찮은지 궁금했어. 말하고 싶을 때 편하게 들려줘.",short:"요즘 괜찮아? 네 안부가 궁금했어."},
 INFP:{natural:"내가 보낸 말이 혹시 부담스럽진 않았을까 궁금했어. 천천히 답해도 괜찮아.",warm:"내가 보낸 말이 혹시 부담되진 않았을까 마음이 쓰였어. 천천히, 편할 때 답해 줘 🌿",short:"내 메시지 부담되진 않았어? 편할 때 답 줘."},
 ENFJ:{natural:"전에 힘들다고 했던 일은 좀 괜찮아졌어? 네 생각나서 안부 물어봐.",warm:"전에 힘들다고 했던 일이 계속 마음에 남았어. 조금 괜찮아졌는지 천천히 들려줘 😊",short:"전에 말한 일, 좀 괜찮아졌어?"},
 ENFP:{natural:"새 얘기 생각나서 연락했어! 지난번 메시지는 편할 때 답해도 돼.",warm:"새로운 얘기도 나누고 싶어서 연락했어. 지난번 메시지는 부담 없이 편할 때 답해 줘 🌱",short:"새 얘기 생각나서 연락했어! 편할 때 답 줘."},
 INTJ:{natural:"급한 건 아니야. 내일까지 편할 때 답해 줘.",warm:"급한 일은 아니니까 오늘 바로 답하지 않아도 괜찮아. 내일까지 편할 때 알려줘.",short:"급한 건 아니야. 내일까지 답 줘."},
 INTP:{natural:"혹시 앞 메시지 확인했어? 답이 급한 건 아니니까 편할 때 봐줘.",warm:"앞에서 보낸 메시지가 혹시 대화 끝처럼 느껴졌을 수도 있겠다 싶었어. 편할 때 확인해 줘.",short:"앞 메시지 확인했어? 편할 때 봐줘."},
 ENTJ:{natural:"일정 때문에 확인할게. 금요일과 토요일 중 언제 가능해?",warm:"일정 정리하려고 확인해. 금요일이나 토요일 중 편한 날을 알려줄래?",short:"금요일 / 토요일 중 언제 가능해?"},
 ENTP:{natural:"한마디 더 보낼까 하다가 멈췄어. 다음에 만나서 얘기하자 😄",warm:"한마디 더 보낼까 하다가 다음에 직접 얘기하는 게 더 재밌겠다 싶었어. 편할 때 보자 😄",short:"다음에 만나서 얘기하자 😄"},
};

// 연락 스타일 데이터가 제공된 8개 유형에 한해 일상 대화 문장을 맞춘다.
const dailyMessages: Partial<Record<Mbti, Record<"natural" | "warm" | "short", string>>> = {
 ENFP:{natural:"요즘 뭐가 제일 재밌어? 나는 요즘 빠진 게 생겨서 얘기해 주고 싶어!",warm:"요즘 네가 좋아하는 건 뭐야? 네 이야기 들으면 나도 기분 좋아질 것 같아 😊",short:"요즘 뭐가 제일 재밌어?"},
 ENTP:{natural:"이거 보니까 네 생각났어. 너라면 어떻게 할지 궁금해 😄",warm:"재밌는 걸 발견했는데 너랑 얘기해 보고 싶어. 네 생각도 들려줘 🙂",short:"이거 봤어? 네 생각 궁금해."},
 ENTJ:{natural:"요즘 어떻게 지내? 시간 괜찮으면 이번 주에 만나자.",warm:"요즘 잘 지내는지 궁금해. 편한 날 있으면 만나서 이야기 나눌래?",short:"이번 주 언제 시간 돼?"},
 ENFJ:{natural:"오늘 하루 어땠어? 요즘 마음 쓰이는 일은 없었어?",warm:"오늘 하루는 괜찮았어? 요즘 네 마음도 궁금해서 안부 물어봐 🌿",short:"요즘 괜찮아? 네 안부가 궁금했어."},
 ESFP:{natural:"오늘 이런 일이 있었어ㅋㅋ 너는 오늘 뭐 했어?",warm:"오늘 있었던 일 너한테도 들려주고 싶었어. 너의 하루는 어땠어? 😊",short:"오늘 재밌는 일 있었어?"},
 ESFJ:{natural:"잘 지내? 이번 주 일정은 어때? 안부도 궁금했어!",warm:"잘 지내고 있지? 편한 날 있으면 알려줘. 네 안부도 듣고 싶어 😊",short:"이번 주 일정 어때? 잘 지내?"},
 ESTP:{natural:"이번 주에 시간 돼? 잠깐 만나서 얘기하자!",warm:"요즘 잘 지내? 시간 괜찮을 때 얼굴 보고 편하게 얘기하자.",short:"요즘 어때? 잠깐 만날래?"},
 ESTJ:{natural:"이번 주 일정 확인하고 싶어. 수요일이나 금요일 중 시간 되는 날 알려줘.",warm:"이번 주 일정 맞춰보고 싶어. 수요일이나 금요일 중 편한 날이 있을까?",short:"수요일 / 금요일 중 언제 가능해?"},
};
const prompts = [
 ["상황 확인","지금 바로 답하기 어려울 수도 있어요. 급한 일인지 먼저 살피고, 필요한 내용만 한 번 정리해 전해 보세요.","답을 재촉하는 연속 메시지는 부담이 될 수 있어요."],
 ["선택지를 좁히기","가능한 날짜와 시간을 두세 개 제안하면 상대가 답하기 쉬워요.","상대 일정도 열어 두고 조율해 주세요."],
 ["먼저 들어주기","해결책부터 말하기보다 어떤 점이 가장 힘든지 물어봐 주세요.","원하지 않는 조언을 서둘러 건네지 않도록 해요."],
 ["사실과 감정 나누기","서로의 입장을 짧게 요약해 확인한 뒤, 다음에 바라는 점을 말해 보세요.","누가 맞는지 결론부터 내리면 대화가 막힐 수 있어요."],
 ["구체적으로 인정하기","무엇을 잘했는지 구체적으로 짚어 주면 진심이 더 잘 전해져요.","비교하거나 과장하기보다 관찰한 사실을 말해 주세요."],
 ["가벼운 공통점 찾기","지금 함께 있는 상황이나 상대가 좋아하는 주제로 부담 없는 질문을 건네 보세요.","질문을 연달아 하기보다 답을 기다려 주세요."],
 ["요청은 분명하게","부탁의 이유와 원하는 시점을 간단히 말하고, 거절할 여지도 남겨 주세요.","상대가 당연히 해줘야 한다는 듯 말하지 않도록 해요."],
 ["책임을 먼저 말하기","내가 한 행동을 구체적으로 인정하고, 상대가 받은 영향을 들어 보세요.","사과 뒤에 바로 변명을 붙이면 진심이 흐려질 수 있어요."],
 ["관심을 작게 표현하기","함께한 시간에서 좋았던 점을 솔직하게 말하고 다음 만남을 제안해 보세요.","상대의 반응과 경계를 존중해 주세요."],
 ["열린 질문 건네기","오늘 있었던 일이나 최근 빠진 것처럼 쉽게 답할 수 있는 질문을 해 보세요.","대화를 이어가야 한다는 부담을 서로에게 주지 않아도 돼요."]
];
const lens: Record<string,string> = { I:"생각할 시간을 두고 편한 방식으로 답할 여지를 남겨 보세요.", E:"대화를 활기 있게 시작하되 상대가 말할 공간도 만들어 주세요.", S:"구체적인 상황이나 일정부터 짚어 대화를 시작해 보세요.", N:"앞으로 어떻게 하고 싶은지 가능성을 함께 이야기해 보세요.", T:"요청이나 의견의 이유를 차분하고 분명하게 전해 보세요.", F:"표현이 상대에게 어떻게 들릴지 한 번 더 살펴보세요.", J:"시간이나 다음 단계를 정리하면 마음이 편해질 수 있어요.", P:"선택지를 열어 두고 상황에 맞게 조정할 수 있게 해 주세요." };
const natural = ["혹시 메시지 봤어? 급한 건 아니니까 편할 때 답 줘 🙂","우리 언제 만날까? 나는 금요일 저녁이나 토요일 오후 괜찮아!","얘기해 줘서 고마워. 지금은 그냥 들어주는 게 좋을까, 같이 방법을 찾아볼까?","나는 그때 이렇게 느꼈어. 너는 어떻게 생각했는지 듣고 싶어.","아까 그 부분 정말 좋더라! 네가 신경 쓴 게 느껴졌어.","여기 와 본 적 있어? 나는 처음이라 좀 신기하다.","혹시 이번 주에 잠깐 도와줄 수 있어? 어렵다면 편하게 말해 줘.","아까 내 말이 마음에 걸렸을 것 같아. 미안해. 네 얘기도 듣고 싶어.","오늘 같이 있어서 즐거웠어. 다음에 우리 둘이 또 만나고 싶어.","오늘 하루 어땠어? 요즘 재밌게 보는 거 있어?"];
const warm = ["바쁜가 보다. 괜찮을 때 편하게 답해 줘, 기다릴게 🌿","네 일정도 괜찮은 날로 맞추고 싶어. 편한 날 알려줄래?","마음 나눠 줘서 고마워. 네 편에서 천천히 같이 생각해 볼게.","우리 둘 다 편하게 이야기하고 싶어. 네 마음은 어땠는지 들려줄래?","네가 해낸 게 참 대단해. 얼마나 애썼는지 알고 있어.","처음이라 조금 어색하지만 반가워! 요즘 어떤 일에 관심 있어?","부담 주고 싶진 않아. 가능하면 부탁하고, 어렵다면 괜찮아.","내 말로 속상하게 했다면 정말 미안해. 네 마음을 듣고 싶어.","너와 함께한 시간이 참 좋았어. 괜찮다면 다음에도 만나고 싶어.","오늘 어떤 하루였어? 네 이야기가 궁금해 😊"];
const short = ["메시지 봤어? 편할 때 답 줘!","금요일 저녁 / 토요일 오후 중 언제가 좋아?","들어줄까, 같이 방법을 찾을까?","네 생각도 듣고 싶어.","그 부분 정말 좋았어!","요즘 뭐에 관심 있어?","이번 주에 도와줄 수 있어? 어려우면 괜찮아.","아까 말 미안해. 네 얘기 듣고 싶어.","오늘 즐거웠어. 또 만나고 싶어.","오늘 하루 어땠어?"];
export function getGuide(type: Mbti, index: number, style: "natural"|"warm"|"short") {
 const p = prompts[index];
 const extra = type[0] === "E" ? "지금 잠깐 통화할래?" : "천천히 생각하고 답해도 괜찮아.";
 const message = index === 0
  ? replyDelayMessages[type][style]
  : index === 9 && dailyMessages[type]
   ? dailyMessages[type]![style]
   : (style === "warm" ? warm : style === "short" ? short : natural)[index];
 const communicationStyle = contactStyles[type];
 const approach = p[1]+" "+lens[type[0]]+" "+lens[type[1]]+(communicationStyle ? " "+communicationStyle+" 연락 방식을 참고해 보세요." : "");
 return { title:p[0], approach, caution:p[2], message, extra, communicationStyle:communicationStyle ?? null };
}

type MessageStyle = "natural" | "warm" | "short";

function byStyle(style: MessageStyle, natural: string, warm: string, short: string) {
 return style === "warm" ? warm : style === "short" ? short : natural;
}

// 유형을 고르면 실제 문장에서도 그 유형의 표현 리듬이 드러나도록 하는 말투 시그니처.
// 고정된 성격 단정이 아니라, 같은 내용을 서로 다른 말투로 제안하기 위한 편집 규칙이다.
const voiceCues: Record<Mbti, Record<MessageStyle, string>> = {
 ISTJ:{natural:"상황부터 차근히 확인해보자.",warm:"네 입장도 살피면서 차근차근 맞춰볼게.",short:"우선 핵심부터 확인할게."},
 ISFJ:{natural:"네가 괜찮은지도 먼저 살피고 싶어.",warm:"네 마음까지 편안한지 천천히 살펴볼게.",short:"네 마음도 먼저 살펴볼게."},
 INFJ:{natural:"서로의 마음과 맥락을 함께 보고 싶어.",warm:"네 말에 담긴 마음까지 천천히 이해하고 싶어.",short:"네 마음과 이유를 함께 듣고 싶어."},
 INTJ:{natural:"핵심부터 정리해서 말할게.",warm:"우리에게 중요한 점부터 차분히 정리해볼게.",short:"핵심만 먼저 말할게."},
 ISTP:{natural:"돌려 말하기보다 필요한 얘기부터 할게.",warm:"복잡하게 만들지 않고 편하게 이야기해볼게.",short:"필요한 얘기부터 할게."},
 ISFP:{natural:"내가 느낀 걸 솔직하게 전해볼게.",warm:"내 마음을 부드럽게 나눠보고 싶어.",short:"내 마음을 솔직히 말할게."},
 INFP:{natural:"내 마음을 담아 천천히 말해볼게.",warm:"서두르지 않고 진심을 담아 이야기하고 싶어.",short:"내 진심을 전하고 싶어."},
 INTP:{natural:"가능한 방법을 몇 가지 생각해봤어.",warm:"서로에게 맞는 방법이 뭘지 같이 생각해보고 싶어.",short:"가능한 방법을 생각해봤어."},
 ESTP:{natural:"일단 지금 할 수 있는 것부터 해보자!",warm:"부담 없이 하나씩 해보면 좋을 것 같아.",short:"일단 지금 할 수 있는 것부터 하자!"},
 ESFP:{natural:"이 얘기 너랑 편하게 나누고 싶어!",warm:"네 이야기까지 함께 나누면 더 좋을 것 같아 😊",short:"우리 편하게 얘기하자!"},
 ENFP:{natural:"얘기하다 보면 다른 방법도 떠오를 것 같아!",warm:"우리 이야기 나누면서 좋은 가능성도 같이 찾아보자 🌱",short:"같이 얘기하며 방법을 찾아보자!"},
 ENTP:{natural:"다른 관점에서도 한번 생각해보자.",warm:"혹시 우리가 아직 생각 못 한 방법도 있을지 같이 살펴볼래?",short:"다른 방법도 생각해볼까?"},
 ESTJ:{natural:"먼저 할 일을 정리해서 말할게.",warm:"서로 헷갈리지 않도록 다음 단계를 정리해볼게.",short:"다음 단계부터 정하자."},
 ESFJ:{natural:"네 마음도 괜찮은지 먼저 살피고 싶어.",warm:"우리 둘 다 편한지 확인하면서 정하고 싶어 😊",short:"너도 괜찮은지 먼저 물어볼게."},
 ENFJ:{natural:"우리 둘 다 편한 방향을 같이 찾아보자.",warm:"네 마음을 들으면서 우리에게 좋은 방향을 같이 찾아볼게.",short:"우리에게 편한 방법을 같이 찾자."},
 ENTJ:{natural:"선택지를 정리해서 제안할게.",warm:"가능한 선택지를 정리해볼 테니 함께 가장 나은 쪽을 골라보자.",short:"선택지를 정리해볼게."},
};

function speakAs(type: Mbti, text: string, style: MessageStyle) {
 return `${voiceCues[type][style]} ${text}`;
}

function pairMessage(sender: Mbti, recipient: Mbti, index: number, style: MessageStyle, baseMessage: string) {
 const isFeeling = recipient[2] === "F";
 const isConcrete = recipient[1] === "S";
 const prefersPlan = recipient[3] === "J";
 const senderPlans = sender[3] === "J";
 const senderConcrete = sender[1] === "S";
 const senderIsOutgoing = sender[0] === "E";

 switch (index) {
  case 0:
   if (recipient[0] === "I" && (baseMessage.includes("편할 때") || baseMessage.includes("천천히"))) return baseMessage;
   return `${baseMessage} ${recipient[0] === "I" ? "급한 건 아니니까 편할 때 답해 줘." : "네 생각도 들려주면 좋겠어."}`;
  case 1:
   if (prefersPlan && isConcrete && senderPlans) return byStyle(style, "이번 주 일정 맞추려고 해. 금요일 저녁이나 토요일 오후 중 언제가 괜찮아?", "우리 일정 편하게 맞춰보자. 금요일 저녁이나 토요일 오후 중 괜찮은 때가 있을까?", "금요일 저녁 / 토요일 오후 중 언제가 괜찮아?");
   if (senderPlans && !prefersPlan) return byStyle(style, "나는 일정을 먼저 정리해 두면 편해. 이번 주 중 네가 가능한 때를 알려줄래?", "내가 일정을 미리 정리해 두려는 편이야. 네가 편한 시간에 맞춰볼게.", "일정 정리하려고 해. 이번 주 언제 편해?");
   if (prefersPlan) return byStyle(style, "이번 주 중 언제 만나면 좋을지 정해볼까? 같이 해보고 싶은 것도 궁금해.", "이번 주에 만나서 같이 해보고 싶은 게 있어? 편한 날짜도 함께 정해보자.", "이번 주 언제 볼까? 같이 하고 싶은 것도 알려줘.");
   if (senderConcrete) return byStyle(style, "이번 주 중 편한 날이 언제야? 장소와 시간은 하나씩 정해보자.", "네 일정에 맞춰 장소와 시간을 차근차근 정해보면 좋겠어.", "이번 주 언제 편해? 장소와 시간 정하자.");
   if (isConcrete) return byStyle(style, "이번 주 중 시간 되는 날 있어? 장소랑 시간은 서로 편한 쪽으로 맞추자.", "이번 주 중 편한 날이 있을까? 장소와 시간은 네 일정에 맞춰보자.", "이번 주 언제 편해? 장소랑 시간은 맞추자.");
   return byStyle(style, "요즘 같이 해보고 싶은 거 있어? 일정은 서로 편할 때 맞추자.", "어떤 만남이 좋을지 같이 이야기해 보자. 일정은 부담 없이 맞추면 돼.", "같이 뭐 해볼까? 일정은 편할 때 맞추자.");
  case 2:
   return isFeeling
    ? sender[2] === "F"
      ? byStyle(style, "얘기해 줘서 고마워. 해결책을 서두르기보다 네 마음을 먼저 듣고 싶어. 어떤 점이 가장 힘들었어?", "마음 나눠줘서 고마워. 해결책보다 네 마음을 먼저 살피고 싶어. 천천히 들려줘.", "얘기해 줘서 고마워. 어떤 점이 제일 힘들었어?")
      : byStyle(style, "내가 바로 해결책부터 말하기보다 네가 어떤 점에서 힘든지 먼저 듣고 싶어.", "섣불리 방법을 말하기 전에 네 마음을 충분히 듣고 싶어. 천천히 얘기해 줘.", "먼저 네 얘기를 듣고 싶어. 어떤 점이 제일 힘들어?")
    : sender[2] === "T"
      ? byStyle(style, "얘기해 줘서 고마워. 어떤 점이 가장 어려운지 같이 정리해 볼까? 원하면 방법도 찾아보자.", "네 얘기 듣고 같이 생각해 보고 싶어. 원하면 문제를 나눠서 해결 방법을 찾아보자.", "어떤 점이 가장 어려워? 같이 방법을 찾아볼까?")
      : byStyle(style, "그런 일이 있었구나. 네 마음을 헤아리면서 같이 정리해 보고 싶어. 무엇부터 도와주면 좋을까?", "혼자 감당하지 않아도 돼. 네 마음을 살피며 같이 방법을 찾아볼게.", "네 마음도 살피면서 같이 생각해 볼게. 뭐부터 도와줄까?");
  case 3:
   return isFeeling
    ? byStyle(style, sender[2] === "F" ? "내가 느낀 점을 말하고 네 마음도 듣고 싶어. 어느 부분이 가장 서운했는지 알려줄래?" : "상황을 차분히 정리하면서 네 마음도 듣고 싶어. 어느 부분이 가장 서운했는지 알려줄래?", "서로 마음 상한 부분을 차분히 나누고 싶어. 네가 어떻게 느꼈는지 먼저 들려줘.", "네 마음은 어땠어? 먼저 듣고 싶어.")
    : byStyle(style, sender[2] === "T" ? "내가 본 상황과 네가 본 상황을 하나씩 맞춰보고 싶어. 어디서 생각이 달랐는지 이야기해 줄래?" : "서로의 마음을 놓치지 않으면서, 어디서 생각이 달랐는지 같이 살펴보고 싶어.", "누가 맞는지 따지기보다 서로 다르게 본 지점을 정리해 보고 싶어.", "서로 다르게 본 지점을 정리해 볼까?");
  case 4:
   if (sender[1] === "S" && isConcrete) return byStyle(style, "아까 네가 맡은 부분을 꼼꼼히 챙긴 게 정말 좋았어. 덕분에 일이 수월했어.", "네가 세심하게 챙긴 덕분에 도움이 많이 됐어. 그 부분이 참 고마워.", "아까 꼼꼼히 챙겨줘서 정말 고마웠어.");
   if (sender[1] === "N" && !isConcrete) return byStyle(style, "이번 일을 해낸 과정에서 네 아이디어와 끈기가 특히 인상적이었어.", "네가 보여준 생각과 노력이 참 좋았어. 덕분에 나도 많이 배웠어.", "네 아이디어와 노력이 정말 인상적이었어.");
   return byStyle(style, "네가 맡은 일을 꼼꼼히 해낸 게 인상적이었어. 그 덕분에 전체 흐름도 좋아졌어.", "네가 세심하게 챙긴 점이 참 고마워. 그 노력이 좋은 결과로 이어졌어.", "네가 꼼꼼히 해낸 덕분에 결과가 좋았어.");
  case 5:
   return recipient[0] === "I"
    ? sender[0] === "E"
      ? byStyle(style, "반가워! 서두르지 않아도 돼. 편한 속도로 천천히 얘기 나눠보자.", "만나서 반가워. 부담 갖지 말고 편한 만큼 이야기해 줘.", "반가워! 천천히 편하게 얘기하자.")
      : byStyle(style, "처음엔 조금 어색할 수 있지만 반가워. 편한 속도로 이야기 나눠보자.", "처음이라 조금 어색해도 괜찮아. 편한 속도로 천천히 알아가자.", "천천히 편하게 얘기 나눠보자.")
    : byStyle(style, isConcrete ? "여기 와본 적 있어? 나는 처음인데 이 공간은 어때 보여?" : "요즘 새로 관심 생긴 거 있어? 재밌게 얘기 나눠보고 싶어!", "요즘 관심 가는 게 뭐야? 네가 좋아하는 이야기를 듣고 싶어.", "요즘 뭐에 관심 있어?");
  case 6:
   return byStyle(style,
    `${prefersPlan || senderPlans ? "이번 주 안에" : "가능한 때"} ${isFeeling ? "잠깐 도와줄 수 있을까? 어렵다면 부담 갖지 말고 편하게 말해 줘." : "이 부분을 도와줄 수 있을까? 어렵다면 가능한 방법을 같이 찾아볼게."}`,
    `혹시 ${prefersPlan ? "이번 주 중" : "편한 때"} 도와줄 수 있을까? ${isFeeling ? "부담 주고 싶진 않아. 어렵다면 편하게 말해 줘." : "어려우면 다른 방법을 찾아볼게."}`,
    `${prefersPlan || senderPlans ? "이번 주" : "편할 때"} 도와줄 수 있어? 어려우면 괜찮아.`);
  case 7:
   return isFeeling
    ? byStyle(style, sender[2] === "F" ? "아까 내 말로 속상하게 했다면 미안해. 네 마음을 제대로 듣고 싶어." : "내가 한 말이 상처가 됐다면 미안해. 어떤 점이 힘들었는지 듣고 바로잡고 싶어.", "내 말이 마음에 남았다면 정말 미안해. 변명보다 네 마음을 먼저 듣고 싶어.", "아까 말 미안해. 네 마음을 듣고 싶어.")
    : byStyle(style, sender[2] === "T" ? "내가 한 말 중 고쳐야 할 부분이 있으면 구체적으로 알려줘. 다음에는 다르게 할게." : "내 말이 너에게 어떻게 닿았는지 알고 싶어. 불편했던 점을 말해주면 더 조심할게.", "내가 무엇을 잘못했는지 제대로 알고 싶어. 불편했던 부분을 말해주면 고칠게.", "내가 고칠 점을 알려줘. 다음엔 조심할게.");
  case 8:
   return isFeeling
    ? byStyle(style, sender[2] === "F" ? "오늘 같이 있어서 즐거웠어. 네 마음도 편할 때 들려주면 좋겠어." : "오늘 같이 있어서 즐거웠어. 나는 다음에 또 보고 싶은데 네 마음은 어때?", "너와 함께한 시간이 참 좋았어. 괜찮다면 다음에도 만나고 싶어. 네 마음도 천천히 알려줘.", "오늘 즐거웠어. 네 마음도 궁금해.")
    : byStyle(style, sender[2] === "T" ? "오늘 같이 있어서 즐거웠어. 다음에 또 만나고 싶어. 너는 어떻게 생각해?" : "오늘 너와 함께한 시간이 참 좋았어. 다음에도 만나고 싶은데 네 생각은 어때?", "너와 함께한 시간이 좋았어. 괜찮다면 다음에 또 만나고 싶은데 네 생각은 어때?", "오늘 즐거웠어. 다음에 또 만날래?");
  case 9:
   if (senderIsOutgoing && recipient[0] === "E") return byStyle(style, "오늘 있었던 일 얘기해 줄게ㅋㅋ 너는 오늘 뭐 했어?", "오늘 하루 어땠어? 재밌었던 일 있으면 같이 나누자 😊", "오늘 뭐 했어? 얘기 나누자!");
   if (recipient[0] === "I") return byStyle(style, "오늘 하루 어땠어? 편할 때 네가 나누고 싶은 이야기 들려줘.", "오늘 하루는 괜찮았어? 답은 천천히 해도 돼. 네 얘기가 궁금해 🌿", "오늘 어땠어? 편할 때 얘기해 줘.");
   return byStyle(style, "요즘 뭐가 제일 재밌어? 네 얘기도 들려줘!", "요즘 즐거웠던 일 있어? 네 이야기를 듣고 싶어 😊", "요즘 뭐가 재밌어?");
  default:
   return baseMessage;
 }
}

export type DialogueExample = {
 firstLabel: string;
 firstMessage: string;
 secondLabel: string;
 secondMessage: string;
};
export type DateDialogueRole = "planner" | "cafeSeeker";

function dateRouteDialogue(planner: Mbti, cafeSeeker: Mbti, style: MessageStyle): DialogueExample {
 const routeReason = planner[1] === "S"
  ? "이 경로면 이동 시간을 줄이면서 계획한 곳들을 다 들를 수 있어."
  : "이 동선이면 우리가 오늘 하고 싶었던 걸 흐름 좋게 다 해볼 수 있을 것 같아.";
 const plannerTone = planner[2] === "T"
  ? "이 코스가 제일 효율적이야."
  : "우리 둘 다 편하게 즐길 수 있을 것 같아.";
 const plannerQuestion = planner[3] === "J"
  ? "이 코스로 가도 괜찮아?"
  : "이 코스 어때? 가고 싶은 곳이 더 있으면 중간에 바꿔도 돼.";
 const firstNatural = `${planner[0] === "E" ? "우리 데이트 코스 같이 보자!" : "동선을 이렇게 정리해 봤어."} ${routeReason} ${plannerTone} ${plannerQuestion}`;
 const firstWarm = `${planner[0] === "E" ? "우리 데이트 코스 같이 맞춰볼까?" : "우리 일정 생각해서 동선을 정리해 봤어."} 이쪽으로 가면 계획한 곳을 다 들를 수 있고, 둘 다 무리 없이 즐길 수 있을 것 같아. 너는 괜찮아?`;
 const firstShort = `${planner[1] === "S" ? "이 동선이면 계획한 곳을 다 들를 수 있어." : "이 코스면 오늘 계획을 이어가기 좋아."} 이렇게 가도 괜찮아?`;

 const acknowledgment = cafeSeeker[2] === "F" ? "동선 생각해줘서 고마워." : "이 코스가 효율적인 건 알겠어.";
 const cafeReason = cafeSeeker[1] === "S"
  ? "그런데 나는 그 카페에 꼭 가보고 싶어. 거기서 먹어보고 싶은 메뉴도 있어."
  : "그런데 나는 그 카페에 꼭 가고 싶어. 이번에 여기 온 이유 중 하나라서 안 가면 아쉬울 것 같아.";
 const compromise = cafeSeeker[2] === "T"
  ? "다른 곳 하나를 줄이고 카페를 넣으면 동선도 크게 무리 없지 않을까?"
  : "같이 가주면 오늘 데이트가 더 특별할 것 같아. 카페를 일정에 넣어줄 수 있을까?";
 const flexibility = cafeSeeker[3] === "J"
  ? "다른 코스 하나를 조정해서 시간표에 넣을 수 있을까?"
  : "카페를 먼저 들르고 나머지는 상황 봐서 정하면 어때?";
 const secondNatural = `${acknowledgment} ${cafeReason} ${cafeSeeker[3] === "J" ? flexibility : compromise}`;
 const secondWarm = `${cafeSeeker[2] === "F" ? "우리 데이트 생각해서 코스 짜줘서 고마워." : "동선 효율을 생각한 건 이해해."} 나도 꼭 가보고 싶은 카페가 있어. 이번에 여기 온 이유와도 연결돼서, 그곳을 들르고 나머지 코스를 같이 조정하면 어떨까?`;
 const secondShort = `${cafeSeeker[1] === "S" ? "나 그 카페 꼭 가보고 싶어." : "나한텐 그 카페도 이번 데이트에서 중요해."} 다른 코스 하나를 바꾸면 어때?`;

 return {
  firstLabel: `동선을 제안하는 사람 · ${planner}`,
  firstMessage: speakAs(planner, byStyle(style, firstNatural, firstWarm, firstShort), style),
  secondLabel: `카페를 제안하는 사람 · ${cafeSeeker}`,
  secondMessage: speakAs(cafeSeeker, byStyle(style, secondNatural, secondWarm, secondShort), style),
 };
}

function counterpartReply(type: Mbti, index: number, style: MessageStyle): string {
 const isFeeling = type[2] === "F";
 const isConcrete = type[1] === "S";
 const isOutgoing = type[0] === "E";
 const prefersPlan = type[3] === "J";
 switch (index) {
  case 0:
   return byStyle(style, isFeeling ? "미안, 오늘 정신이 없어서 답이 늦었어. 기다리게 해서 미안해." : "확인이 늦었어. 지금 봤고, 일정은 토요일로 가능해.", isFeeling ? "답 기다리게 해서 미안해. 네 메시지 봤어. 지금은 이야기할 수 있어 🌿" : "이제 확인했어. 토요일은 가능해. 필요한 내용 보내줘.", "미안, 이제 확인했어. 지금 답할게.");
  case 2:
   return byStyle(style, isFeeling ? "고마워. 사실 요즘 마음이 좀 복잡했어. 조금 더 들어줄 수 있어?" : "고마워. 지금 제일 어려운 건 일정이 꼬인 거야. 같이 방법을 정리해보자.", isFeeling ? "물어봐줘서 고마워. 천천히 말해볼게. 내 편에서 들어주면 좋겠어." : "고마워. 문제를 나눠서 보면 좋겠어. 우선 지금 상황부터 설명할게.", "고마워. 조금 더 얘기해도 될까?");
  case 3:
   return byStyle(style, isFeeling ? "나도 그때 서운했어. 서로 오해한 부분이 있었던 것 같아." : "내가 다르게 본 건 그 부분이야. 상황을 하나씩 맞춰보자.", isFeeling ? "네가 먼저 말해줘서 고마워. 내 마음도 차분히 이야기해볼게." : "좋아. 사실과 서로 다르게 이해한 부분을 나눠서 이야기하자.", "내 생각도 말해볼게. 그 부분부터 맞춰보자.");
  case 4:
   return byStyle(style, isFeeling ? "그렇게 봐줘서 고마워. 네가 말해주니 더 기쁘다 😊" : "고마워. 특히 어떤 부분이 좋았는지 알려주면 다음에도 참고할게.", isFeeling ? "고마워, 네가 알아봐 줘서 정말 힘이 난다 🌷" : "고마워. 도움이 됐다니 다행이야. 구체적으로 말해줘서 더 잘 알겠어.", "고마워! 그렇게 말해주니 좋다.");
  case 5:
   return byStyle(style, isOutgoing ? "반가워! 요즘 어떻게 지내? 최근 재밌는 일 있었어?" : isConcrete ? "안녕! 여기 와본 적 있어? 나는 처음이야." : "안녕. 요즘 새로 관심 생긴 게 있어?", "말 걸어줘서 반가워. 편하게 이야기 나눠보자 😊", "안녕! 요즘 어때?");
  case 6:
   return byStyle(style, prefersPlan ? "가능해. 이번 주 목요일까지 필요한 내용을 보내주면 준비할게." : isConcrete ? "지금은 어렵지만 내일 저녁이면 도와줄 수 있어." : "이번에는 어렵지만 다른 방법을 같이 찾아볼 수 있어.", isFeeling ? "부탁해줘서 고마워. 가능한 만큼 도와볼게. 어려운 부분이 있으면 같이 조정하자." : "가능한 범위와 시간을 정해보자. 이번 주에는 목요일 저녁이 괜찮아.", "가능해. 목요일 저녁 어때?");
  case 7:
   return byStyle(style, isFeeling ? "사과해줘서 고마워. 내가 속상했던 부분도 차분히 이야기하고 싶어." : "알려줘서 고마워. 다음에는 먼저 확인해주면 괜찮을 것 같아.", isFeeling ? "네가 내 마음을 생각해줘서 고마워. 천천히 다시 이야기해보자." : "고마워. 다음엔 같은 일이 생기지 않도록 이렇게 해보자.", "고마워. 다음엔 서로 먼저 확인하자.");
  case 8:
   return byStyle(style, isFeeling ? "솔직하게 말해줘서 고마워. 나도 너를 더 알아가고 싶어." : "말해줘서 고마워. 나도 어떻게 느끼는지 생각해보고 솔직히 답할게.", isFeeling ? "네 마음을 알려줘서 고마워. 나도 너와 함께한 시간이 좋았어." : "고마워. 나도 내 생각을 정리해서 편하게 이야기해볼게.", "말해줘서 고마워. 나도 생각해볼게.");
  case 9:
   return byStyle(style, isOutgoing ? "오늘은 친구 만나서 맛있는 거 먹었어ㅋㅋ 너는 뭐 했어?" : isConcrete ? "오늘은 일하고 장도 봤어. 너는 하루 어땠어?" : "요즘 생각 중인 게 많았어. 너는 최근에 관심 가는 거 있어?", "오늘은 이런 일이 있었어. 네 하루도 천천히 들려줘 😊", "오늘은 이렇게 보냈어. 너는?");
  default:
   return "네 생각도 들려줘.";
 }
}

export function getDialogueExample(sender: Mbti, recipient: Mbti, index: number, style: MessageStyle, dateRole: DateDialogueRole = "planner"): DialogueExample {
 if (index === 1) return dateRole === "planner"
  ? dateRouteDialogue(sender, recipient, style)
  : dateRouteDialogue(recipient, sender, style);
 const guide = getGuide(sender, index, style);
 return {
  firstLabel: `먼저 말을 꺼내는 사람 · ${sender}`,
  firstMessage: speakAs(sender, pairMessage(sender, recipient, index, style, guide.message), style),
  secondLabel: `답하는 사람 · ${recipient}`,
  secondMessage: speakAs(recipient, counterpartReply(recipient, index, style), style),
 };
}

const axisAdvice: Record<string, string> = {
 EI: "대화 속도와 답할 여유를 맞춰 주세요.",
 SN: "구체적인 상황을 말한 뒤 큰 흐름도 덧붙여 주세요.",
 TF: "이유를 분명히 말하면서 상대의 마음도 물어보세요.",
 JP: "일정이나 다음 단계를 제안하고 조정할 여지도 남겨 주세요.",
};

function pairInsight(sender: Mbti, recipient: Mbti, index: number) {
 const priorities = [["EI", "JP"], ["SN", "JP"], ["TF", "EI"], ["TF", "SN"], ["SN", "TF"], ["EI", "SN"], ["JP", "TF"], ["TF", "EI"], ["TF", "EI"], ["EI", "SN"]][index] ?? ["EI", "TF"];
 const dimensionNames: Record<string, string> = { EI: "에너지와 대화 속도", SN: "정보를 주고받는 방식", TF: "판단과 감정 표현", JP: "계획과 유연성" };
 const preferenceNames: Record<string, string> = { E: "외향", I: "내향", S: "구체적 정보", N: "가능성과 맥락", T: "논리와 핵심", F: "감정과 관계", J: "계획과 확정", P: "유연한 선택" };
 const axisIndex: Record<string, number> = { EI: 0, SN: 2, TF: 4, JP: 6 };
 return priorities.map((axis) => {
  const left = sender[axisIndex[axis]];
  const right = recipient[axisIndex[axis]];
  if (left === right) return `두 사람 모두 ${dimensionNames[axis]}에서 ${preferenceNames[left]} 쪽을 편하게 느낄 수 있어요. ${axisAdvice[axis]}`;
  return `나는 ${preferenceNames[left]}, 상대는 ${preferenceNames[right]} 쪽일 수 있어 ${dimensionNames[axis]}이 다를 수 있어요. ${axisAdvice[axis]}`;
 }).join(" ");
}

export function getInteractionGuide(sender: Mbti, recipient: Mbti, index: number, style: MessageStyle, dateRole: DateDialogueRole = "planner") {
 const guide = getGuide(sender, index, style);
 const dialogue = getDialogueExample(sender, recipient, index, style, dateRole);
 return {
  ...guide,
  message: index === 1 ? dateRole === "planner" ? dialogue.firstMessage : dialogue.secondMessage : dialogue.firstMessage,
  interaction: `온라인 카톡 스타일 요약에서 상대 ${recipient}는 ${onlineChatProfiles[recipient]} ${pairInsight(sender, recipient, index)}`,
  dialogue,
 };
}
