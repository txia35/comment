import React from 'react';
import CommentCard from './CommentCard';
import './CommentsList.css';

function CommentsList({ comments, onEditComment, onDeleteComment }) {
  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      <div className="comments-count">
        <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="comments-container">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentsList;
