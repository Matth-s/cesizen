import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenuItemsApi, createMenuItemApi, deleteMenuItemApi } from '@/api/menu-api';
import { getPagesApi } from '@/api/page-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MenuManagement = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: menuItems, isLoading: loadingMenu } = useQuery({
    queryKey: ['menuItems'],
    queryFn: getMenuItemsApi,
  });

  const { data: pages, isLoading: loadingPages } = useQuery({
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
    const pageId = data.pageId === 'none' ? null : data.pageId;
    const selectedPage = pages?.find((p: any) => p.id === pageId);
    const menuItemData = {
      label: data.label,
      path: selectedPage ? `/page/${selectedPage.slug}` : data.path,
      order: parseInt(data.order) || 0,
      pageId: pageId || null,
    };
    createMutation.mutate(menuItemData);
  };

  if (loadingMenu || loadingPages) {
    return (
      <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion du Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un lien</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Libellé</Label>
                <Input id="label" {...register('label', { required: true })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageId">Lier à une page (optionnel)</Label>
                <Select onValueChange={(value) => {
                  const actualValue = value === 'none' ? null : value;
                  setValue('pageId', actualValue);
                  const page = pages?.find((p: any) => p.id === actualValue);
                  if (page) {
                    setValue('label', page.title);
                    setValue('path', `/page/${page.slug}`);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-- Aucune --</SelectItem>
                    {pages?.map((page: any) => (
                      <SelectItem key={page.id} value={page.id}>{page.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="path">Ou URL personnalisée</Label>
                <Input id="path" {...register('path')} placeholder="/exemple" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Ordre</Label>
                <Input id="order" type="number" {...register('order')} defaultValue={0} />
              </div>

              <Button type="submit" disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? 'Ajout...' : 'Ajouter au menu'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liens actuels</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libellé</TableHead>
                  <TableHead>Ordre</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.path}</div>
                    </TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(item.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuManagement;
