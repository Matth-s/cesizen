import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Link } from 'react-router';
import { Button } from '../../../components/ui/button';
import { Plus, Users } from 'lucide-react';

const HomePageLink = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>

        <CardDescription>
          Accédez rapidement aux actions principales.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 ">
        <Link to="/pages/nouveau" className="w-full">
          <Button className="justify-start gap-2 w-full">
            <Plus className="size-4" />
            Créer une page
          </Button>
        </Link>

        <Link to={'/menu'}>
          <Button className="justify-start gap-2 w-full">
            <Plus className="size-4" />
            Ajouter un menu
          </Button>
        </Link>

        <Link to={'/utilisateurs'}>
          <Button className="justify-start gap-2 w-full">
            <Users className="size-4" />
            Gérer les utilisateurs
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HomePageLink;
