import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

const STORAGE_KEY = 'contacts';

/* ── Local Storage helpers ─────────────────────── */
function loadContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

/* ── Toast component (inline to keep file count neat) ── */
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ── Main App ──────────────────────────────────── */
function App() {
  const [contacts, setContacts] = useState(loadContacts);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // Persist to LocalStorage whenever contacts change
  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  /* ── Toast helpers ───────────────────────────── */
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  /* ── CRUD ────────────────────────────────────── */
  function handleAdd(fields) {
    const newContact = { id: Date.now(), ...fields };
    setContacts(prev => [newContact, ...prev]);
    addToast(`${fields.name} added successfully!`, 'success');
  }

  function handleUpdate(updated) {
    setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    setEditingContact(null);
    addToast(`${updated.name} updated.`, 'success');
  }

  function handleEdit(contact) {
    setEditingContact(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(contact) {
    const confirmed = window.confirm(`Delete contact "${contact.name}"? This cannot be undone.`);
    if (!confirmed) return;
    setContacts(prev => prev.filter(c => c.id !== contact.id));
    if (editingContact?.id === contact.id) setEditingContact(null);
    addToast(`${contact.name} deleted.`, 'info');
  }

  function handleClearAll() {
    const confirmed = window.confirm(`Delete all ${contacts.length} contacts? This cannot be undone.`);
    if (!confirmed) return;
    setContacts([]);
    setEditingContact(null);
    addToast('All contacts cleared.', 'info');
  }

  function handleCancelEdit() {
    setEditingContact(null);
  }

  /* ── Search filtering ────────────────────────── */
  const filteredContacts = contacts.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  return (
    <div className="app-wrapper">
      <Header contactCount={contacts.length} />

      <main className="app-main">
        {/* Left: form */}
        <div className="left-panel">
          <UserForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editingContact={editingContact}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Right: search + list */}
        <div className="right-panel">
          <div className="card" style={{ padding: '16px 20px' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <UserList
            contacts={filteredContacts}
            allCount={contacts.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
            editingId={editingContact?.id}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;