# 🍏 Retrun Table_Team.마을엔진

## 📋 Context

리턴테이블은 이화여대 상권에서 시작된 지역 상권과 환경 중심 맛집 지도 서비스입니다.
다회용기 픽업 서비스 제휴 업체 검색 및 다회용기 챌린지 참여 기능을 제공합니다.

---

## 🖥️ 주요 기능

- 🗺️ **Map**: 카카오맵으로 친환경 가게 탐색
- 📍 **검색**: 다회용기 사용 가능한 맛집 랭킹
- ❤️ **저장**: 마음에 드는 가게 저장
- 📂 **게시판**: 맛집 후기 및 챌린지 인증
- 🏠 **서포터즈**: 챌린지 소식
- 👤 **MY**: 챌린지 기록 및 내 활동

---

## 🚀 Let's Start!

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

---

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── Header.jsx
│   ├── BottomNav.jsx
│   ├── Modal.jsx
│   └── RestaurantCard.jsx
│
├── pages/               # 페이지 컴포넌트
│   ├── Discovery.jsx    # 발견 페이지
│   ├── Map.jsx          # 지도 페이지
│   ├── Saved.jsx        # 저장 페이지
│   ├── Board.jsx        # 게시판
│   ├── Supporters.jsx   # 서포터즈
│   ├── MyPage.jsx       # 마이페이지
│   └── OnBoarding.jsx   # 온보딩
│
├── data/                # 데이터 파일
│   └── restaurants.js   # 레스토랑 및 게시글 데이터
│
├── hooks/               # 커스텀 훅
│   └── useLocalStorage.js
│
├── styles/              # css 파일
│   └── Map.css
│
├── App.jsx              # 메인 앱 컴포넌트
├── App.css              # 메인 스타일
└── main.jsx             # 진입점
```

---

## 📊 데이터 추가하기

새로운 업체를 추가하려면 `src/data/restaurants.js` 파일을 수정하세요:

```javascript
export const restaurantsData = [
  // 기존 업체...
  
  // 새 업체 추가
  {
    id: 7,                              // 고유 ID
    name: '새로운 카페',
    category: '카페',
    type: 'cafe',                       // 'restaurant' 또는 'cafe'
    lat: 37.5555,                       // 위도
    lng: 126.9444,                      // 경도
    address: '서울 서대문구 ...',
    phone: '02-XXX-XXXX',
    hours: '10:00 - 22:00',
    description: '맛있는 커피와 디저트',
    rating: 4.5,
    reviewCount: 100,
    ecoBonus: '텀블러 500원 할인',
    rank: 7,
    image: '/images/새카페.jpg'         // 이미지 경로
  }
];
```

---

## 🖥️ 주요 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **Kakao Maps API** - 지도 기능
- **Local Storage** - 데이터 저장

---

## 🖥️ 주요 개선사항 (2025.10.26)

1. 파일 구조 개선 - 역할별로 명확하게 분리
2. 컴포넌트 재사용성 향상
3. 코드 가독성 개선
4. 데이터 구조 통합
5. 성능 최적화 (React.lazy, useMemo 준비)

---

## 📱 주요 화면

1. **지도** - 주변 친환경 가게(현 이대 상권) 검색
2. **발견** - 인기 맛집 랭킹
3. **저장** - 북마크한 가게 목록
4. **게시판** - 후기 및 챌린지 인증
5. **마이페이지** - 챌린지 기록 확인

---

## 🐛 문제 해결

### 지도가 표시되지 않는 경우
- 카카오 API 키가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 빌드 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 라이선스

MIT License

---

## 👥 기여

프로젝트 개선 아이디어나 버그 리포트는 언제나 환영합니다!

---

**🌱 마을엔진과 함께 지속 가능한 지역 상권을 만들어봐요! 🌱**

Team.마을엔진 - 이화여자대학교 김예원(화공신소재공학과 24), 권민지(통계학과 24), 남기림(컴퓨터공학과 24), 백재은(컴퓨터공학과 24)
