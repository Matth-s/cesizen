import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPageApi, getPagesApi, updatePageApi } from '@/api/page-api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect } from 'react';

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch } = useForm();

  const isEdit = !!id;

  const { data: pages } = useQuery({
    queryKey: ['pages'],
    queryFn: getPagesApi,
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && pages) {
      const page = pages.find((p: any) => p.id === id);
      if (page) {
        setValue('title', page.title);
        setValue('description', page.description || '');
        setValue('content', page.content);
        setValue('slug', page.slug);
        setValue('imageUrl', page.imageUrl || '');
        setValue('isPublished', page.isPublished);
      }
    }
  }, [id, pages, isEdit, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updatePageApi({ id, ...data }) : createPageApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success(isEdit ? 'Page modifiée' : 'Page créée');
      navigate('/pages');
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Modifier la page' : 'Créer une nouvelle page'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input {...register('title', { required: true })} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input {...register('slug', { required: true })} className="w-full border rounded p-2" placeholder="ma-page" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded p-2" />
          {watch('imageUrl') && (
            <img src={watch('imageUrl')} alt="Preview" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Résumé)</label>
          <textarea {...register('description')} className="w-full border rounded p-2 h-20" placeholder="Bref résumé de la page..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenu</label>
          <textarea {...register('content', { required: true })} className="w-full border rounded p-2 h-64" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isPublished')} id="isPublished" />
          <label htmlFor="isPublished">Publier immédiatement</label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/pages')}>Annuler</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageEditor;
