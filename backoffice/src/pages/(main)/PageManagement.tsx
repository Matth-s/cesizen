import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPagesApi, deletePageApi, updatePageApi } from '@/api/page-api';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const PageManagement = () => {
  const queryClient = useQueryClient();
  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: getPagesApi,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page supprimée');
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      updatePageApi({ id, isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Statut de publication mis à jour');
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Pages</h1>
        <Button asChild>
          <Link to="/pages/nouveau">Créer une page</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages?.map((page: any) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  <Badge variant={page.isPublished ? "default" : "secondary"}>
                    {page.isPublished ? 'Publiée' : 'Brouillon'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/pages/modifier/${page.id}`}>Modifier</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublishMutation.mutate({ id: page.id, isPublished: !page.isPublished })}
                  >
                    {page.isPublished ? 'Dépublier' : 'Publier'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Supprimer cette page ?')) {
                        deleteMutation.mutate(page.id);
                      }
                    }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PageManagement;
