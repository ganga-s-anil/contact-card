function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, email, or phone…"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search contacts"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;