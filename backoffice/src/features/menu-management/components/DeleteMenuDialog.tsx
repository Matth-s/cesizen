import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenuItemApi } from '../api/menu-api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { IMenuObject } from '../schema/menu-schema';
import { QUERY_KEY } from '@/types/query-key';

type DeleteMenuDialogProps = {
  menu: IMenuObject;
};

const DeleteMenuDialog = ({ menu }: DeleteMenuDialogProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MENUS, QUERY_KEY.STATS],
      });
      toast.success('Lien supprimé');
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={'destructive'}>Supprimer</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Voulez vous supprimer '{menu.label}' du menu ?
            </DialogTitle>
            <DialogDescription>
              Cet action est irréversible
            </DialogDescription>
          </DialogHeader>

          <Button
            variant={'destructive'}
            onClick={() => deleteMutation.mutate(menu.id)}
            disabled={deleteMutation.isPending}
          >
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteMenuDialog;
