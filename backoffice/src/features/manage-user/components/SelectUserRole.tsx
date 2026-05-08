import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { USER_ROLE_SELECT } from '../constants/manage-user-constant';
import type { IUserRole } from '@/types/user-role';

type SelectUserRoleProps = {
  onChange: (value: IUserRole) => void;
  value: IUserRole;
};

const SelectUserRole = ({ onChange, value }: SelectUserRoleProps) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        if (val) {
          onChange(val as IUserRole);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Choisir un rôle" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {USER_ROLE_SELECT.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectUserRole;
