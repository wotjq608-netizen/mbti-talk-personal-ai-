# GitHub → Render 배포 및 카카오톡 연동

## Render 설정

저장소 루트의 `render.yaml`에 Render Blueprint가 읽을 웹 서비스 설정을 추가했습니다.

- 서비스: Node.js Web Service (Next.js 앱과 `/api/kakao/skill`을 함께 실행)
- 플랜: Free
- 빌드: `npm ci && npm run build`
- 시작: `npm start`
- 상태 확인: `/`
- Node.js: 22.16.0
- Kakao 브라우저 SDK 키: Render가 생성 시 값을 입력하도록 요청

정적 사이트 유형으로 만들면 Next.js API 경로를 실행할 Node 서버가 없으므로 이 앱에는 사용하지 않습니다.

## GitHub에 올리기

GitHub 저장소의 최상위에 이 폴더의 파일들이 보여야 합니다. 즉, GitHub 저장소의 루트에서 `package.json`과 `render.yaml`이 바로 보여야 합니다.

1. GitHub에서 새 비공개 저장소를 만듭니다.
2. Git이 설치되어 있으면 이 폴더에서 저장소를 초기화하고 커밋한 뒤 GitHub 원격 저장소로 푸시합니다.
3. `.gitignore`에 따라 `node_modules`, `.next`, `.env.local`은 푸시하지 않습니다.
4. GitHub 저장소에서 `package.json`, `src`, `render.yaml`이 루트에 놓였는지 확인합니다.

PowerShell 명령 예시 (저장소 주소는 본인 주소로 바꿉니다):

```powershell
cd C:\Users\user03\Documents\Codex\2026-11-13\new-chat\mbti-talk
git init
git add .
git commit -m "Prepare MBTI TALK for Render"
git branch -M main
git remote add origin https://github.com/본인계정/mbti-talk.git
git push -u origin main
```

## Render에서 서비스 만들기

1. Render에 로그인하고 GitHub 저장소 접근을 연결합니다.
2. New → Blueprint를 선택하고 `mbti-talk` 저장소를 지정합니다. 일반 Web Service를 만들 경우 `render.yaml`과 동일하게 설정합니다.
3. `NEXT_PUBLIC_KAKAO_JS_KEY` 값을 입력해 첫 배포를 시작합니다. Kakao Developers 앱에서 얻는 JavaScript 키만 사용하고, Admin 키나 REST API 키는 넣지 않습니다.
4. Render가 빌드 완료 후 `https://<서비스명>.onrender.com` 주소를 제공합니다.
5. 이후 GitHub의 `main` 브랜치에 푸시하면 Render가 자동으로 다시 배포합니다.

## 카카오 설정 및 검증

### 카카오톡 공유

1. Kakao Developers에서 앱을 만들고 JavaScript 키를 가져옵니다.
2. 앱의 플랫폼 설정에 `http://localhost:3000`과 Render 서비스 주소를 웹 도메인으로 등록합니다.
3. Render 서비스의 `NEXT_PUBLIC_KAKAO_JS_KEY`에 JavaScript 키를 넣고 재배포합니다.
4. 배포 화면에서 카카오톡 공유 버튼을 눌러 결과 문장과 URL을 확인합니다.

현재 앱은 Kakao JavaScript SDK의 `Kakao.Share.sendDefault()`를 사용합니다. 카카오톡 공유는 REST API 방식이 아니라 SDK 방식이며, 사용자가 카카오톡에서 공유 대상을 직접 선택합니다.

### 채널 챗봇 스킬

1. 카카오톡 채널과 챗봇 관리자센터의 봇을 준비합니다.
2. 사용자에게 MBTI와 상황 번호(1–10)를 받는 블록을 구성합니다.
3. 스킬 서버 URL에 `https://<서비스명>.onrender.com/api/kakao/skill`을 등록합니다.
4. 봇 테스트에서 `INFP 1`, 이름이 빠진 값, 잘못된 상황 번호를 확인한 뒤 블록에 스킬을 연결합니다.
5. 채널에서 실제 응답을 확인합니다.

웹과 챗봇은 동일한 `src/data/guides.ts` 콘텐츠를 사용합니다. 개인 카카오톡 대화방을 읽지 않고, 사용자가 선택하거나 직접 보낸 MBTI/상황만 처리합니다.

## 실행 환경의 미확인 항목

- 이 컴퓨터에서 Git 명령을 찾지 못했습니다. Git 설치 또는 GitHub 웹 업로드가 필요합니다.
- 로컬 Node 프로세스가 사용자 경로 `C:\Users\user03`를 확인할 때 EPERM 오류가 발생해 빌드와 로컬 실행을 검증하지 못했습니다. Render의 첫 빌드 로그로 클라우드 빌드 성공 여부를 확인해야 합니다.
- Kakao 키, GitHub 저장소, Render 계정 연결은 아직 입력되지 않았습니다. 비밀키는 소스 코드나 GitHub에 넣지 않습니다.
