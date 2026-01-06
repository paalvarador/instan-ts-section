import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Si viene con parámetros de instalación de Shopify, redirigir a auth
  if (url.searchParams.get("shop")) {
    const shop = url.searchParams.get("shop");
    return redirect(`/auth/login?shop=${shop}`);
  }

  // Si no hay parámetros, redirigir al app
  return redirect("/app");
};
