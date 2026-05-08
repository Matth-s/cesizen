import { USER_ROLE } from '@/types/user-role';

export const USER_LIST_HEADER = [
  'Email',
  "Nom d'utilisateur",
  'Email vérifié',
  'État du compte',
  'Crée le',
  'Gérer',
];

export const USER_ROLE_SELECT = [
  {
    label: 'Administrateur',
    value: USER_ROLE.ADMIN,
  },
  {
    label: 'Utilisateur',
    value: USER_ROLE.USER,
  },
];
