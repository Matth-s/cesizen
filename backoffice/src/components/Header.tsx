import { APP_LINKS } from '@/constants/app-links';
import LogoutButton from '@/features/user/components/LogoutButton';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 w-full bg-blue-300 p-8 mb-4">
      <nav>
        <ul className="flex items-center gap-x-8">
          {APP_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <LogoutButton />
    </header>
  );
};

export default Header;
