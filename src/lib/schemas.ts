import z from 'zod';

export const replySchema = z.object({
    content: z.string().min(1, 'a reply must not be empty'),
});

export const commentSchema = z.object({
    content: z.string().min(1, 'a comment must not be empty'),
});

export const formSchema = z.object({
    name: z
        .string()
        .min(3, 'Community name must be at least 3 characters')
        .max(50, 'Community name must be 50 characters or fewer')
        .regex(
            /^[a-zA-Z0-9\s-_]+$/,
            'Name can only contain letters, numbers, spaces, - and _'
        ),

    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be 500 characters or fewer'),
});
export type FormSchema = z.infer<typeof formSchema>;

