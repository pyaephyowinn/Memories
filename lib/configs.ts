export const Roles = {
  customer: "customer" as const,
  owner: "owner" as const,
} as const;

export type RoleType = keyof typeof Roles;
