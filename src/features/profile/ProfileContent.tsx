import { Avatar, AvatarImage } from '@/components/ui/avatar';
import ToolTipComponent from '@/ui/ToolTipComponent';
import { Check } from 'lucide-react';
import useGetUserData from './useGetUserData';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { useUserAuth } from '@/store/UserAuth';

const VerifiedBadge = () => (
    <ToolTipComponent content="Verified">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400">
            <Check className="h-3 w-3 text-white" />
        </div>
    </ToolTipComponent>
);

const ProfileContent = () => {
    const { user } = useUserAuth();
    const { data, isPending, error, refetch } = useGetUserData(user?.id!);

    if (isPending)
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    if (error) {
        return (
            <ErrorFallBack
                message="error display the profile content"
                onRetry={refetch}
            />
        );
    }

    const { phone, created_at } = data;
    const {
        name,
        user_name,
        avatar_url,
        full_name,
        email,
        email_verified,
        phone_verified,
    } = user?.user_metadata || {};

    const creationDate = created_at ? new Date(created_at) : null;

    const profileInfo = [
        { label: 'Username', value: user_name },
        { label: 'Display Name', value: name },
        { label: 'Email Address', value: email, isVerified: email_verified },
        {
            label: 'Phone Number',
            value: phone || 'Not provided',
            isVerified: phone_verified,
        },
        {
            label: 'Joined At',
            value: creationDate
                ? `${creationDate.toLocaleDateString()} at ${creationDate.toLocaleTimeString()}`
                : 'N/A',
        },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-start">
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    Welcome, {name || 'User'} 👋
                </h2>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center rounded-xl border-2 p-4">
                <div className="relative">
                    <Avatar className="h-28 w-28 sm:h-40 sm:w-40">
                        <AvatarImage
                            loading="lazy"
                            src={avatar_url}
                            alt={full_name}
                        />
                    </Avatar>
                    <ToolTipComponent content="Active now">
                        <div className="absolute right-2 bottom-2 h-5 w-5 rounded-full border-2 border-white bg-green-400" />
                    </ToolTipComponent>
                </div>

                <div className="mt-8 w-full space-y-3">
                    {profileInfo.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2 text-sm sm:text-lg"
                        >
                            <p>
                                {item.label}:{' '}
                                <span className="font-semibold">
                                    {item.value}
                                </span>
                            </p>
                            {item.isVerified && <VerifiedBadge />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
