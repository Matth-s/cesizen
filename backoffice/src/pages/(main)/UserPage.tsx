import { getUserList } from '@/features/manage-user/api/get-user-list-api';
import CreateUserDialog from '@/features/manage-user/components/CreateUserDialog';
import UserList from '@/features/manage-user/components/UserList';
import { QUERY_KEY } from '@/types/query-key';
import { useQuery } from '@tanstack/react-query';

const UserPage = () => {
  const {
    isPending,
    error,
    data = [],
    refetch,
  } = useQuery({
    retry: false,
    queryFn: getUserList,
    queryKey: [QUERY_KEY.USERS],
  });

  return (
    <div className="flex flex-col gap-y-5 w-4/5 mx-auto">
      <CreateUserDialog />

      <UserList
        refetch={refetch}
        users={data}
        error={error}
        isLoading={isPending}
      />
    </div>
  );
};

export default UserPage;
