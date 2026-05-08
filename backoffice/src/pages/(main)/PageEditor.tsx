import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createPageApi,
  getPageListApi,
  updatePageApi,
} from '@/features/pages-management/api/page-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CreatePageForm from '@/features/pages-management/components/CreatePageForm';

const PageEditor = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = !!id;

  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: getPageListApi,
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && pages) {
      const page = pages.find((p) => p.id === id);
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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    mutationFn: (data: any) =>
      isEdit ? updatePageApi({ id, ...data }) : createPageApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success(isEdit ? 'Page modifiée' : 'Page créée');
      navigate('/pages');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (isEdit && isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {isEdit ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              {...register('title', { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register('slug', { required: true })}
              placeholder="ma-page"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {watch('imageUrl') && (
              <img
                src={watch('imageUrl')}
                alt="Preview"
                className="mt-2 h-32 object-cover rounded border"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Résumé)</Label>
            <Textarea
              id="description"
              {...register('description')}
              className="h-20"
              placeholder="Bref résumé de la page..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              {...register('content', { required: true })}
              className="h-64"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublished"
              checked={watch('isPublished')}
              onCheckedChange={(checked) =>
                setValue('isPublished', checked)
              }
            />
            <Label htmlFor="isPublished">Publier immédiatement</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/pages')}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? 'Enregistrement...'
                : 'Enregistrer'}
            </Button>
          </div>
        </form>
      ) : (
        <CreatePageForm />
      )}
    </div>
  );
};

export default PageEditor;
