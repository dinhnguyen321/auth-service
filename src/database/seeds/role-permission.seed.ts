export const ROLE_PERMISSION_MAP = {
  ADMIN: ['user:view', 'user:create', 'user:update', 'user:delete'],
  MANAGER: ['user:view', 'user:update'],
  USER: ['user:view'],
} as const;
