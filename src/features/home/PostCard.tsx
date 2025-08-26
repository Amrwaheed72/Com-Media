import { Link } from 'react-router';
import type { Post } from './PostsList';

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const { id, title, image_url, avatar_url, created_at } = post;
    return (
        <div className="group relative">
            <div className="pointer-events-none absolute -inset-1 rounded-[20px] bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-50" />
            <Link to={`/post/${id}`} className="relative z-10 block">
                <div className="flex h-76 w-80 flex-col overflow-hidden rounded-[20px] border border-[rgb(84,90,106)] bg-[rgb(24,27,32)] p-5 text-white transition-colors duration-300 group-hover:bg-gray-800">
                    <div className="flex items-center space-x-2">
                        {avatar_url ? (
                            <img
                                src={avatar_url}
                                alt={title}
                                className="h-[35px] w-[35px] rounded-full"
                            />
                        ) : (
                            <div className="h-[35px] w-[35px] rounded-full bg-gradient-to-r from-[#8a2be2] to-[#491f70]" />
                        )}
                        <div className="flex flex-1 flex-col">
                            <div className="mt-2 text-[20px] leading-[22px] font-semibold">
                                {title}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex-1">
                        <img
                            src={image_url}
                            alt={title}
                            className="mx-auto max-h-[150px] w-full rounded-[20px] object-cover"
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-end">
                        <p className="text-sm text-gray-400">
                            {new Date(created_at).toLocaleDateString()},{'  '}
                            <span className="text-xs font-semibold text-gray-500">
                                {new Date(created_at).toLocaleTimeString()}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;
