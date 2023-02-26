export const AppRoutes = {
  home: "/",
  detail: (slug: string) => `/${slug}`,
} as const;

export const MODAL_WRAPPER_ID = "modal-wrapper";
