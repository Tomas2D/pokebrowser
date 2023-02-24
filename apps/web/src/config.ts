export const AppRoutes = {
  home: "/",
  detail: (slug: string) => `/${slug}`,
} as const;
