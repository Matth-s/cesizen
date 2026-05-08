import type { IPageObject } from '../schemas/pages-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePageApi } from '../api/page-api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { QUERY_KEY } from '@/types/query-key';

type PublishToggleButtonProps = {
  page: IPageObject;
};

const PublishToggleButton = ({ page }: PublishToggleButtonProps) => {
  const queryClient = useQueryClient();

  const togglePublishMutation = useMutation({
    mutationFn: ({
      id,
      isPublished,
    }: {
      id: string;
      isPublished: boolean;
    }) => updatePageApi({ id, isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PAGES] });
      toast.success('Statut de publication mis à jour');
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        togglePublishMutation.mutate({
          id: page.id,
          isPublished: !page.isPublished,
        })
      }
    >
      {page.isPublished ? 'Dépublier' : 'Publier'}
    </Button>
  );
};

export default PublishToggleButton;
