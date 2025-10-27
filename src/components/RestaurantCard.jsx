export default function RestaurantCard({ r, saved, onToggleSave, onOpen }) {
  return (
    <div className="restaurant-card" onClick={onOpen}>
      <div className="rank-badge">{r.rank}위</div>
      <div className="eco-badge">🌿</div>
      <button
        className={`save-btn ${saved ? 'saved' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
      >
        {saved ? '❤️' : '🤍'}
      </button>
      <img src={r.image} alt={r.name} className="restaurant-image" loading="lazy" />
      <div className="restaurant-info">
        <div className="restaurant-name">{r.name}</div>
        <div className="restaurant-desc">"{r.description}"</div>
        <div className="restaurant-rating">
          <span className="star">⭐</span>
          <strong>{r.rating}</strong>
          <span style={{ color:'#999' }}>({r.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}
