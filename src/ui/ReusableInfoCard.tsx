import { cn } from '@/lib/utils';

interface StatsProps {
    title: string;
    children?: React.ReactNode;
    icon: React.ReactNode;
    classNames?: string;
}
const ReusableInfoCard = ({
    title,
    children,
    icon,
    classNames,
}: StatsProps) => {
    return (
        <div className="h-[150px] w-full items-center rounded-xl border-2 bg-white p-2 sm:p-4 dark:bg-black">
            <div className="flex h-full items-center justify-between">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-gray-400">{title}</p>
                    {children}
                </div>
                <div className={cn(`rounded-lg`, classNames)}>
                    <div className="p-2 border rounded-lg">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReusableInfoCard;
