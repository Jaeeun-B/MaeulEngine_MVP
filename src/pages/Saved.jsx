import RestaurantCard from '../components/RestaurantCard';

export default function Saved({ data, saved, toggleSave, onOpenDetail }) {
  const list = data.filter(r => saved.includes(r.id));
  return (
    <div id="savedPage" className="page active">
      <div className="main-content">
        <h2 className="section-title">저장한 맛집</h2>
        {list.length===0 ? (
          <div className="empty-state" id="savedEmpty">
            <div className="empty-icon">❤️</div>
            <p>아직 저장한 맛집이 없어요</p>
            <p style={{fontSize:14, marginTop:10}}>마음에 드는 맛집을 저장해보세요!</p>
          </div>
        ) : (
          <div className="restaurant-list" id="savedList">
            {list.map(r => (
              <RestaurantCard
                key={r.id}
                r={r}
                saved
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
