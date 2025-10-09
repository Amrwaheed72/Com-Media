import { Trello } from 'lucide-react';
interface StatsProps {
    title: string;
    content: string;
}
const ReusableInfoCard = ({ title, content }: StatsProps) => {
    return (
        <div className="h-[150px] w-full items-center rounded-xl border-2 bg-white p-2 sm:p-4 dark:bg-black">
            <div className="flex h-full items-center justify-between">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold">{content}</h3>
                </div>
                <div className="rounded-lg bg-blue-200">
                    <div className="p-2">
                        <Trello className="text-blue-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReusableInfoCard;
