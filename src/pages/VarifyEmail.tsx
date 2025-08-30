import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/store/UserAuth';
import { toast } from 'sonner';

const VerifyEmail = () => {
    const [resending, setResending] = useState(false);
    const resendConfirmation = useUserAuth((state) => state.resendConfirmation);
    const email = useUserAuth((state) => state.lastSignupEmail);
    const handleResend = async () => {
        if (!email) {
            toast.error('No email found to resend confirmation.');
            return;
        }
        setResending(true);
        const { error } = await resendConfirmation(email);
        if (!error) toast.success('Confirmation email sent!');
        setResending(false);
    };

    return (
        <div className="mx-auto max-w-md py-20 text-center">
            <h1 className="mb-4 text-2xl font-bold">Verify your email</h1>
            <p className="mb-6 text-gray-600">
                We've sent you a confirmation link. Please check your inbox and
                click the link to activate your account.
            </p>

            <Button
                onClick={handleResend}
                disabled={resending}
                variant={'outline'}
            >
                {resending ? 'Sending...' : 'Resend Email'}
            </Button>
        </div>
    );
};

export default VerifyEmail;
