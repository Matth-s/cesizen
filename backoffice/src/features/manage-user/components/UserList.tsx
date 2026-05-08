import { USER_LIST_HEADER } from '../constants/manage-user-constant';
import type { IUserArray } from '../schemas/user-list-schema';
import UserCard from './UserCard';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type UserListProps = {
  isLoading: boolean;
  error: Error | null;
  users: IUserArray;
  refetch: () => void;
};

const UserList = ({ isLoading, users, error }: UserListProps) => {
  if (isLoading) return <p>chargement</p>;

  if (error) return <p>uen erreur est survenue</p>;

  return (
    <div className="w-full">
      <Table className="border rounded-2xl overflow-hidden">
        <TableCaption className="text-sm text-muted-foreground">
          Utilisateurs de l'application CESIZen
        </TableCaption>

        <TableHeader className="bg-muted">
          <TableRow>
            {USER_LIST_HEADER.map((header) => (
              <TableHead
                key={header}
                className="text-center font-semibold"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
