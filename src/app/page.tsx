"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import AdBanner from "@/components/AdBanner";
import {
  getInteractionGuide,
  groups,
  matchSituation,
  mbtiTypes,
  replyHabits,
  situations,
  type DateDialogueRole,
  type Mbti,
} from "@/data/guides";

type Style = "natural" | "warm" | "short";

const customFallbackMessages: Record<Style, string> = {
  natural: "내가 하고 싶은 말을 정리해 봤어. 지금 괜찮다면 편하게 이야기 나누고 싶어.",
  warm: "네 마음도 소중하게 생각하고 있어. 괜찮을 때 천천히 이야기 나눠 볼래? 🌿",
  short: "지금 괜찮다면 이 얘기 잠깐 나눌 수 있을까?",
};

export default function Home() {
  const [type, setType] = useState<Mbti>("INFP");
  const [recipientType, setRecipientType] = useState<Mbti>("ENFJ");
  const [dateRole, setDateRole] = useState<DateDialogueRole>("planner");
  const [situation, setSituation] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customSituation, setCustomSituation] = useState("");
  const [style, setStyle] = useState<Style>("natural");
  const [editedMessage, setEditedMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareNotice, setShareNotice] = useState("");

  const customMatch = customMode ? matchSituation(customSituation) : null;
  const usesGenericCustom = customMode && (!customSituation.trim() || customMatch === null);
  const matchedSituation = customMatch ?? situation;
  const guide = getInteractionGuide(type, recipientType, matchedSituation, style, dateRole);
  const guideTitle = usesGenericCustom ? "직접 입력한 상황" : guide.title;
  const guideCaution = usesGenericCustom ? "상대가 바로 답하기 어려울 수도 있어요. 답할 여지를 남기고, 필요하면 문장을 직접 다듬어 보내세요." : guide.caution;
  const guideExtra = usesGenericCustom ? "상황의 핵심을 한 번에 전하고, 상대가 답할 여유를 남겨 보세요." : guide.extra;
  const suggestedMessage = usesGenericCustom
    ? customFallbackMessages[style]
    : guide.message;

  useEffect(() => {
    setEditedMessage(suggestedMessage);
  }, [suggestedMessage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedType = params.get("type") as Mbti | null;
    const sharedRecipient = params.get("recipient") as Mbti | null;
    const sharedSituation = Number(params.get("situation"));
    const sharedDateRole = params.get("dateRole");
    if (sharedType && mbtiTypes.includes(sharedType)) setType(sharedType);
    if (sharedRecipient && mbtiTypes.includes(sharedRecipient) && sharedRecipient !== sharedType) setRecipientType(sharedRecipient);
    if (sharedDateRole === "planner" || sharedDateRole === "cafeSeeker") setDateRole(sharedDateRole);
    if (Number.isInteger(sharedSituation) && sharedSituation >= 1 && sharedSituation <= situations.length) setSituation(sharedSituation - 1);
  }, []);

  function chooseSituation(index: number) {
    setSituation(index);
    setCustomMode(false);
    setShareNotice("");
  }

  function startCustomSituation() {
    setCustomMode(true);
    setShareNotice("");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(editedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function shareKakao() {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) {
      setShareNotice("카카오 공유 키가 아직 설정되지 않았어요.");
      return;
    }
    if (!window.Kakao) {
      setShareNotice("카카오 공유 기능을 불러오는 중이에요. 잠시 후 다시 눌러 주세요.");
      return;
    }
    if (!window.Kakao.isInitialized()) window.Kakao.init(key);
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    url.searchParams.set("recipient", recipientType);
    url.searchParams.set("situation", String(matchedSituation + 1));
    url.searchParams.set("dateRole", dateRole);
    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: editedMessage,
      link: { webUrl: url.toString(), mobileWebUrl: url.toString() },
    });
  }

  const situationLabel = customMode
    ? customSituation.trim() || "직접 입력한 상황"
    : situations[situation];

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.0/kakao.min.js"
        strategy="afterInteractive"
      />
      <main className="min-h-screen px-5 pb-16 md:px-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
          <a href="#top" className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d8f36a] text-sm">M</span>
            MBTI TALK
          </a>
          <span className="hidden text-xs tracking-[.18em] text-stone-500 sm:block">
            PERSONAL CONVERSATION GUIDE
          </span>
          <a href="#guide" className="rounded-full border border-stone-300 px-4 py-2 text-sm hover:bg-white">
            가이드 보기 ↗
          </a>
        </header>

        <section id="top" className="mx-auto grid max-w-6xl gap-10 pb-14 pt-10 md:grid-cols-[1.2fr_.8fr] md:items-center md:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-stone-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" /> 마음을 전하는 더 나은 한마디
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.12] tracking-[-.055em] md:text-7xl">
              말 한마디,<br />조금 더 <span className="underline decoration-[#d8f36a] decoration-[10px] underline-offset-[-2px]">나다운</span> 방식으로.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-stone-600">
              상황과 성향을 골라 보세요. 막막한 대화의 순간에, 마음은 잘 전하고 부담은 덜어 주는 문장을 함께 찾아드려요.
            </p>
            <a href="#picker" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#24221f] px-6 py-3.5 text-sm font-semibold text-white hover:bg-stone-700">
              내 대화 가이드 찾기 <span className="text-[#d8f36a]">↓</span>
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -right-3 top-5 rotate-6 rounded-2xl bg-[#f5e5d8] px-4 py-3 text-sm shadow-sm">이 말, 어떻게 보내지? 💭</div>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-[0_20px_70px_-40px_rgba(30,30,20,.35)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ecf5d6] text-lg">✳</div>
                <div><div className="text-sm font-bold">오늘의 대화 메모</div><div className="mt-0.5 text-xs text-stone-500">마음을 담아, 가볍게</div></div>
                <span className="ml-auto text-xs text-stone-400">09:41</span>
              </div>
              <div className="ml-8 rounded-2xl rounded-tl-sm bg-[#f6f5f1] p-4 text-sm leading-6 text-stone-700">
                상대의 마음을 다 알 수는 없어도,<br /><b className="font-semibold text-stone-900">내 마음을 잘 전할 수는 있으니까.</b>
              </div>
              <div className="mt-4 flex justify-end"><span className="rounded-2xl rounded-tr-sm bg-[#e9f5c8] px-4 py-3 text-sm">천천히, 나다운 말로 🌱</span></div>
              <div className="mt-6 border-t border-dashed border-stone-200 pt-4 text-center text-xs tracking-wide text-stone-400">A LITTLE GUIDE FOR BETTER TALK</div>
            </div>
            <div className="absolute -bottom-5 -left-4 grid h-16 w-16 rotate-[-10deg] place-items-center rounded-2xl bg-[#d8f36a] text-2xl shadow-md">♡</div>
          </div>
        </section>

        <section id="picker" className="mx-auto max-w-6xl border-t border-stone-200 py-12">
          <div className="mb-8 flex items-end justify-between">
            <div><p className="text-xs font-bold tracking-[.16em] text-stone-400">01 — YOUR TYPE</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">나의 MBTI를 골라주세요</h2></div>
            <span className="text-sm text-stone-500">{type} 선택됨 · {groups[type]}형</span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {mbtiTypes.map((mbti) => (
              <button key={mbti} onClick={() => { setType(mbti); if (recipientType === mbti) setRecipientType(mbtiTypes.find((candidate) => candidate !== mbti)!); }} aria-pressed={type === mbti}
                className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${type === mbti ? "border-[#24221f] bg-[#24221f] text-white" : "border-stone-200 bg-white hover:border-stone-400"}`}>
                {mbti}
              </button>
            ))}
          </div>

          <div className="mb-5 mt-12 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold tracking-[.16em] text-stone-400">02 — THEIR TYPE</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">상대방의 MBTI를 골라주세요</h2></div>
            <span className="text-sm text-stone-500">{type} → {recipientType}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {mbtiTypes.filter((mbti) => mbti !== type).map((mbti) => (
              <button key={mbti} onClick={() => setRecipientType(mbti)} aria-pressed={recipientType === mbti}
                className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${recipientType === mbti ? "border-[#24221f] bg-[#24221f] text-white" : "border-stone-200 bg-white hover:border-stone-400"}`}>
                {mbti}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-stone-500">내 유형과 다른 유형을 선택하면, 상대의 대화 선호를 참고해 상황별 문장을 조정해요. MBTI는 참고 기준이며 실제 반응은 사람마다 다를 수 있어요.</p>

          <div className="mb-5 mt-12 flex items-end justify-between">
            <div><p className="text-xs font-bold tracking-[.16em] text-stone-400">03 — THE MOMENT</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">어떤 대화가 고민인가요?</h2></div>
            <span className="text-sm text-stone-500">{customMode ? "직접 입력" : `${String(situation + 1).padStart(2, "0")} / 10`}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {situations.map((label, index) => (
              <button key={label} onClick={() => chooseSituation(index)} aria-pressed={!customMode && situation === index}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${!customMode && situation === index ? "border-[#24221f] bg-[#f0f4e5]" : "border-stone-200 bg-white hover:bg-stone-50"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${!customMode && situation === index ? "bg-[#d8f36a]" : "bg-stone-100 text-stone-500"}`}>{String(index + 1).padStart(2, "0")}</span>
                {!customMode && situation === index ? <b>{label}</b> : label}
              </button>
            ))}
            <button onClick={startCustomSituation} aria-pressed={customMode}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${customMode ? "border-[#24221f] bg-[#f0f4e5]" : "border-stone-200 bg-white hover:bg-stone-50"}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-base ${customMode ? "bg-[#d8f36a]" : "bg-stone-100 text-stone-500"}`}>＋</span>
              {customMode ? <b>내 상황 직접 입력</b> : "직접 입력하기"}
            </button>
          </div>
          {customMode && (
            <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-4">
              <label htmlFor="custom-situation" className="mb-2 block text-sm font-semibold">어떤 상황인지 편하게 적어주세요</label>
              <textarea id="custom-situation" value={customSituation} onChange={(event) => setCustomSituation(event.target.value)}
                placeholder="예: 친구에게 서운했던 마음을 부담스럽지 않게 전하고 싶어요."
                rows={3} maxLength={300}
                className="w-full resize-y rounded-xl bg-[#f8f7f3] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-stone-400 focus:ring-2 focus:ring-[#d8f36a]" />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                <span>입력한 상황의 핵심어를 보고 가장 가까운 템플릿 문장을 골라드려요. 아래 문장은 직접 고칠 수 있어요.</span>
                <span>{customSituation.length}/300</span>
              </div>
            </div>
          )}
        </section>

        <section id="guide" className="mx-auto max-w-6xl scroll-mt-8 border-t border-stone-200 py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[.16em] text-stone-400">YOUR CONVERSATION GUIDE</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">이렇게 시작해 볼까요?</h2>
              <p className="mt-2 text-sm text-stone-500">내 {type} · 상대 {recipientType} · {situationLabel}</p>
            </div>
            <div className="flex rounded-full bg-stone-100 p-1">
              {([["natural", "자연스럽게"], ["warm", "다정하게"], ["short", "간결하게"]] as const).map(([value, label]) => (
                <button key={value} onClick={() => setStyle(value)} aria-pressed={style === value}
                  className={`rounded-full px-3 py-2 text-xs ${style === value ? "bg-white font-semibold shadow-sm" : "text-stone-500"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AdBanner slot="mbti-result-middle" format="horizontal" />

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-stone-200 bg-white p-5 md:col-span-1">
              <div className="text-xs font-bold tracking-wide text-stone-400">이럴 수 있어요</div>
              <h3 className="mt-3 font-semibold">{guideTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{usesGenericCustom ? "입력한 상황에 맞는 추천을 찾을 수 있도록 핵심 상황을 더 적거나 목록에서 가까운 항목을 골라보세요." : matchedSituation === 0 ? replyHabits[type] : guide.approach}</p>
            </article>
            <article className="rounded-2xl border border-stone-200 bg-white p-5 md:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="editable-message" className="text-xs font-bold tracking-wide text-stone-400">보내기 좋은 문장 · 직접 수정 가능</label>
                <span className="rounded-full bg-[#f1f5e8] px-2.5 py-1 text-xs">{usesGenericCustom ? "직접 입력 기본 문장" : `${type} → ${recipientType} 맞춤`}</span>
              </div>
              <blockquote className="mt-5 rounded-2xl bg-[#f8f7f3] px-4 py-3 text-xl font-medium leading-8 tracking-tight focus-within:ring-2 focus-within:ring-[#d8f36a]">
                <textarea id="editable-message" aria-label="보내기 좋은 문장 수정" value={editedMessage}
                  onChange={(event) => setEditedMessage(event.target.value)} rows={3} maxLength={500}
                  className="w-full resize-y bg-transparent outline-none placeholder:text-stone-400" />
              </blockquote>
              <div className="mt-2 text-right text-xs text-stone-400">{editedMessage.length}/500</div>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                {usesGenericCustom ? "입력한 상황과 가까운 템플릿을 찾지 못해 기본 문장을 보여드려요. 문장을 직접 고쳐서 사용할 수 있어요." : `내 ${type}의 대화 방식과 상대 ${recipientType}가 편하게 느낄 수 있는 표현을 상황에 맞춰 조합한 문장입니다.`}
              </p>
              <div className="mt-4 rounded-xl bg-[#f8f7f3] px-4 py-3 text-sm text-stone-600"><span className="mr-2 text-stone-400">추가 문장</span>{guideExtra}</div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={copy} className="rounded-full bg-[#24221f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-700">{copied ? "복사했어요 ✓" : "문장 복사하기 ↗"}</button>
                <button onClick={shareKakao} className="rounded-full bg-[#fee500] px-5 py-2.5 text-sm font-semibold text-[#24221f] hover:brightness-95">카카오톡으로 공유</button>
              </div>
              {shareNotice && <p role="status" className="mt-3 text-xs text-stone-500">{shareNotice}</p>}
            </article>
            <article className="rounded-2xl border border-stone-200 bg-[#f1f5e8] p-5 md:col-span-2">
              <div className="text-xs font-bold tracking-wide text-stone-400">대화 접근법</div>
              <p className="mt-3 text-sm leading-6 text-stone-700">{usesGenericCustom ? "상황을 조금 더 구체적으로 적거나 위의 상황 템플릿을 골라보세요." : guide.approach}</p>
              {!usesGenericCustom && <div className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm leading-6 text-stone-700">
                <b>{type} ↔ {recipientType} 상호작용</b>
                <p className="mt-2">{guide.interaction}</p>
                <p className="mt-2 text-xs text-stone-500">온라인 MBTI 카톡 글은 재미와 공감을 위한 참고 자료예요. 실제 말투와 선호는 개인마다 다를 수 있어요.</p>
                <details className="mt-3 border-t border-stone-200 pt-3 text-xs">
                  <summary className="cursor-pointer font-semibold">참고한 공개 자료</summary>
                  <ul className="mt-2 space-y-1.5 underline decoration-stone-300 underline-offset-2">
                    <li><a href="https://mbti.sundry-know.com/articles/kakaotalk-reply-style-guide" target="_blank" rel="noreferrer">MBTI별 카톡 답장 스타일 가이드</a></li>
                    <li><a href="https://mbtitypeguide.com/en/psychology/how-every-mbti-type-texts" target="_blank" rel="noreferrer">How Every MBTI Type Texts</a></li>
                    <li><a href="https://www.truity.com/blog/how-your-texting-habits-reveal-your-personality" target="_blank" rel="noreferrer">Truity: Texting Habits and Personality</a></li>
                    <li><a href="https://www.16personalities.com/articles/from-miscommunication-to-effective-team-communication-insights-into-every-personality-type" target="_blank" rel="noreferrer">16Personalities: Communication Differences</a></li>
                    <li><a href="https://asia.themyersbriggs.com/wp-content/uploads/2016/09/8.FormM-Communication-Style-Report-NEW.pdf" target="_blank" rel="noreferrer">MBTI Communication Style Report</a></li>
                    <li><a href="https://www.microsoft.com/en-us/research/publication/style-and-alignment-in-information-seeking-conversation/" target="_blank" rel="noreferrer">Microsoft Research: Conversation Style Alignment</a></li>
                  </ul>
                </details>
              </div>}
              <div className="mt-4 border-t border-stone-200 pt-4 text-xs font-semibold text-stone-500">이렇게 해보세요</div>
              <p className="mt-2 text-sm leading-6 text-stone-700">{guideTitle} — 말하고 싶은 핵심을 한 번에 전하고, 상대가 답할 시간을 남겨 주세요.</p>
            </article>
            <article className="rounded-2xl border border-stone-200 bg-white p-5 md:col-span-1">
              <div className="text-xs font-bold tracking-wide text-stone-400">작은 주의점</div>
              <p className="mt-3 text-sm leading-6 text-stone-600">{guideCaution}</p>
            </article>
          </div>
          {!usesGenericCustom && <article className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <div className="text-xs font-bold tracking-wide text-stone-400">TWO-PERSON CHAT EXAMPLE</div>
                <h3 className="mt-2 text-lg font-semibold">두 유형은 이렇게 주고받을 수 있어요</h3>
              </div>
              <span className="rounded-full bg-[#f1f5e8] px-3 py-1 text-xs text-stone-600">{type} ↔ {recipientType}</span>
            </div>
            {matchedSituation === 1 && <p className="mt-2 text-sm text-stone-500">데이트 동선과 꼭 가고 싶은 카페의 의견을 조율하는 예시예요.</p>}
            {matchedSituation === 1 && <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-stone-500">내 대화 역할</span>
              {([["planner", "동선을 제안하는 사람"], ["cafeSeeker", "카페를 제안하는 사람"]] as const).map(([value, label]) => (
                <button key={value} onClick={() => setDateRole(value)} aria-pressed={dateRole === value}
                  className={`rounded-full border px-3 py-2 text-xs transition ${dateRole === value ? "border-[#24221f] bg-[#24221f] text-white" : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"}`}>
                  {label}
                </button>
              ))}
            </div>}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl rounded-tl-sm bg-[#f6f5f1] p-4">
                <div className="text-xs font-semibold text-stone-500">{guide.dialogue.firstLabel}</div>
                <p className="mt-2 text-sm leading-6 text-stone-800">{guide.dialogue.firstMessage}</p>
              </div>
              <div className="rounded-2xl rounded-tr-sm bg-[#e9f5c8] p-4">
                <div className="text-xs font-semibold text-stone-500">{guide.dialogue.secondLabel}</div>
                <p className="mt-2 text-sm leading-6 text-stone-800">{guide.dialogue.secondMessage}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">대화 예시는 선택한 유형과 상황을 조합해 만든 예시예요. 실제 상대의 말이나 반응을 예측하거나 단정하지 않습니다.</p>
          </article>}
          <p className="mt-5 text-xs leading-5 text-stone-400">MBTI는 대화를 시작하는 참고 정보일 뿐, 사람을 단정하지 않아요. 같은 유형 안에서도 성격과 상황은 다양할 수 있어요.</p>

          <AdBanner slot="mbti-bottom-banner" format="auto" />
        </section>

        <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-stone-200 py-6 text-xs text-stone-400">
          <span>© 2026 MBTI TALK</span><span>마음을 전하는 더 나은 한마디</span>
        </footer>
      </main>
    </>
  );
}
