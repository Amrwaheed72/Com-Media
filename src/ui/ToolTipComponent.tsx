import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    open?: boolean;
}

const ToolTipComponent = ({ children, content, open }: TooltipProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            {!open && (
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            )}
        </Tooltip>
    );
};

export default ToolTipComponent;
