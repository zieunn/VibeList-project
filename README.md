# 🎧 프로젝트 제목: VibeList – 감각적인 음악 추천 & 플레이리스트 웹앱

## 📌 프로젝트 소개
**VibeList**는 사용자의 음악 취향을 반영해 곡을 관리하고, 나만의 플레이리스트를 만들 수 있는 **웹 음악 추천 서비스**입니다.  
iTunes Open API를 활용해 실시간으로 곡 데이터를 불러오며, Poolsuite 감성의 **빈티지 라디오 스타일 UI**로 구성되어 있습니다.  
음악 추가, 즐겨찾기, 정렬·필터링, iTunes 검색 기반 자동 수집 등 다양한 기능을 제공합니다.

---

## ⚙️ 주요 기능
- 🎵 **음악 관리**
  - 노래 추가 / 수정 / 삭제
  - 즐겨찾기(⭐) 토글 및 전용 목록 보기
- 📂 **플레이리스트**
  - 새 플레이리스트 생성 및 삭제
  - 곡을 리스트에 추가 / 제거
- 🔍 **검색 & 필터**
  - 제목, 아티스트, 앨범, 장르별 실시간 검색
  - 장르 필터 및 정렬 옵션 (최신순, 제목순, 아티스트순 등)
- 🌐 **iTunes API 연동**
  - 검색어로 iTunes 음악 데이터 자동 가져오기
  - 커버 이미지, 장르, 30초 미리듣기 URL 자동 매핑
- 🎧 **하단 라디오 덱 (Now Playing Deck)**
  - ▶ / ⏸ / ⏮ / ⏭ 버튼으로 재생 제어
  - 볼륨 조절 (localStorage에 영구 저장)
  - 셔플 / 즐겨찾기 전용 / 전체 재생 모드 지원
- 💾 **데이터 영속성**
  - 모든 곡, 플레이리스트, 설정은 **localStorage**에 자동 저장
  - 브라우저 새로고침/종료 후에도 유지

---

## 🛠 사용한 기술 스택
| 구분 | 기술 |
|------|------|
| **Frontend Framework** | React (Vite 기반) |
| **Styling** | Tailwind CSS |
| **Language** | TypeScript |
| **Data Storage** | localStorage |
| **API** | iTunes Search Open API |
| **Build Tool** | Vite |
| **Etc.** | ESLint, PostCSS, Autoprefixer |

---

## 🚀 실행 방법
### 로컬 실행
1. 저장소 클론  
   ```bash
   git clone https://github.com/zieunn/VibeList-project.git
   cd VibeList-project

2. 패키지 설치
    ```bash
    npm install

3. 개발 서버 실행
    ```bash
    npm run dev



## 실행 화면
<img width="1440" height="900" alt="screenshots:main-ui" src="https://github.com/user-attachments/assets/7969963e-c604-4ce0-bf30-6ebf88868d59" />
