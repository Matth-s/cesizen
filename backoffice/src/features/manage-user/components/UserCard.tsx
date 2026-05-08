import { TableCell, TableRow } from '@/components/ui/table';
import type { IUserObject } from '../schemas/user-list-schema';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';

type UserCardProps = {
  user: IUserObject;
};
const UserCard = ({ user }: UserCardProps) => {
  const { email, username, emailVerified, createAt, isActive } = user;

  return (
    <TableRow>
      <TableCell className="text-center">{email}</TableCell>
      <TableCell className="text-center">{username}</TableCell>
      <TableCell className="text-center">
        {emailVerified
          ? new Date(emailVerified).toLocaleDateString()
          : 'Email non vérifié'}
      </TableCell>
      <TableCell className="text-center">
        {isActive ? 'Activé' : 'Désactive'}
      </TableCell>
      <TableCell className="text-center">
        {new Date(createAt).toLocaleDateString()}
      </TableCell>

      <TableCell className="flex justify-center gap-x-3">
        <EditUserDialog user={user} />
        <DeleteUserDialog user={user} />
      </TableCell>
    </TableRow>
  );
};

export default UserCard;
