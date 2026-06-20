function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('');
}

function getAvatarColor(name) {
  const colors = [
    'linear-gradient(135deg,#3b82f6,#6366f1)',
    'linear-gradient(135deg,#0ea5e9,#06b6d4)',
    'linear-gradient(135deg,#8b5cf6,#a855f7)',
    'linear-gradient(135deg,#10b981,#14b8a6)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
    'linear-gradient(135deg,#ec4899,#f43f5e)',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function UserCard({ contact, onEdit, onDelete, isEditing }) {
  return (
    <div className={`contact-card${isEditing ? ' editing' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          className="contact-avatar"
          style={{ background: getAvatarColor(contact.name) }}
          aria-hidden="true"
        >
          {getInitials(contact.name)}
        </div>
        <div className="contact-info">
          <div className="contact-name">{contact.name}</div>
          <div className="contact-detail">
            <span className="contact-detail-icon">✉️</span>
            <span title={contact.email}>{contact.email}</span>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-icon">📞</span>
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>

      <div className="contact-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(contact)}
          aria-label={`Delete ${contact.name}`}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;
