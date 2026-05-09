import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { getMenuApi } from '@/features/menu-management/api/menu-api';
import { QUERY_KEY } from '@/types/query-key';
import { useQuery } from '@tanstack/react-query';

type SelectMenuIdProps = {
  value?: string;
  onChange: (value: string | null) => void;
};

const SelectMenuId = ({ value, onChange }: SelectMenuIdProps) => {
  const {
    data: menus = [],
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.MENUS],
    queryFn: getMenuApi,
  });

  if (isPending) return <p>Chargement...</p>;

  if (error) {
    return <p>Une erreur est survenue</p>;
  }

  const selectedMenu = menus.find((menu) => menu.id === value);

  return (
    <Select value={value} onValueChange={(val) => onChange(val)}>
      <SelectTrigger>
        <SelectValue placeholder="Choisir un menu">
          {selectedMenu?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {menus.map((menu) => (
            <SelectItem key={menu.id} value={menu.id}>
              {menu.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMenuId;
