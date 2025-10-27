const tabs = [
  { id:'map', icon:'🗺️', label:'지도' },
  { id:'discovery', icon:'📍', label:'발견' },
  { id:'saved',     icon:'❤️', label:'저장' },
  { id:'supporters',icon:'🏠', label:'서포터즈' },
  { id:'board',     icon:'📂', label:'게시판' },
  { id:'my',        icon:'👤', label:'MY' },
];

export default function BottomNav({ current, onChange }) {
  return (
    <div className="bottom-nav">
      {tabs.map(t => (
        <div
          key={t.id}
          className={`nav-item ${current===t.id ? 'active':''}`}
          onClick={()=> onChange(t.id)}
        >
          <div className="nav-icon">{t.icon}</div>
          <div className="nav-label">{t.label}</div>
        </div>
      ))}
    </div>
  );
}
