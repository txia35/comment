import React, { useState } from 'react';
import './AddCommentForm.css';

function AddCommentForm({ onAddComment }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    const success = await onAddComment(text);

    if (success) {
      setText('');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="add-comment-form">
      <div className="form-header">
        <div className="admin-badge">Admin</div>
        <h3>Add New Comment</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows="4"
          disabled={isSubmitting}
        />

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCommentForm;
