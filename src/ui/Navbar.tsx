import { Link, NavLink } from 'react-router';
import { ModeToggle } from './ModeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Menu, Pen, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const baseLink = 'flex justify-center items-center gap-2 transition-colors';
    const normalLink = `text-gray-600 dark:hover:text-white dark:text-gray-300 hover:text-black ${baseLink}`;
    const activeLink = `dark:text-white text-black font-medium ${baseLink}`;
    const mobileActiveLink = 'bg-gray-300';
    return (
        <nav className="fixed top-0 w-full border-b border-white/10 shadow-lg backdrop:blur-lg dark:bg-[rgba(10,10,10,0.8)]">
            <div className="mx-auto max-w-5xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="font-mono text-xl font-bold">
                        Com-<span className="text-purple-500">media</span>
                    </Link>
                    {/* desktop links */}
                    <div className="hidden flex-1 items-center justify-end space-x-8 md:flex">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                            to={'/'}
                        >
                            Home
                            <Home className="h-4 w-4" />
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                            to={'/create'}
                        >
                            Create Post
                            <Pen className="h-4 w-4" />
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                            to={'/communities'}
                        >
                            Communities
                            <Users className="h-4 w-4" />
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                            to={'/community/create'}
                        >
                            Create Community
                            <UserPlus className="h-4 w-4" />
                        </NavLink>
                        <ModeToggle />
                    </div>
                    {/* mobile links */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex md:hidden items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'outline'}>
                                        <Menu />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <NavLink to={'/'}>Home</NavLink>
                                            <DropdownMenuShortcut>
                                                <Home className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink to={'/create'}>
                                                Create Post
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <Pen className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink to={'/communities'}>
                                                Communities
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <Users className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink to={'/community/create'}>
                                                Create Community
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <UserPlus className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ModeToggle />
                        </div>
                    </div>
                    {/* <div>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/create'}>Create Post</Link>
                        <Link to={'/communities'}>Communities</Link>
                        <Link to={'/community/create'}>Create Community</Link>
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
