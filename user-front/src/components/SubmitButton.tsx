import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type SubmitButtonProps = {
  isDisabled: boolean;
  textButton: string;
  className?: string;
};

const SubmitButton = ({
  isDisabled,
  textButton,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn(
        isDisabled ? 'opacity-50' : 'opacity-100',
        className,
      )}
    >
      {textButton}
    </Button>
  );
};

export default SubmitButton;
