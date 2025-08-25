import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav>
            <div>
                <div>
                    <Link to="/" className="">
                        Com-media
                    </Link>
                    {/* desktop links */}
                    <div>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/create'}>Create Post</Link>
                        <Link to={'/communities'}>Communities</Link>
                        <Link to={'/community/create'}>Create Community</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
