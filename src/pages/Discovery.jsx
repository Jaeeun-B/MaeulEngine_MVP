import { useMemo } from 'react';
import RestaurantCard from '../components/RestaurantCard';

export default function Discovery({ data, filter, search, saved, toggleSave, onOpenDetail }) {
  // 디바운스 없이도 시작 가능. 추후 useEffect로 디바운스 추가 가능
  const list = useMemo(() => {
    return data.filter(r => {
      const okFilter = filter==='all' || r.category===filter;
      const q = (search||'').toLowerCase();
      const okSearch =
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      return okFilter && okSearch;
    });
  }, [data, filter, search]);

  return (
    <div id="discoveryPage" className="page active">
      <div className="main-content">
        <h2 className="section-title">지금, 여기, Return Table</h2>
        <div className="location-info">
          <span className="location-icon">📍</span>
          <span>현위치: 서대문구 신촌동</span>
        </div>

        {list.length===0 ? (
          <div className="empty-state" id="emptyState">
            <div className="empty-icon">🔍</div>
            <p>검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="restaurant-list" id="restaurantList">
            {list.map(r => (
              <RestaurantCard
                key={r.id}
                r={r}
                saved={saved.includes(r.id)}
                onToggleSave={()=> toggleSave(r.id)}
                onOpen={()=> onOpenDetail(r)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
