import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(1, 'a post must have a title'),
    content: z
        .string()
        .min(1, { message: 'a post content can not be empty' })
        .max(1000, {
            message: 'a post content can not exceed 1000 character',
        }),
    image_url: z
        .instanceof(File)
        .refine((file) => file.type.startsWith('image/'), 'Must be an image')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'Max size is 5MB'),
});
export type postInputs = z.infer<typeof formSchema>;
