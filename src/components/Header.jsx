function Header({ contactCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">📇</div>
        <div className="header-text">
          <h1>Contact Cards Manager</h1>
          <p>Create and manage your contacts</p>
        </div>
        <div className="header-counter">
          {contactCount} {contactCount === 1 ? 'contact' : 'contacts'}
        </div>
      </div>
    </header>
  );
}

export default Header;