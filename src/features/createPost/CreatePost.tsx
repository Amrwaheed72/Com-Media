import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useCreatePost from './useCreatePost';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useState } from 'react';
import { formSchema, type PostInputs } from './formSchema';
import { Link, useNavigate } from 'react-router';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useGetCommunityName from '../communities/useGetCommunityName';

const CreatePost = () => {
    const user = useUserAuth((state) => state.user);
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    const [preview, setPreview] = useState<string | null>(null);
    const { createpost, isCreating } = useCreatePost();
    const { communities, isPending, error } = useGetCommunityName();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const avatar_url = user?.user_metadata.avatar_url;

    const form = useForm<PostInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
            image_url: undefined,
            community_id: null, // ✅ match schema
        },
    });

    // mutation function
    function onSubmit(values: PostInputs) {
        createpost(
            { post: values, avatar_url },
            {
                onSuccess: () => {
                    toast.success('Post created successfully', {
                        className: 'bg-gray-900 text-purple-500',
                    });
                    queryClient.invalidateQueries({ queryKey: ['posts'] });
                    form.reset();
                    navigate('/');
                },
                onError: () => {
                    toast.error(
                        'sorry, something went wrong while creating your post, please try again'
                    );
                },
            }
        );
    }
    return (
        <div className="mx-auto w-full max-w-2xl rounded-3xl border-2 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto max-w-2xl space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    htmlFor="title"
                                    className="mb-2 block font-medium"
                                >
                                    Post Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="title"
                                        placeholder="Post Title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    htmlFor="content"
                                    className="mb-2 block font-medium"
                                >
                                    Post Content
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        id="content"
                                        rows={5}
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPending ? (
                        <Spinner size="sm" variant="ring" />
                    ) : (
                        <FormField
                            control={form.control}
                            name="community_id"
                            render={({ field }) => (
                                <FormItem>
                                    {error ? (
                                        <p className="text-red-500">
                                            we have trouble to display
                                            communities now, please restart the
                                            page or choose no communities
                                        </p>
                                    ) : (
                                        <>
                                            <FormLabel>
                                                Choose a community
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            value === 'none'
                                                                ? null
                                                                : Number(value)
                                                        )
                                                    }
                                                    value={
                                                        field.value
                                                            ? String(
                                                                  field.value
                                                              )
                                                            : 'none'
                                                    }
                                                >
                                                    <SelectTrigger className="w-[240px]">
                                                        <SelectValue placeholder="Choose a community" />
                                                    </SelectTrigger>
                                                    {!communities ||
                                                    communities?.length ===
                                                        0 ? (
                                                        <SelectContent>
                                                            <SelectItem value="none">
                                                                no communities
                                                            </SelectItem>
                                                        </SelectContent>
                                                    ) : (
                                                        <SelectContent>
                                                            <SelectItem value="none">
                                                                No Community
                                                            </SelectItem>
                                                            {communities?.map(
                                                                (one) => (
                                                                    <SelectItem
                                                                        key={
                                                                            one.id
                                                                        }
                                                                        value={String(
                                                                            one.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            one.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </>
                                    )}
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    htmlFor="image"
                                    className="mb-2 block font-medium"
                                >
                                    Post Image
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            ref={field.ref}
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                field.onChange(file);

                                                if (file) {
                                                    const previewUrl =
                                                        URL.createObjectURL(
                                                            file
                                                        );
                                                    setPreview(previewUrl);
                                                } else {
                                                    setPreview(null);
                                                }
                                            }}
                                        />
                                        {field.value && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => {
                                                    field.onChange(undefined);
                                                    setPreview(null);
                                                    const input =
                                                        document.getElementById(
                                                            'image'
                                                        ) as HTMLInputElement;
                                                    if (input) input.value = '';
                                                }}
                                                className="absolute top-1/2 right-2 -translate-y-1/2 font-bold text-gray-500"
                                            >
                                                x
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {preview && (
                        <div className="relative mt-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-20 w-20 rounded-md border object-cover md:h-40 md:w-40"
                            />
                        </div>
                    )}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="submit"
                                className="cursor-pointer bg-purple-500 hover:bg-purple-600"
                                disabled={isCreating || !form.formState.isDirty}
                                // variant={'outline'}
                            >
                                {isCreating ? (
                                    <Spinner size="sm" />
                                ) : (
                                    'Create Post'
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
                                        post
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

export default CreatePost;
