import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signUpSchema } from './SignupSchema';
import { useUserAuth } from '@/store/UserAuth';
import { FiMessageSquare } from 'react-icons/fi';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const signUp = useUserAuth((state) => state.signup);
    const signInWithGoogle = useUserAuth((state) => state.signInWithGoogle);
    const signInWithGithub = useUserAuth((state) => state.signInWithGithub);
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            Email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (values: SignUpSchema) => {
        const {  error } = await signUp(
            values.Email,
            values.password,
            values.username
        );
        if (error) {
            console.error(error.message);
        } else {
            toast.success('Check your inbox to verify your email!');
            navigate('/verify-email');
        }
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-xl rounded-2xl border p-8">
                <h1 className="mb-6 text-center text-6xl font-bold">
                    Com-<span className="text-purple-500">media</span>
                </h1>
                <div className="flex flex-col gap-4 p-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* Username */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Amr Waheed"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="Email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="amr@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>
                                            Phone Number{' '}
                                            <span className="text-gray-400">
                                                (optional)
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0123456789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Repeat Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                variant={'outline'}
                                size="lg"
                                className="w-full cursor-pointer"
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                    <p className="text-muted-foreground text-center">
                        or
                        <span className="inline md:hidden"> sign up with</span>
                    </p>
                    {/* OAuth buttons */}
                    <div className="flex items-center justify-center gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={signInWithGoogle}
                                >
                                    <FaGoogle className="mr-2" />
                                    <span className="hidden md:inline">
                                        Sign up with Google
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sign up with Google</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={signInWithGithub}
                                >
                                    <FaGithub className="mr-2" />
                                    <span className="hidden md:inline">
                                        Sign up with GitHub
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sign up with GitHub</TooltipContent>
                        </Tooltip>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-center">
                            already have an account?
                            <span className="transition-colors hover:text-gray-800 dark:hover:text-gray-200">
                                <Link to={'/login'}> sign in now</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden h-full flex-1 flex-col items-center gap-4 border-l-2 lg:flex">
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
                    Welcome
                </h2>
                <div>
                    <div className="mt-12 animate-bounce rounded-2xl border-2 p-4">
                        <FiMessageSquare className="text-6xl" />
                    </div>
                </div>
                <p className="mb-6 max-w-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center leading-8 font-bold text-transparent">
                    join our community, make posts, join communities that you
                    interest in, have a good time with people like you around
                    the world!{' '}
                </p>
            </div>
        </div>
    );
};

export default SignUp;
