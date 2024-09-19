<img src="https://capsule-render.vercel.app/api?type=waving&color=56A63B&height=150&section=header" />

![icon](https://i.imgur.com/tCLlFmV.png)

# Kiwoon

Kiwoon App은 도마뱀의 성장과 환경 조건을 관리 및 모니터링할 수 있는 웹 애플리케이션입니다. 사용자는 도마뱀을 등록하고, 온도와 습도를 실시간으로 확인하며, 다른 도마뱀들과 성장 비교를 할 수 있습니다.

## 주요 기능

- **도마뱀 등록**: 이름, 종, 무게, 입양일 등의 정보 입력
- **도마뱀 목록**: 등록된 도마뱀 목록 확인
- **도마뱀 상세 정보**: 실시간 온도 및 습도 모니터링
- **성장 비교**: 다른 도마뱀과의 성장 비교

## 사용 기술

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
<a href="https://www.notion.so/1-968ce8a13ac14b1dadc8382530b3e525?pvs=4">![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)</a>
<a href="https://drive.google.com/file/d/1asnQV-SeO6_38dQK6d8UGlYQl9VD3KAO/view?usp=sharing">![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)</a>

## 설치 방법

1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/rlnrlnworld/kiwoon-app.git
   cd kiwoon-app
2. **패키지 설치**:
   ```bash
   npm install
4. **개발 서버 실행**:
   ```bash
   npm run dev
6. **브라우저에서 접속**: `http://localhost:1234`에서 애플리케이션 확인 가능

## 프로젝트 구조

```bash

├── .gitignore            # Git에서 무시할 파일/폴더를 지정
├── README.md             # 프로젝트에 대한 문서
├── index.html            # 애플리케이션의 주요 HTML 파일
├── package.json          # 프로젝트 메타데이터 및 의존성 정보
├── package-lock.json     # 의존성 버전을 고정
│
└── 📦src/                  # 애플리케이션의 소스 코드
    ├── 📁Fonts/            # 폰트 파일을 저장하는 폴더
    ├── 📁api/              # API 관련 함수 및 요청을 관리하는 폴더
    │   └── lizard.js     # 도마뱀 관련 API 함수를 처리하는 파일
    ├── 📁components/       # 재사용 가능한 UI 컴포넌트를 저장하는 폴더
    │   ├── LizardItem.js  # 개별 도마뱀 정보를 표시하는 컴포넌트
    │   ├── LizardList.js  # 도마뱀 리스트를 표시하는 컴포넌트
    │   ├── Nav.js         # 내비게이션 컴포넌트
    │   └── PlusLizard.js   # 도마뱀 추가 기능을 제공하는 컴포넌트
    ├── 📁core/             
    │   └── setup.js      # 애플리케이션 설정 로직
    ├── 📁img/              # 애플리케이션에서 사용하는 이미지 파일을 저장하는 폴더
    ├── 📁routes/           # 라우팅 정의 및 내비게이션 로직을 관리하는 폴더
    │   ├── Enclosure.js   # 도마뱀 공간 관련 페이지
    │   ├── GrowthCmp.js   # 성장 비교 페이지
    │   ├── Home.js        # 홈 페이지
    │   ├── Lizard.js      # 도마뱀 상세 페이지
    │   ├── Mating.js      # 번식 관련 페이지
    │   ├── NotFound.js     # 페이지를 찾을 수 없을 때 표시하는 페이지
    │   ├── Register.js    # 도마뱀 등록 페이지
    │   ├── Start.js       # 시작 페이지
    │   └── index.js       # 라우터 설정을 위한 인덱스 파일
    └── 📁store/
        └── lizard.js      # 도마뱀 관련 상태를 관리하는 파일
    │
    ├── App.js            # 애플리케이션의 주요 컴포넌트
    ├── main.css          # 애플리케이션의 주요 스타일시트
    └── main.js           # 애플리케이션을 초기화하는 주요 JavaScript 파일

```
## 사용 방법

1. **도마뱀 목록 확인**: 등록된 도마뱀들을 확인하세요.
2. **도마뱀 상세 정보**: 도마뱀의 온도와 습도를 확인하세요.
3. **성장 비교**: 다른 도마뱀과의 성장을 비교해보세요.

## 향후 업데이트

- 물 뿌리기 기능 추가
- 성장 분석 그래프 제공
- 모프 계산을 통한 교배 서비스 기능 도입

<img src="https://capsule-render.vercel.app/api?type=waving&color=56A63B&height=150&section=footer" />
