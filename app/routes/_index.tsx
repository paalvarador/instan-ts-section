import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { login } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Si viene con parámetros de instalación de Shopify
  if (url.searchParams.get("shop")) {
    // Redirigir al flujo de autenticación
    return login(request);
  }

  // Si no hay parámetros, redirigir al app
  return redirect("/app");
};
