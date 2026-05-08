import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />

      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
