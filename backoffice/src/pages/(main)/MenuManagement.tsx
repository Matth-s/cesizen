import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenuItemsApi, createMenuItemApi, deleteMenuItemApi, updateMenuItemApi } from '@/api/menu-api';
import { getPagesApi } from '@/api/page-api';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const MenuManagement = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: menuItems, isLoading: loadingMenu } = useQuery({
    queryKey: ['menuItems'],
    queryFn: getMenuItemsApi,
  });

  const { data: pages } = useQuery({
    queryKey: ['pages'],
    queryFn: getPagesApi,
  });

  const createMutation = useMutation({
    mutationFn: createMenuItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      reset();
      toast.success('Lien ajouté au menu');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Lien supprimé');
    },
  });

  const onSubmit = (data: any) => {
    const selectedPage = pages?.find((p: any) => p.id === data.pageId);
    const menuItemData = {
      label: data.label,
      path: selectedPage ? `/page/${selectedPage.slug}` : data.path,
      order: parseInt(data.order),
      pageId: data.pageId || null,
    };
    createMutation.mutate(menuItemData);
  };

  if (loadingMenu) return <div>Chargement...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion du Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ajouter un lien</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium mb-1">Libellé</label>
              <input {...register('label', { required: true })} className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lier à une page (optionnel)</label>
              <select
                {...register('pageId')}
                className="w-full border rounded p-2"
                onChange={(e) => {
                  const pageId = e.target.value;
                  const page = pages?.find((p: any) => p.id === pageId);
                  if (page) {
                    setValue('label', page.title);
                    setValue('path', `/page/${page.slug}`);
                  }
                }}
              >
                <option value="">-- Choisir une page --</option>
                {pages?.map((page: any) => (
                  <option key={page.id} value={page.id}>{page.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ou URL personnalisée</label>
              <input {...register('path')} className="w-full border rounded p-2" placeholder="/exemple" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ordre</label>
              <input type="number" {...register('order')} className="w-full border rounded p-2" defaultValue={0} />
            </div>

            <Button type="submit" disabled={createMutation.isPending} className="w-full">
              {createMutation.isPending ? 'Ajout...' : 'Ajouter au menu'}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Liens actuels</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Libellé</th>
                  <th className="p-4">Ordre</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {menuItems?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="p-4">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.path}</div>
                    </td>
                    <td className="p-4">{item.order}</td>
                    <td className="p-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(item.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
