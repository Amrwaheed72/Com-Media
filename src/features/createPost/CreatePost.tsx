// const {
//     register,
//     handleSubmit,
//     formState: { errors },
// } = useForm<postInputs>();

// const onSubmit = () => {};
// return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//             type="text"
//             {...register('title', { required: 'a post must have a title' })}
//         />
//         {errors.title && (
//             <p className="text-red-600">{errors.title.message}</p>
//         )}
//     </form>
// );
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useCreatePost from './useCreatePost';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useState } from 'react';
import { formSchema } from './formSchema';

const CreatePost = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const { createpost, isCreating } = useCreatePost();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
            image_url: undefined,
        },
    });
    // mutation function
    function onSubmit(values: z.infer<typeof formSchema>) {
        createpost(values, {
            onSuccess: () => {
                toast.success('Post created successfully', {
                    className: 'bg-gray-900 text-purple-500',
                });
                form.reset();
            },
            onError: () => {
                toast.error(
                    'sorry, something went wrong while creating your post, please try again'
                );
            },
        });
    }
    return (
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
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                htmlFor="image"
                                className="mb-2 block font-medium"
                            >
                                Post Content
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        ref={field.ref}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file);

                                            if (file) {
                                                const previewUrl =
                                                    URL.createObjectURL(file);
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
                <Button
                    disabled={isCreating}
                    type="submit"
                    className="cursor-pointer bg-purple-500 hover:bg-purple-700"
                    // variant={'outline'}
                >
                    {isCreating ? <Spinner size="sm" /> : 'Create Post'}
                </Button>
            </form>
        </Form>
    );
};

export default CreatePost;
