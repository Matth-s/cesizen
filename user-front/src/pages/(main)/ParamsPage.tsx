import UserParams from "@/features/users/components/UserParams";
import UpdatePassword from "@/features/users/components/UpdatePassword";
import DeleteUserAccount from "@/features/users/components/DeleteUserAccount";

const ParamsPage = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Paramètres</h1>

        <p className="text-muted-foreground mt-2">
          Gérez les paramètres et la sécurité de votre compte.
        </p>
      </div>
      <UserParams />
      <UpdatePassword />
      <DeleteUserAccount />
    </div>
  );
};

export default ParamsPage;
