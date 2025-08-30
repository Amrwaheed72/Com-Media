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
import { Button } from '@/components/ui/button';
import useCreateCommunity from './useCreateCommunity';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useUserAuth } from '@/store/UserAuth';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link, useNavigate } from 'react-router';
import { Textarea } from '@/components/ui/textarea';

const CreateCommunityForm = () => {
    const { mutate, isCreating } = useCreateCommunity();
    const queryClient = useQueryClient();
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
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
                onError: (err) => {
                    toast.error(
                        err.message ||
                            'error creating community, please try again'
                    );
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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="w-full max-w-48 cursor-pointer bg-purple-500 hover:bg-purple-600"
                                type="submit"
                                size={'lg'}
                                disabled={isCreating || !form.formState.isDirty}
                            >
                                {isCreating ? (
                                    <Spinner variant="ring" size="sm" />
                                ) : (
                                    'Create Community'
                                )}
                            </Button>
                        </AlertDialogTrigger>
                        {!isAuthenticated && (
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Login required
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You must login to be able to create a
                                        community
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Link to="/login">Login</Link>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )}
                    </AlertDialog>
                </form>
            </Form>
        </div>
    );
};

export default CreateCommunityForm;
