export default function Header({ filter, setFilter, search, setSearch }) {
  return (
    <div className="header" id="mainHeader">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="가게 이름, 음식 종류 검색"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="quick-filters">
        {[
          {key:'all', label:'전체'},
          {key:'restaurant', label:'🍴 음식점'},
          {key:'cafe', label:'☕ 카페'},
        ].map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter===f.key ? 'active':''}`}
            onClick={()=> setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
