export default function Onboarding({ step = 0, onNext }) {
  if (step === 0) {
    return (
      <div className="onboarding-screen active">
        <div className="onboarding-container">
          <h2 className="onboarding-title">
            <span className="icon">🌱</span>마을엔진 사용 가이드
          </h2>
          <ul className="onboarding-list">
            <li>
              <strong>
                <span className="icon">🗺️</span>지도
              </strong>
              <span>다회용기를 이용할 수 있는 로컬 맛집을 탐색하세요!</span>
            </li>
            <li>
              <strong>
                <span className="icon">📍</span>발견
              </strong>
              <span>다회용기 챌린저들이 좋아하는 맛집 랭킹 구경하세요!</span>
            </li>
            <li>
              <strong>
                <span className="icon">🏠</span>서포터즈
              </strong>
              <span>다회용기 챌린지와 관련된 소식을 받아보세요!</span>
            </li>
            <li>
              <strong>
                <span className="icon">📂</span>게시판
              </strong>
              <span>로컬 맛집과 다회용기 챌린지에 관해 이야기를 나눠요!</span>
            </li>
          </ul>
          <button className="onboard-btn" onClick={onNext}>확인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-screen active">
      <div className="onboarding-container">
        {/* ▼▼▼ 바로 이 부분의 아이콘도 span으로 감쌌습니다 ▼▼▼ */}
        <h2 className="onboarding-title">
          <span className="icon">🎒</span>준비되셨나요?
        </h2>
        <p className="onboarding-desc">
          다회용기로 환경을 지키면서<br/>
          구석구석 숨어있는 로컬 맛집을 찾아낼 준비가 되셨나요?
        </p>
        <button className="onboard-btn" onClick={onNext}>맛집 찾으러 떠나기</button>
      </div>
    </div>
  );
}