export default function Board({ posts, filter, setFilter, onOpenDetail, onOpenNew }) {
  const filtered = filter==='all' ? posts : posts.filter(p => p.category===filter);
  return (
    <div id="boardPage" className="page active">
      <div className="board-tabs">
        {['all','review','challenge'].map(f => (
          <button
            key={f}
            className={`board-tab ${filter===f ? 'active':''}`}
            onClick={()=> setFilter(f)}
          >
            {f==='all' ? '전체' : f==='review' ? '맛집 후기' : '챌린지 인증'}
          </button>
        ))}
      </div>
      <div className="main-content">
        <div id="postList">
          {filtered.map(post => (
            <div key={post.id} className="post-item" onClick={()=> onOpenDetail(post)}>
              {post.author==='나' && <span className="post-badge my-post">내 글</span>}
              <h4 style={{marginBottom:8}}>{post.title}</h4>
              <p style={{fontSize:14, color:'#666', marginBottom:10}}>{post.content}</p>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'#999'}}>
                <span>{post.author}</span>
                <span>{post.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="floating-btn" onClick={onOpenNew}>+</button>
    </div>
  );
}
