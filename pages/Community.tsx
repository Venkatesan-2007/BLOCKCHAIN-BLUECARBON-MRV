import React from 'react';
import type { CommunityPost } from '../types';
import { COMMUNITY_POSTS } from '../data/demo';
import { useAuth } from '../App';

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start space-x-4 mb-4">
            <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
            <div>
                <p className="font-bold text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorRole} • {post.timestamp}</p>
            </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
        <div className="border-t border-gray-100 mt-4 pt-3 flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                <span>{post.likes} Likes</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>
                <span>{post.comments} Comments</span>
            </button>
        </div>
    </div>
);

const CreatePost: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <textarea 
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary text-sm sm:text-base"
                        rows={3}
                        placeholder="Share an update or ask a question..."
                    ></textarea>
                     <div className="flex justify-end mt-2">
                        <button className="bg-primary text-white font-bold py-1.5 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Community: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto font-display">
            <CreatePost />
            <div className="space-y-6">
                {COMMUNITY_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Community;