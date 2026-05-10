import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isDisabled: boolean;
  textButton: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
};

const SubmitButton = ({
  isDisabled,
  textButton,
  className,
  variant,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn(isDisabled && "cursor-not-allowed opacity-50", className)}
      variant={variant}
    >
      {textButton}
    </Button>
  );
};

export default SubmitButton;
