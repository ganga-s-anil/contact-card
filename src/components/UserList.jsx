import UserCard from './UserCard';

function UserList({ contacts, allCount, onEdit, onDelete, onClearAll, editingId, searchQuery }) {
  const isEmpty = contacts.length === 0;
  const noResults = isEmpty && allCount > 0 && searchQuery;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="list-meta">
        <span className="list-count">
          {searchQuery
            ? `${contacts.length} of ${allCount} contacts`
            : `${allCount} contact${allCount !== 1 ? 's' : ''}`}
        </span>
        {allCount > 0 && (
          <button className="btn btn-danger btn-sm" onClick={onClearAll}>
            🗑 Clear All
          </button>
        )}
      </div>

      <div className="contacts-grid">
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-state-icon">{noResults ? '🔍' : '📭'}</div>
            <h3>{noResults ? 'No results found' : 'No Contacts Added Yet'}</h3>
            <p>
              {noResults
                ? `No contacts match "${searchQuery}"`
                : 'Use the form to add your first contact.'}
            </p>
          </div>
        ) : (
          contacts.map(contact => (
            <UserCard
              key={contact.id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={editingId === contact.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;