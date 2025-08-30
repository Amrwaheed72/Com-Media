import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(1, 'A post must have a title'),
    content: z
        .string()
        .min(1, { message: 'A post content cannot be empty' })
        .max(1000, { message: 'A post content cannot exceed 1000 characters' }),
    community_id: z.number().nullable().optional(),
    image_url: z
        .instanceof(File)
        .refine((file) => file.type.startsWith('image/'), 'Must be an image')
        .refine((file) => file.size <= 10 * 1024 * 1024, 'Max size is 10MB'),
});

export type PostInputs = z.infer<typeof formSchema>;
