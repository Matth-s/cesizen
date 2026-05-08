import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card className="w-lg">
        <CardHeader className="text-center">
          <CardTitle>
            Il semblerait que cette page n'existe pas
          </CardTitle>
          <CardDescription aria-describedby="undefined" />
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <Link to={'/'}>
            <Button className="flex items-center gap-x-3">
              <ArrowLeft />
              Revenir a l'accueil
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
