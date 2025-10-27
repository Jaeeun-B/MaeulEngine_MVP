import { useState } from 'react';
import Modal from '../components/Modal';

export default function MyPage({
  email,
  challenge,
  challengeLogs,
  posts,
  logout,
  openPostDetail,
}) {
  // 모달 상태
  const [myPostsOpen, setMyPostsOpen] = useState(false);
  const [myCommentsOpen, setMyCommentsOpen] = useState(false);
  const [myChallengesOpen, setMyChallengesOpen] = useState(false);

  const remaining = Math.max(0, 10 - challenge);

  return (
    <div id="myPage" className="page active">
      {/* 프로필 */}
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <h3>마을엔진 이화연</h3>
        <p style={{ fontSize: 14, marginTop: 5 }}>
          {email || 'student@ewha.ac.kr'}
        </p>
      </div>

      {/* 챌린지 현황 */}
      <div className="challenge-status">
        <h3>🏆 나의 챌린지 현황</h3>
        <div className="challenge-count">{challenge}회</div>
        <p>
          {remaining > 0
            ? `${remaining}회 더 참여하면 실버 등급!`
            : '실버 등급 달성! 🎉'}
        </p>
        <div className="challenge-progress">
          <div
            className="challenge-progress-bar"
            style={{ width: `${Math.min((challenge / 10) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* 메뉴 */}
      <div className="profile-menu">
        <div className="menu-item" onClick={() => setMyPostsOpen(true)}>
          <span>📝 내가 쓴 글</span><span>›</span>
        </div>
        <div className="menu-item" onClick={() => setMyCommentsOpen(true)}>
          <span>💬 내 댓글</span><span>›</span>
        </div>
        <div className="menu-item" onClick={() => setMyChallengesOpen(true)}>
          <span>🎯 챌린지 기록</span><span>›</span>
        </div>
        <div className="menu-item">
          <span>⚙️ 설정</span><span>›</span>
        </div>
        <div className="menu-item" onClick={logout}>
          <span>🚪 로그아웃</span><span>›</span>
        </div>
      </div>

      {/* ✅ 내가 쓴 글 모달 */}
      <Modal open={myPostsOpen} onClose={() => setMyPostsOpen(false)}>
        <div className="modal-header">
          <h2>내가 쓴 글</h2>
          <span className="close" onClick={() => setMyPostsOpen(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          {posts.filter(p => p.author === '나').length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: 16 }}>
              아직 작성한 글이 없습니다.
            </p>
          ) : (
            posts
              .filter(p => p.author === '나')
              .map(p => (
                <div
                  key={p.id}
                  className="post-item"
                  onClick={() => {
                    setMyPostsOpen(false);
                    openPostDetail(p);
                  }}
                >
                  <div className={`post-detail-category ${p.category}`} style={{ marginBottom: 6 }}>
                    {p.category === 'review' ? '맛집 후기' : '챌린지 인증'}
                  </div>
                  <h4 style={{ marginBottom: 6 }}>{p.title}</h4>
                  <div style={{ fontSize: 12, color: '#999' }}>{p.time}</div>
                </div>
              ))
          )}
        </div>
      </Modal>

      {/* ✅ 내 댓글 모달 */}
      <Modal open={myCommentsOpen} onClose={() => setMyCommentsOpen(false)}>
        <div className="modal-header">
          <h2>내 댓글</h2>
          <span className="close" onClick={() => setMyCommentsOpen(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          {(() => {
            const mine = [];
            posts.forEach(p => {
              (p.comments || []).forEach(c => {
                if (c.author === '나') mine.push({ post: p, comment: c });
              });
            });
            if (mine.length === 0) {
              return (
                <p style={{ color: '#999', textAlign: 'center', padding: 16 }}>
                  아직 작성한 댓글이 없습니다.
                </p>
              );
            }
            return mine.map((m, i) => (
              <div
                key={i}
                className="post-item"
                onClick={() => {
                  setMyCommentsOpen(false);
                  openPostDetail(m.post);
                }}
              >
                <div style={{ fontSize: 13, color: '#00a870', marginBottom: 4 }}>
                  {m.post.title}
                </div>
                <div style={{ fontSize: 14, marginBottom: 6 }}>{m.comment.text}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{m.comment.time}</div>
              </div>
            ));
          })()}
        </div>
      </Modal>

      {/* ✅ 챌린지 기록 모달 */}
      <Modal open={myChallengesOpen} onClose={() => setMyChallengesOpen(false)}>
        <div className="modal-header">
          <h2>챌린지 기록</h2>
          <span className="close" onClick={() => setMyChallengesOpen(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          {challengeLogs.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: 16 }}>
              아직 챌린지 기록이 없습니다.
            </p>
          ) : (
            challengeLogs.map(log => (
              <div key={log.id} className="post-item">
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                  📍 {log.name}
                </div>
                <div style={{ fontSize: 12, color: '#999' }}>{log.time}</div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}