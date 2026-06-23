import { APP_LINKS } from '@/constants/app-links';
import LogoutButton from '@/features/user/components/LogoutButton';
import { Link, useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();

  return (
    <header className="mb-4 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              CESIZen
            </h1>
          </div>

          <nav>
            <ul className="flex items-center gap-6">
              {APP_LINKS.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                      aria-label={link.path}
                    >
                      {link.label}

                      {isActive && (
                        <span className="absolute left-0 -bottom-1.25 h-0.75 w-full rounded-full bg-black" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
