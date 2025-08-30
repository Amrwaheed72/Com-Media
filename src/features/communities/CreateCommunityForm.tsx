import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { formSchema, type FormSchema } from './formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateCommunity from './useCreateCommunity';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Textarea } from '@/components/ui/textarea';
import LoginAlert from '@/ui/LoginAlert';

const CreateCommunityForm = () => {
    const { mutate, isCreating } = useCreateCommunity();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });
    const onSubmit = (values: FormSchema) => {
        mutate(
            {
                name: values.name,
                description: values.description,
            },
            {
                onSuccess: () => {
                    toast.success('Community Created Successfully!');
                    form.reset();
                    queryClient.invalidateQueries({
                        queryKey: ['communities'],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['communities-name'],
                    });
                    navigate('/communities');
                },
                onError: () => {
                    toast.error('error creating community, please try again');
                },
            }
        );
    };

    return (
        <div className="mx-auto w-full max-w-2xl rounded-3xl border-2 p-4">
            <Form {...form}>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Community Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="eg.Games"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Community Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="eg.a community for gamers around the world"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <LoginAlert
                        size={'lg'}
                        isCreating={isCreating}
                        isDirty={form.formState.isDirty}
                        message="create a community"
                        label="Create Community"
                    />
                </form>
            </Form>
        </div>
    );
};

export default CreateCommunityForm;
