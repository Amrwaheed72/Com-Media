import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { Eye, FileText, Home, Menu, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolTipComponent from './ToolTipComponent';

const ProfileSidebar = () => {
    const [open, setOpen] = useState(false);

    const NavLinks = [
        {
            label: 'Home',
            link: '/profile',
            icon: <Home size={18} />,
            end: true,
            content: 'Profile home page',
        },
        {
            label: 'Overview',
            link: '/profile/overview',
            icon: <Eye size={18} />,
            content: 'Profile Overview',
        },
        {
            label: 'My Posts',
            link: '/profile/posts',
            icon: <FileText size={18} />,
            content: 'My posts',
        },
        {
            label: 'Communities',
            link: '/profile/communities',
            icon: <Users size={18} />,
            content: 'My communities',
        },
        {
            label: 'Settings',
            link: '/profile/settings',
            icon: <Settings size={18} />,
            content: 'Profile settings',
        },
    ];

    return (
        <motion.div
            animate={{ width: open ? 220 : 60 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed z-100 top-16 left-0 h-[calc(100vh-4rem)] overflow-hidden border-r bg-gray-100 shadow-xl dark:bg-[rgba(10,10,10,0.8)]"
        >
            <div className="flex justify-start p-2 pl-3">
                <Button
                    onClick={() => setOpen((prev) => !prev)}
                    size="sm"
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-200"
                >
                    <Menu />
                </Button>
            </div>

            <nav className="mt-4 flex flex-col gap-2 p-2">
                {NavLinks.map(({ label, link, icon, end, content }) => (
                    <NavLink
                        key={link}
                        to={link}
                        end={end}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 transition-colors duration-200 ${isActive ? 'bg-purple-300 dark:bg-purple-700' : 'hover:bg-purple-300 dark:hover:bg-purple-700'} ${open ? 'justify-start' : 'justify-center'}`
                        }
                    >
                        <ToolTipComponent content={content} open={open}>
                            <div className="flex items-center gap-3">
                                {icon}
                                {open && (
                                    <span className="text-sm">{label}</span>
                                )}
                            </div>
                        </ToolTipComponent>
                    </NavLink>
                ))}
            </nav>
        </motion.div>
    );
};

export default ProfileSidebar;
