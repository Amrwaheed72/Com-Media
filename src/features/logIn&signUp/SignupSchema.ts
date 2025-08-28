import z from 'zod';

export const signUpSchema = z
    .object({
        username: z.string().min(3, 'Username must be at least 3 characters'),
        Email: z.string().email('Invalid email address'),
        phone: z
            .string()
            .optional()
            .refine((val) => !val || /^\d{10,15}$/.test(val), {
                message: 'Phone number must be 10-15 digits',
            }),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            )
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .regex(/\d/, 'Password must contain at least one number')
            .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });
