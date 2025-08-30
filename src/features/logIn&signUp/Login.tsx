import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { loginSchema, type LoginSchema } from './loginSchema';
import { FiMessageSquare } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import { useUserAuth } from '@/store/UserAuth';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const signInWithGoogle = useUserAuth((state) => state.signInWithGoogle);
    const signInWithGithub = useUserAuth((state) => state.signInWithGithub);
    const signInWithPassword = useUserAuth((state) => state.signInWithPassword);
    const navigate = useNavigate();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { isAuthenticated } = useUserAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (values: LoginSchema) => {
        const { error } = await signInWithPassword(
            values.email,
            values.password
        );
        if (!error) {
            navigate('/');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-lg rounded-2xl border-2 p-8 shadow-2xl">
                <h1 className="mb-6 text-center text-4xl font-bold md:text-6xl">
                    Com-<span className="text-purple-500">media</span>
                </h1>

                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-4"
                            >
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
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
                                        <FormItem className="relative space-y-1">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        isVisible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            {form.formState.dirtyFields
                                                .password && (
                                                <div>
                                                    {isVisible ? (
                                                        <EyeOff
                                                            size={20}
                                                            className="absolute top-[50%] right-2 cursor-pointer"
                                                            onClick={() =>
                                                                setIsVisible(
                                                                    (prev) =>
                                                                        !prev
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={20}
                                                            className="absolute top-[50%] right-2 cursor-pointer"
                                                            onClick={() =>
                                                                setIsVisible(
                                                                    (prev) =>
                                                                        !prev
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            )}
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
                                    Login
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <p className="text-muted-foreground text-center">
                        or{' '}
                        <span className="inline md:hidden">sign in with</span>
                    </p>

                    {/* OAuth buttons */}
                    <div className="flex flex-1 items-center justify-center gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={signInWithGoogle}
                                >
                                    <FaGoogle className="mr-2" />
                                    <span className="hidden md:inline">
                                        Sign in with Google
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sign in with Google</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={signInWithGithub}
                                >
                                    <FaGithub className="mr-2" />
                                    <span className="hidden md:inline">
                                        Sign in with Github
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sign in with Github</TooltipContent>
                        </Tooltip>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-center">
                            don't have an account?{' '}
                            <span className="transition-colors hover:text-gray-800 dark:hover:text-gray-200">
                                <Link to={'/signup'}>create one now</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden h-full flex-1 flex-col items-center justify-start gap-4 border-l-2 lg:flex">
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
                    Welcome Back
                </h2>
                <div>
                    <div className="mt-12 animate-bounce rounded-2xl border-2 p-4">
                        <FiMessageSquare className="text-6xl" />
                    </div>
                </div>
                <p className="mb-6 max-w-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center leading-8 font-bold text-transparent">
                    make posts, join communities that you interest in, have a
                    good time with people like you around the world!{' '}
                </p>
            </div>
        </div>
    );
};

export default Login;
