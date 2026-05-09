import HomePageLink from '@/features/dashboard/components/HomePageAction';
import HomePageLastPageUploaded from '@/features/dashboard/components/HomePageLastPageUploaded';
import HomeStats from '@/features/dashboard/components/HomeStats';

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground mt-1">
          Bienvenue sur votre espace d'administration.
        </p>
      </div>

      <HomeStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <HomePageLink />
        <HomePageLastPageUploaded />
      </div>
    </div>
  );
};

export default HomePage;
