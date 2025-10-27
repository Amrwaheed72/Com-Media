import z from "zod";

export const replySchema = z.object({
    content: z.string().min(1, 'a reply must not be empty'),
});

    export const commentSchema = z.object({
        content: z.string().min(1, 'a comment must not be empty'),
    });