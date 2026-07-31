export const PERMISSIONS_SEED = [
  {
    module: 'user',
    action: 'view',
    description: 'View User',
  },
  {
    module: 'user',
    action: 'create',
    description: 'Create User',
  },
  {
    module: 'user',
    action: 'update',
    description: 'Update User',
  },
  {
    module: 'user',
    action: 'delete',
    description: 'Delete User',
  },

  {
    module: 'role',
    action: 'create',
    description: 'Create Role',
  },
  {
    module: 'role',
    action: 'view',
    description: 'View Role',
  },
  {
    module: 'role',
    action: 'update',
    description: 'Update Role',
  },
  {
    module: 'role',
    action: 'delete',
    description: 'Delete Role',
  },
  {
    module: 'permission',
    action: 'create',
    description: 'Create Role',
  },
  {
    module: 'permission',
    action: 'view',
    description: 'View Role',
  },
  {
    module: 'permission',
    action: 'update',
    description: 'Update Role',
  },
  {
    module: 'permission',
    action: 'delete',
    description: 'Delete Role',
  },
] as const;
