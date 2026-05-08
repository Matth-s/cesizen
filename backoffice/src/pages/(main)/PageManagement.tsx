import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPagesApi, deletePageApi, updatePageApi } from '@/api/page-api';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Pages</h1>
        <Button asChild>
          <Link to="/pages/nouveau">Créer une page</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Titre</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pages?.map((page: any) => (
              <tr key={page.id}>
                <td className="p-4">{page.title}</td>
                <td className="p-4">{page.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${page.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {page.isPublished ? 'Publiée' : 'Brouillon'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageManagement;
