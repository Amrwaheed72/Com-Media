import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { Eye, FileText, Home, Settings, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ProfileSidebar = () => {
    const [open, setopen] = useState(false);

    const NavLinks = [
        {
            label: 'Home',
            link: '/profile',
            icon: <Home size={18} />,
            end: true,
        },
        {
            label: 'Overview',
            link: '/profile/overview',
            icon: <Eye size={18} />,
        },
        {
            label: 'My Posts',
            link: '/profile/posts',
            icon: <FileText size={18} />,
        },
        {
            label: 'Communities',
            link: '/profile/communities',
            icon: <Users size={18} />,
        },
    ];
    return (
        <motion.div
            // initial="hidden"
            // animate="visible"
            // variants={{
            //     hidden: { width: 0 },
            //     visible: {
            //         width: 64,
            //         transition: { staggerChildren: 0.15 },
            //     },
            // }}
            className="absolute inset-0 top-16 w-64 bg-gray-100 shadow-xl dark:bg-[rgba(10,10,10,0.8)]"
        >
            <div className="flex h-full flex-col gap-2 border-r-2 p-2 px-4 pl-6">
                <div className="flex items-center justify-between border-b-2 py-2">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Your Profile
                    </p>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="cursor-pointer"
                    >
                        <X />
                    </Button>
                </div>
                <div className="flex h-full flex-col justify-between gap-2">
                    <div className="flex flex-col gap-2">
                        {NavLinks.map((link) => (
                            <NavLink
                                to={link.link}
                                className={({ isActive }) =>
                                    `${isActive ? 'rounded-lg bg-purple-200 dark:bg-purple-800' : ''} flex items-center justify-start gap-4 p-2`
                                }
                                end={link.end}
                            >
                                {link.icon}
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? 'rounded-lg bg-purple-200 dark:bg-purple-800' : ''} flex items-center justify-start gap-4 p-2`
                        }
                        to={'/profile/settings'}
                    >
                        <Settings className="h-5 w-5" />
                        <p>Settings</p>
                    </NavLink>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileSidebar;
