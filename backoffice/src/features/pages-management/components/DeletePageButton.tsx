import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { deletePageApi } from '../api/page-api';
import { QUERY_KEY } from '@/types/query-key';

type DeletePageButtonProps = {
  pageId: string;
};

const DeletePageButton = ({ pageId }: DeletePageButtonProps) => {
  const queryClient = useQueryClient();
  const [confirmText, setConfirmText] = useState<string>('');

  const deleteMutation = useMutation({
    mutationFn: deletePageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PAGES] });
      toast.success('Page supprimée');
    },
  });

  const isDisabled =
    deleteMutation.isPending || confirmText !== 'Supprimer';

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" size="sm">
          Supprimer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voulez-supprimer cette page</DialogTitle>

          <DialogDescription>
            Attention cette action est irréversible,
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-3">
          <Label>Taper 'Supprimer' pour supprimer la page</Label>

          <Input
            defaultValue={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />

          <Button
            variant={'destructive'}
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              deleteMutation.mutate(pageId);
            }}
          >
            Supprimer la page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePageButton;
