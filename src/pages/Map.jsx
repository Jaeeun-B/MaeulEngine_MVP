import { useEffect, useRef, useState } from 'react';
import { restaurantsData } from '../data/restaurants';
import '../styles/Map.css';

const KAKAO_API_KEY = '8b3f5a420232f65549b8cea565f5f9d3';

// 카카오맵이 로드될 때까지 대기
function loadKakaoMaps() {
  return new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      return resolve(window.kakao);
    }

    // 로드될 때까지 체크
    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkInterval);
        resolve(window.kakao);
      }
      // 5초 후에도 안 되면 에러
      if (attempts > 50) {
        clearInterval(checkInterval);
        reject(new Error('카카오맵 로드 실패: index.html에 스크립트가 있는지 확인하세요'));
      }
    }, 100);
  });
}

export default function MapPage() {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const markersRef = useRef([]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState(null);

  // 카테고리별 필터링
  const filteredStores = selectedCategory === 'all' 
    ? restaurantsData 
    : restaurantsData.filter(store => store.type === selectedCategory);

  // 지도 및 마커 생성
  useEffect(() => {
    let mounted = true;

    loadKakaoMaps()
      .then((kakao) => {
        if (!mounted || !mapRef.current) return;

        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.5565, 126.9445), // 이대역 중심
          level: 4, // 확대 레벨 (숫자가 작을수록 확대)
        };

        const map = new kakao.maps.Map(container, options);
        mapObjRef.current = map;

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 마커 이미지 설정
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        
        // 필터링된 가게들에 마커 생성
        filteredStores.forEach((store) => {
          const imageSize = new kakao.maps.Size(24, 35);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(store.lat, store.lng),
            map: map,
            title: store.name,
            image: markerImage
          });

          // 마커 클릭 이벤트
          kakao.maps.event.addListener(marker, 'click', function() {
            setSelectedStore(store);
            
            // 지도 중심을 마커 위치로 이동
            const moveLatLon = new kakao.maps.LatLng(store.lat, store.lng);
            map.panTo(moveLatLon);
          });

          markersRef.current.push(marker);
        });

      })
      .catch((err) => {
        console.error('[Map] 카카오 지도 로드 실패:', err);
      });

    return () => {
      mounted = false;
    };
  }, [filteredStores]);

  return (
    <div id="mapPage" className="map-container">
      {/* 필터 버튼 */}
      <div className="map-filter-bar">
        <button 
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          전체
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'restaurant' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('restaurant')}
        >
          🍽️ 식당
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'cafe' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('cafe')}
        >
          ☕ 카페
        </button>
      </div>

      {/* 지도 */}
      <div
        ref={mapRef}
        className="kakao-map"
      />

      {/* 선택된 가게 정보 */}
      {selectedStore && (
        <div className="store-info-card">
          <button 
            className="close-btn"
            onClick={() => setSelectedStore(null)}
          >
            ✕
          </button>
          <h3 className="store-name">{selectedStore.name}</h3>
          <p className="store-category">{selectedStore.category}</p>
          <p className="store-description">{selectedStore.description}</p>
          
          <div className="store-details">
            <div className="detail-item">
              <span className="icon">📍</span>
              <span>{selectedStore.address}</span>
            </div>
            <div className="detail-item">
              <span className="icon">📞</span>
              <span>{selectedStore.phone}</span>
            </div>
            <div className="detail-item">
              <span className="icon">⏰</span>
              <span>{selectedStore.hours}</span>
            </div>
            <div className="detail-item">
              <span className="icon">⭐</span>
              <span>{selectedStore.rating} ({selectedStore.reviewCount} 리뷰)</span>
            </div>
          </div>

          <div className="eco-bonus">
            <span className="icon">🌿</span>
            <span>{selectedStore.ecoBonus}</span>
          </div>
        </div>
      )}
    </div>
  );
}