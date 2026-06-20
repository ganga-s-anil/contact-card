import { useState, useEffect } from 'react';

const EMPTY_FORM = { name: '', email: '', phone: '' };
const EMPTY_ERRORS = { name: '', email: '', phone: '' };

function validate(fields) {
  const errors = { ...EMPTY_ERRORS };
  let valid = true;

  if (!fields.name.trim()) {
    errors.name = 'Full name is required.';
    valid = false;
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
    valid = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
    valid = false;
  } else if (!emailRe.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address.';
    valid = false;
  }

  const phoneRe = /^[+]?[\d\s\-().]{7,15}$/;
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
    valid = false;
  } else if (!phoneRe.test(fields.phone.trim())) {
    errors.phone = 'Enter a valid phone number (7–15 digits).';
    valid = false;
  }

  return { errors, valid };
}

function UserForm({ onAdd, onUpdate, editingContact, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const isEditing = Boolean(editingContact);

  useEffect(() => {
    if (editingContact) {
      setForm({ name: editingContact.name, email: editingContact.email, phone: editingContact.phone });
      setErrors(EMPTY_ERRORS);
    } else {
      setForm(EMPTY_FORM);
      setErrors(EMPTY_ERRORS);
    }
  }, [editingContact]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { errors: newErrors, valid } = validate(form);
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    const trimmed = { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() };
    if (isEditing) {
      onUpdate({ ...editingContact, ...trimmed });
    } else {
      onAdd(trimmed);
      setForm(EMPTY_FORM);
    }
    setErrors(EMPTY_ERRORS);
  }

  function handleCancel() {
    onCancelEdit();
    setForm(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
  }

  return (
    <div className="card">
      <p className="card-title">{isEditing ? '✏️ Edit Contact' : '➕ New Contact'}</p>

      {isEditing && (
        <div className="edit-indicator">
          <span>✏️</span>
          <span>Editing <strong>{editingContact.name}</strong></span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. Priya Nair"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input${errors.email ? ' error' : ''}`}
            placeholder="e.g. priya@gmail.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`form-input${errors.phone ? ' error' : ''}`}
            placeholder="e.g. 9876543210"
            value={form.phone}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-actions">
          {isEditing ? (
            <>
              <button type="submit" className="btn btn-primary">
                ✓ Update Contact
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              + Add Contact
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;