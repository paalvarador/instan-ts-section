import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider as ShopifyProvider } from "@shopify/shopify-app-react-router/react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import esTranslations from "@shopify/polaris/locales/es.json";

import "@shopify/polaris/build/esm/styles.css";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  // Consultar el idioma oificial de la tienda mediante GraphQL
  const response = await admin.graphql(
    `#graphql
    query getShopLocale {
      shopLocales {
        locale
        name
        primary
      }
    }
    `,
  );

  const data = await response.json();
  const locale = data.data.shopLocales[0].locale || "en";

  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    locale: locale.startsWith("es") ? "es" : "en",
  };
};

export default function App() {
  const { apiKey, locale } = useLoaderData<typeof loader>();

  return (
    /* El proveedor de Shopify maneja la conexión con el Admin */
    <ShopifyProvider embedded apiKey={apiKey}>
      {/* El proovedor de Polaris maneja la parte visual (Page, Layout, etc) */}
      <PolarisProvider i18n={locale === "en" ? enTranslations : esTranslations}>
        <s-app-nav>
          <s-link href="/app">Home</s-link>
          <s-link href="/app/additional">Additional page</s-link>
        </s-app-nav>
        <Outlet context={{ locale }} />
      </PolarisProvider>
    </ShopifyProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
