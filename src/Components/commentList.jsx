import React from 'react';

const CommentsList = ({ comments }) => {
  return (
    <div className="space-y-4 mt-6">
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div
            key={comment.id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              By {comment.author}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;