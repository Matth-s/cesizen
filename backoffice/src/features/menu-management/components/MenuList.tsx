import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { IMenuArray } from '../schema/menu-schema';
import DeleteMenuDialog from './DeleteMenuDialog';
import UpdateMenuDialog from './UpdateMenuDialog';

type MenuListProps = {
  menus: IMenuArray;
};

const MenuList = ({ menus }: MenuListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liens actuels</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du lien</TableHead>
              <TableHead>Lien</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.label}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{item.path}</p>
                </TableCell>
                <TableCell className="flex items-center gap-x-3 justify-end">
                  <UpdateMenuDialog menu={item} />
                  <DeleteMenuDialog menu={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MenuList;
