import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface ReusableFormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    children: (field: any) => React.ReactNode;
}

const ReusableFormField = <T extends FieldValues>({
    control,
    name,
    label,
    children,
}: ReusableFormFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="mb-2 block font-medium">
                        {label}
                    </FormLabel>
                    <FormControl>{children(field)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ReusableFormField;
