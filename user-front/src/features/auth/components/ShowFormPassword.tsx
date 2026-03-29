import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ShowFormPasswordProps = {
  showPassword: boolean;
  toggleShowPassword: () => void;
  label: string;
};

const ShowFormPassword = ({
  showPassword,
  toggleShowPassword,
  label,
}: ShowFormPasswordProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="show-password"
        onCheckedChange={toggleShowPassword}
        checked={showPassword}
      />
      <Label htmlFor="show-password">{label}</Label>
    </div>
  );
};

export default ShowFormPassword;
