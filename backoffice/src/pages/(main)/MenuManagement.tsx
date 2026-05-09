import { useQuery } from '@tanstack/react-query';
import { getMenuApi } from '@/features/menu-management/api/menu-api';

import { Skeleton } from '@/components/ui/skeleton';

import CreateMenuForm from '@/features/menu-management/components/CreateMenuForm';
import MenuList from '@/features/menu-management/components/MenuList';
import { QUERY_KEY } from '@/types/query-key';

const MenuManagement = () => {
  const { data: menuItems = [], isLoading: loadingMenu } = useQuery({
    queryKey: [QUERY_KEY.MENUS],
    queryFn: getMenuApi,
  });

  if (loadingMenu) {
    return (
      <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-100 w-full" />
        <Skeleton className="h-100 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion du Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreateMenuForm />

        <MenuList menus={menuItems} />
      </div>
    </div>
  );
};

export default MenuManagement;
