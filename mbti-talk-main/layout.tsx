import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "MBTI TALK — 나다운 대화의 시작", description: "대화 상황과 MBTI를 바탕으로, 마음을 전하는 문장을 찾아보세요." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
