import {useState, useRef } from 'react';
import './App.css';
import { restaurantsData, initialPosts, getPartnerRestaurants } from './data/restaurants';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Modal from './components/Modal';
import Discovery from './pages/Discovery';
import Saved from './pages/Saved';
import Board from './pages/Board';
import Supporters from './pages/Supporters';
import Map from './pages/Map';
import Onboarding from './pages/OnBoarding';
import MyPage from './pages/MyPage';

const LOADING_AFTER_ONBOARDING_MS = 5000;

export default function App() {
  // 로그인/로딩
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const loadingTimerRef = useRef(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);


  // 전역 상태
  const [tab, setTab] = useState('map'); 
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useLocalStorage('savedRestaurants', []);
  const [challenge, setChallenge] = useLocalStorage('challengeCount', 7);
  const [posts, setPosts] = useLocalStorage('posts', initialPosts);
  const [boardFilter, setBoardFilter] = useState('all');
  const [challengeLogs, setChallengeLogs] = useLocalStorage('challengeLogs', []);

  // 모달 상태
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [postDetailOpen, setPostDetailOpen] = useState(false);
  const [postDetailItem, setPostDetailItem] = useState(null);
  const [newPostCategory, setNewPostCategory] = useState('review');
  

  const handleOnboardingNext = () => {
    if (onboardingStep === 0) {
      setOnboardingStep(1);
    } 
    else {
      setShowOnboarding(false);
      localStorage.setItem('onboarded', '1');
      loadingTimerRef.current = setTimeout(() => {
      setLoading(false);
      setShowOnboarding(false);
      localStorage.setItem('onboarded', '1'); 
      }, LOADING_AFTER_ONBOARDING_MS);
    
    }
    
  };

 
  if (!loggedIn && showOnboarding) {
    return (
    <div className="app-frame">
      <div className={`loading-screen ${loading ? 'active' : ''}`}>
        We are Returning...🏄‍♀️
      </div>

      <Onboarding step={onboardingStep} onNext={handleOnboardingNext} />
    </div>
    );
  }



  // 로그인 동작
  const login = () => {
    if (!email || !pw) { alert('이메일과 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      setLoggedIn(true);
      setTab('discovery');
      setWelcomeOpen(true);
      
    }, 1200);
  };
  const logout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      setLoggedIn(false);
      setEmail(''); setPw('');
    }
  };


  // 저장 토글
  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(v => v!==id) : [...prev, id]);
  };

  // 상세 모달 열기
  const openRestaurant = (r) => { setDetailItem(r); setDetailOpen(true); };

  const incChallenge = () => {
    setChallenge(c => c+1);

    if (detailItem) {
    const log = {
      id: Date.now(),
      restaurantId: detailItem.id,
      name: detailItem.name,
      time: new Date().toLocaleString(),
    };
    setChallengeLogs(prev => [log, ...prev]);
  }

    alert('챌린지 1회가 추가되었습니다! 🎉');
    setDetailOpen(false);
  };


  // 게시판
  
  const openNewPost = () => {
    setNewPostCategory(boardFilter === 'all' ? 'review' : boardFilter);
    setNewPostOpen(true);
  };


  const submitPost = (title, content, category='review') => {
    if (!title || !content) { alert('제목과 내용을 입력해주세요.'); return; }
    const newPost = {
      id: posts.length + 1,
      title, content,
      author: '나', time: '방금 전',
      category, comments: []
    };
    setPosts([newPost, ...posts]);
    setNewPostOpen(false);
    alert('게시글이 작성되었습니다! 🎉');
  };
  const openPostDetail = (p) => { setPostDetailItem(p); setPostDetailOpen(true); };
  const deletePost = (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setPosts(posts.filter(p => p.id!==id));
    setPostDetailOpen(false);
    alert('게시글이 삭제되었습니다.');
  };
  const addComment = (id, text) => {
    if (!text) return;
    setPosts(ps => ps.map(p => p.id===id ? ({
      ...p, comments: [...(p.comments||[]), {author:'나', text, time:'방금 전'}]
    }) : p));
  };

  // 페이지 렌더
  const renderPage = () => {
    if (tab==='map') {
      return(
        <Map />
      );

    }
    if (tab==='discovery') {
      return (
        <>
          <Header filter={filter} setFilter={setFilter} search={search} setSearch={setSearch}/>
          <Discovery
            data={getPartnerRestaurants()}
            filter={filter}
            search={search}
            saved={saved}
            toggleSave={toggleSave}
            onOpenDetail={openRestaurant}
          />
        </>
      );
    }
    if (tab==='saved') return <Saved data={restaurantsData} saved={saved} toggleSave={toggleSave} onOpenDetail={openRestaurant} />;
    if (tab==='supporters') {
      return (
        <Supporters />
      );
    }
    if (tab==='board') {
      return (
        <Board
          posts={posts}
          filter={boardFilter}
          setFilter={setBoardFilter}
          onOpenDetail={openPostDetail}
          onOpenNew={openNewPost}
        />
      );
    }

    if (tab === 'mypage') {
      return (
      <MyPage
      email={email}
      challenge={challenge}
      challengeLogs={challengeLogs}
      posts={posts}
      logout={logout}
      openPostDetail={openPostDetail}
      />
      );
    }


    const remaining = Math.max(0, 10 - challenge);
    return (
      <div id="myPage" className="page active">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h3>마을엔진 이화연</h3>
          <p style={{fontSize:14, marginTop:5}}>{loggedIn ? email : 'student@ewha.ac.kr'}</p>
        </div>
        <div className="challenge-status">
          <h3>🏆 나의 챌린지 현황</h3>
          <div className="challenge-count">{challenge}회</div>
          <p>{remaining>0 ? `${remaining}회 더 참여하면 실버 등급!` : '실버 등급 달성! 🎉'}</p>
          <div className="challenge-progress">
            <div className="challenge-progress-bar" style={{width: `${Math.min((challenge/10)*100, 100)}%`}}></div>
          </div>
        </div>
        <div className="profile-menu">
          <div className="menu-item"><span>📝 내가 쓴 글</span><span>›</span></div>
          <div className="menu-item"><span>💬 내 댓글</span><span>›</span></div>
          <div className="menu-item"><span>🎯 챌린지 기록</span><span>›</span></div>
          <div className="menu-item"><span>⚙️ 설정</span><span>›</span></div>
          <div className="menu-item" onClick={logout}><span>🚪 로그아웃</span><span>›</span></div>
        </div>
      </div>
    );
  };

  // 로그인/로딩 화면
  if (!loggedIn) {
    return (
      <>
        <div className={`loading-screen ${loading ? 'active':''}`} id="loadingScreen">
          <div className="loading-text">We are Returning...🏄‍♀️</div>
        </div>
        <div className={`login-screen ${!loading ? 'active':''}`} id="loginScreen">
          <div className="login-container">
            <div className="login-title">마을엔진🍏</div>
            <div className="login-subtitle">지역 상권과 환경을 살리는 착한 맛집 지도</div>
            <input
              type="text"
              className="login-input"
              placeholder="이메일"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              type="password"
              className="login-input"
              placeholder="비밀번호"
              value={pw}
              onChange={(e)=> setPw(e.target.value)}
              onKeyDown={(e)=> e.key==='Enter' && login()}
            />
            <button className="login-btn" onClick={login}>로그인</button>
          </div>
        </div>
      </>
    );
  }
  const closeWelcome = () => setWelcomeOpen(false);

  return (

    <div className={`app-container active`} id="appContainer">
      {renderPage()}
      <BottomNav current={tab} onChange={setTab} />
    {/*팝업창*/}
      

      <Modal open={welcomeOpen} onClose={closeWelcome}>
        <div className="modal-header">
          <h2>공지</h2>
          <span className="close" onClick={closeWelcome}>&times;</span>
        </div>

        <div className="modal-body">
          <h3 style={{marginBottom:10}}>
            마을엔진에 오신 것을 환영합니다! <span className="icon"></span>🍏</h3>
          <p style={{color:'#555', lineHeight:1.6, marginBottom:14}}>
            • 다회용기 챌린지에 참여하고 포인트를 모아보세요.<br/>
            • ‘발견’ 탭에서 친환경 가게를 찾고, 후기/챌린지를 게시판에 공유해요.<br/>
            • ‘저장’ 탭에 마음에 드는 가게를 모아둘 수 있어요.
          </p>

          <div className="modal-buttons" style={{marginTop:16}}>
            <button className="btn-submit" onClick={closeWelcome}>확인</button>
          </div>
        </div>
      </Modal>

      {/* 레스토랑 상세 모달 */}
      <Modal open={detailOpen} onClose={()=> setDetailOpen(false)}>
        {detailItem && (
          <>
            <div className="modal-header">
              <span className="close" onClick={()=> setDetailOpen(false)}>&times;</span>
            </div>
            <div className="modal-body" id="restaurantDetail">
              <img src={detailItem.image} alt={detailItem.name} className="detail-image" />
              <div className="detail-title">{detailItem.name}</div>
              <div className="detail-rating">
                <span className="star">⭐</span>
                <strong>{detailItem.rating}</strong>
                <span style={{color:'#999'}}>({detailItem.reviewCount}개의 리뷰)</span>
              </div>
              <div className="detail-desc">"{detailItem.description}"</div>
              <div className="eco-box">
                <div className="eco-box-title">🌿 에코 혜택</div>
                <div className="eco-box-text">{detailItem.ecoBonus}</div>
              </div>
              <div className="detail-info">
                <div className="info-item"><span className="info-icon">📍</span><span className="info-text">{detailItem.address}</span></div>
                <div className="info-item"><span className="info-icon">📞</span><span className="info-text">{detailItem.phone}</span></div>
                <div className="info-item"><span className="info-icon">⏰</span><span className="info-text">{detailItem.hours}</span></div>
              </div>
              <button className="challenge-btn" onClick={incChallenge}>다회용기 챌린지 인증하기 🎯</button>
            </div>
          </>
        )}
      </Modal>

      {/* 새 글 모달 (간단 버전) */}
      <Modal open={newPostOpen} onClose={()=> setNewPostOpen(false)}>
        <div className="modal-header">
          <h2>새 게시글 작성</h2>
          <span className="close" onClick={()=> setNewPostOpen(false)}>&times;</span>
        </div>
        <div className="modal-body">
          {/* 카테고리 토글 */}

          <div className="post-category-select">
            <button
              type="button"
              className={`category-btn ${newPostCategory === 'review' ? 'active' : ''}`}
              onClick={() => setNewPostCategory('review')}
            >🍜 맛집 후기</button>

            <button
              type="button"
              className={`category-btn ${newPostCategory === 'challenge' ? 'active' : ''}`}
              onClick={() => setNewPostCategory('challenge')}
            >🎯 챌린지 인증</button>
          </div>

            {/* 필요 시 상태로 바꾸어 review/challenge 토글 */}
          
          <input id="postTitle" className="post-input" placeholder="제목을 입력하세요" />
          <textarea id="postContent" className="post-textarea" placeholder="내용을 입력하세요"></textarea>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={()=> setNewPostOpen(false)}>취소</button>
            <button className="btn-submit" onClick={()=>{
              const title = document.getElementById('postTitle').value.trim();
              const content = document.getElementById('postContent').value.trim();
              submitPost(title, content, newPostCategory); // 필요 시 상태로 변경
            }}>작성하기</button>
          </div>
        </div>
      </Modal>

      {/* 글 상세 모달 (간단 버전) */}
      <Modal open={postDetailOpen} onClose={()=> setPostDetailOpen(false)}>
        <div className="modal-header">
          <h2>게시글 상세</h2>
          <span className="close" onClick={()=> setPostDetailOpen(false)}>&times;</span>
        </div>
        <div className="modal-body" id="postDetailContent">
          {postDetailItem && (
            <>
              <div className="post-detail-header">
                <span className={`post-detail-category ${postDetailItem.category}`}>
                  {postDetailItem.category==='review' ? '맛집 후기' : '챌린지 인증'}
                </span>
                {postDetailItem.author==='나' &&
                  <button className="delete-btn" onClick={()=> deletePost(postDetailItem.id)}>삭제</button>}
              </div>
              <h3 className="post-detail-title">{postDetailItem.title}</h3>
              <div className="post-detail-meta">
                <span>{postDetailItem.author}</span><span>•</span><span>{postDetailItem.time}</span>
              </div>
              <div className="post-detail-content">{postDetailItem.content}</div>
              <div className="post-actions">
                <button className="action-btn">👍 좋아요</button>
                <button className="action-btn">💬 댓글 {postDetailItem.comments ? postDetailItem.comments.length : 0}</button>
              </div>

              <div className="comments-section">
                <div className="comments-title">💬 댓글 {postDetailItem.comments?.length || 0}개</div>
                <div id="commentsList">
                  {postDetailItem.comments?.length
                    ? postDetailItem.comments.map((c, i)=> (
                        <div key={i} className="comment-item">
                          <div className="comment-author">{c.author}</div>
                          <div className="comment-text">{c.text}</div>
                          <div className="comment-time">{c.time}</div>
                        </div>
                      ))
                    : <p style={{color:'#999', textAlign:'center', padding:20}}>첫 댓글을 작성해보세요!</p>
                  }
                </div>
                <div className="comment-input-box">
                  <input type="text" className="comment-input" id="commentInput" placeholder="댓글을 입력하세요..." />
                  <button className="comment-submit-btn" onClick={()=>{
                    const v = document.getElementById('commentInput').value.trim();
                    addComment(postDetailItem.id, v);
                    setPostDetailItem(p => ({ ...p, comments: [...(p.comments||[]), {author:'나', text:v, time:'방금 전'}] }));
                    document.getElementById('commentInput').value='';
                  }}>등록</button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}