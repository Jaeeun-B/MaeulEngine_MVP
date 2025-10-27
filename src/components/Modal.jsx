export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal active" onClick={(e)=> e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}