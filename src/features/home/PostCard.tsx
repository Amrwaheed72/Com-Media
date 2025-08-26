import { Link } from 'react-router';
import type { Post } from './PostsList';

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    return (
        <div className="group relative">
            <div className="pointer-events-none absolute -inset-1 rounded-[20px] bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-50" />
            <Link to={'/post'} className="relative z-10 block">
                <div className="flex h-76 w-80 flex-col overflow-hidden rounded-[20px] border border-[rgb(84,90,106)] bg-[rgb(24,27,32)] p-5 text-white transition-colors duration-300 group-hover:bg-gray-800">
                    <div className="flex items-center space-x-2">
                        <div className="h-[35px] w-[35px] rounded-full bg-gradient-to-r from-[#8a2be2] to-[#491f70]" />
                        <div className="flex flex-1 flex-col">
                            <div className="mt-2 text-[20px] leading-[22px] font-semibold">
                                {post.title}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex-1">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="mx-auto max-h-[150px] w-full rounded-[20px] object-cover"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;
