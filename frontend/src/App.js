import React, { useState, useEffect } from 'react';
import './App.css';
import CommentsList from './components/CommentsList';
import AddCommentForm from './components/AddCommentForm';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/comments/');
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      const response = await fetch('http://localhost:8000/api/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          likes: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      return true;
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment. Please try again.');
      return false;
    }
  };

  const handleEditComment = async (id, newText) => {
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit comment');
      }

      const updatedComment = await response.json();
      setComments(comments.map(comment =>
        comment.id === id ? updatedComment : comment
      ));
      return true;
    } catch (err) {
      console.error('Error editing comment:', err);
      alert('Failed to edit comment. Please try again.');
      return false;
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/comments/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(comments.filter(comment => comment.id !== id));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Comments</h1>
        <p className="subtitle">Discussions from the community</p>
      </header>

      <main className="App-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading comments...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchComments}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <AddCommentForm onAddComment={handleAddComment} />
            <CommentsList
              comments={comments}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
