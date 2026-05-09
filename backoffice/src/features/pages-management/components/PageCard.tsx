import type { IPageObject } from '../schemas/pages-schema';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import PublishToggleButton from './PublishToggleButton';
import DeletePageButton from './DeletePageButton';

type PageCardProps = {
  page: IPageObject;
};

const PageCard = ({ page }: PageCardProps) => {
  return (
    <TableRow key={page.id}>
      <TableCell className="font-medium">{page.title}</TableCell>
      <TableCell>{page.slug}</TableCell>
      <TableCell>
        <Badge variant={page.isPublished ? 'default' : 'secondary'}>
          {page.isPublished ? 'Publiée' : 'Brouillon'}
        </Badge>
      </TableCell>
      <TableCell className="text-right flex justify-end gap-2">
        <Link to={`/pages/${page.id}`}>
          <Button variant="outline" size="sm">
            Voir
          </Button>
        </Link>

        <Link to={`/pages/modifier/${page.id}`}>
          <Button variant="outline" size="sm">
            Modifier
          </Button>
        </Link>

        <PublishToggleButton page={page} />
        <DeletePageButton pageId={page.id} />
      </TableCell>
    </TableRow>
  );
};

export default PageCard;
