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
import { Home, LogIn, LogOut, Menu, Pen, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/store/UserAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const Navbar = () => {
    const user = useUserAuth((state) => state.user);
    const signOut = useUserAuth((state) => state.signOut);
    // const userName = user?.user_metadata.user_name || user?.email;
    const baseLink = 'flex justify-center items-center gap-2 transition-colors';
    const normalLink = `text-gray-600 dark:hover:text-white dark:text-gray-300 hover:text-black ${baseLink}`;
    const activeLink = `dark:text-white text-black font-medium ${baseLink}`;
    const userImage = user?.user_metadata.avatar_url;
    // console.log(user?.user_metadata.avatar_url);
    return (
        <nav className="fixed top-0 z-20 w-full border-b border-white/10 shadow-lg backdrop:blur-lg dark:bg-[rgba(10,10,10,0.8)]">
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
                        <div className="flex items-center justify-center gap-2">
                            {user ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="flex items-center justify-center gap-2">
                                        {userImage && (
                                            <Link to={'/profile'}>
                                                <Avatar>
                                                    <AvatarImage
                                                        className="h-8 w-8 rounded-full"
                                                        src={userImage}
                                                        alt="Amr"
                                                    />
                                                    <AvatarFallback>
                                                        {user?.user_metadata
                                                            ?.user_name ?? ''}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        )}
                                        {/* <p className="text-xs">
                                        {user?.user_metadata?.user_name}
                                    </p> */}
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                onClick={signOut}
                                                className="cursor-pointer"
                                            >
                                                <LogOut />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Logout</TooltipContent>
                                    </Tooltip>
                                </div>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link to={'/login'}>
                                            <Button
                                                variant={'outline'}
                                                className="cursor-pointer"
                                            >
                                                Login <LogIn />
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>Login</TooltipContent>
                                </Tooltip>
                            )}
                            {/* <p>{userName}</p> */}
                            <ModeToggle />
                        </div>
                    </div>
                    {/* mobile links */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-2 md:hidden">
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
                                            <NavLink
                                                className="w-full"
                                                to={'/'}
                                            >
                                                Home
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <Home className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink
                                                className="w-full"
                                                to={'/create'}
                                            >
                                                Create Post
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <Pen className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink
                                                className="w-full"
                                                to={'/communities'}
                                            >
                                                Communities
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <Users className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink
                                                className="w-full"
                                                to={'/community/create'}
                                            >
                                                Create Community
                                            </NavLink>
                                            <DropdownMenuShortcut>
                                                <UserPlus className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        {user && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <button
                                                        type="button"
                                                        onClick={signOut}
                                                        className="w-full cursor-pointer text-start"
                                                    >
                                                        logout
                                                    </button>
                                                    <DropdownMenuShortcut>
                                                        <LogOut className="h-4 w-4" />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {user ? (
                                <Avatar>
                                    <AvatarImage
                                        className="h-8 w-8 rounded-full"
                                        src={userImage}
                                        alt="Amr"
                                    />
                                    <AvatarFallback>
                                        {user?.user_metadata.user_name ?? ''}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant={'outline'}>
                                            <Link to={'/login'}>
                                                {' '}
                                                <LogIn />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Login</TooltipContent>
                                </Tooltip>
                            )}
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
