import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '/~/components/ui/button';

const SignInDialog = () => {
  return (
    <div className="flex flex-col gap-4 w-[400px] h-fit p-5 select-none">
      <div className="flex items-center gap-4">
        <Label className="w-20 text-right">Account</Label>
        <Input placeholder="Your account..."></Input>
      </div>

      <div className="flex items-center gap-4">
        <Label className="w-20 text-right">Password</Label>
        <Input placeholder="Your password..."></Input>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant={'outline'} size={'default'}>
          Cancel
        </Button>
        <div className="flex items-center gap-4">
          <Button variant={'outline'} size="default">
            Sign up
          </Button>
          <Button variant={'default'} size={'default'}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
