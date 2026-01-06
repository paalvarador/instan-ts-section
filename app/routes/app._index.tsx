import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData, useOutletContext } from "react-router";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  List,
  InlineStack,
  Badge,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);

  // Manejar el billing AQUÍ, después de la instalación
  await billing.require({
    plans: ["Plan Basic"],
    onFailure: async () =>
      billing.request({
        plan: "Plan Basic",
        isTest: true, // Cambiar a false cuando publiques
        returnUrl: "/app",
        trialDays: 7, // 7 días de prueba
      }),
  });

  return {
    shopName: session.shop,
  };
};

export default function Index() {
  const { shopName } = useLoaderData<typeof loader>();
  const { locale } = useOutletContext<{ locale: string }>();

  const t = {
    title: locale === "es" ? "Instant TS Sections" : "Instant TS Sections",
    welcome:
      locale === "es" ? `Bienvenido, ${shopName}` : `Welcome, ${shopName}`,
    subtitle:
      locale === "es"
        ? "Activa barras de envío gratis, sellos de confianza y ofertas con urgencia para aumentar tus conversiones."
        : "Enable free shipping bars, trust badges, and urgency offers to increase conversions.",
    stepsTitle: locale === "es" ? "Primeros pasos" : "Getting started",
    step1:
      locale === "es"
        ? "Activa el App Embed de Free Shipping Bar desde el Editor de Temas."
        : "Enable the Free Shipping Bar app embed from the Theme Editor.",
    step2:
      locale === "es"
        ? "Agrega la sección Secure Payments en la página de producto."
        : "Add the Secure Payments section to your product page.",
    step3:
      locale === "es"
        ? "Configura el Flash Banner Offer para crear urgencia en tus promociones."
        : "Configure the Flash Banner Offer to create urgency in your promotions.",
    openEditor: locale === "es" ? "Abrir Editor de Temas" : "Open Theme Editor",
    extensionsTitle:
      locale === "es" ? "Extensiones disponibles" : "Available extensions",
    supportTitle: locale === "es" ? "Soporte" : "Support",
    supportText:
      locale === "es"
        ? "¿Necesitas ayuda con la configuración? Nuestro equipo puede ayudarte."
        : "Need help with setup? Our team is here to help.",
  };

  return (
    <Page>
      <TitleBar title={t.title} />

      <Layout>
        {/* MAIN COLUMN */}
        <Layout.Section>
          <BlockStack gap="500">
            {/* HEADER */}
            <Card>
              <BlockStack gap="300">
                <Text as="h1" variant="headingLg">
                  {t.welcome}
                </Text>
                <Text as="p" variant="bodyMd">
                  {t.subtitle}
                </Text>
              </BlockStack>
            </Card>

            {/* ACTIVATION STEPS */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  {t.stepsTitle}
                </Text>

                <List>
                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">1</Badge>
                      <Text as="span">{t.step1}</Text>
                    </InlineStack>
                  </List.Item>

                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">2</Badge>
                      <Text as="span">{t.step2}</Text>
                    </InlineStack>
                  </List.Item>

                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">3</Badge>
                      <Text as="span">{t.step3}</Text>
                    </InlineStack>
                  </List.Item>
                </List>

                <InlineStack align="end">
                  <Button
                    variant="primary"
                    url="shopify:admin/themes/current/editor"
                    target="_top"
                  >
                    {t.openEditor}
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>

            {/* EXTENSIONS */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  {t.extensionsTitle}
                </Text>

                <Divider />

                <Layout>
                  <Layout.Section>
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          Free Shipping Bar
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {locale === "es"
                            ? "Muestra al cliente cuánto le falta para obtener envío gratis."
                            : "Show customers how close they are to free shipping."}
                        </Text>
                        <Badge tone="warning">
                          {locale === "es" ? "App Embed" : "App Embed"}
                        </Badge>
                      </BlockStack>
                    </Card>
                  </Layout.Section>

                  <Layout.Section>
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          Secure Payments
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {locale === "es"
                            ? "Muestra métodos de pago seguros para generar confianza."
                            : "Display trusted payment methods to increase confidence."}
                        </Text>
                        <Badge>{locale === "es" ? "Sección" : "Section"}</Badge>
                      </BlockStack>
                    </Card>
                  </Layout.Section>

                  <Layout.Section>
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          Flash Banner Offer
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {locale === "es"
                            ? "Crea urgencia con un temporizador de ofertas."
                            : "Create urgency with a countdown offer banner."}
                        </Text>
                        <Badge>{locale === "es" ? "Sección" : "Section"}</Badge>
                      </BlockStack>
                    </Card>
                  </Layout.Section>
                </Layout>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        {/* SIDEBAR */}
        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  App status
                </Text>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodyMd">
                    Status
                  </Text>
                  <Badge tone="success">
                    {locale === "es"
                      ? "Activo - Prueba gratis"
                      : "Active - Free trial"}
                  </Badge>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  {t.supportTitle}
                </Text>
                <Text as="p" variant="bodyMd">
                  {t.supportText}
                </Text>
                <Button variant="secondary" url="mailto:paalvarador@gmail.com">
                  {locale === "es" ? "Contactar soporte" : "Contact support"}
                </Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
