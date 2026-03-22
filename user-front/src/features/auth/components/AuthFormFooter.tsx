import { Link } from 'react-router';

type AuthFormFooterProps = {
  pathTo: string;
  answer: string;
  linkName: string;
};

const AuthFormFooter = ({
  pathTo,
  answer,
  linkName,
}: AuthFormFooterProps) => {
  return (
    <div className="m-auto text-center">
      <p className="text-base text-gray-700">{answer}</p>

      <Link
        to={`/authentification/${pathTo}`}
        className="text-teal-600 hover:text-teal-700 font-semibold underline"
      >
        {linkName}
      </Link>
    </div>
  );
};

export default AuthFormFooter;
