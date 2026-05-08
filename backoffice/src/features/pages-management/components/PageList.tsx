import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IPageArray } from '../schemas/pages-schema';
import PageCard from './PageCard';

type PageListProps = {
  pages: IPageArray;
};

const PageList = ({ pages }: PageListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <PageCard page={page} key={page.id} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PageList;
