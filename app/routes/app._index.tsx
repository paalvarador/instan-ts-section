import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
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
  const { session } = await authenticate.admin(request);

  return {
    shopName: session.shop,
    contactSupport: process.env.CONTACT_EMAIL || "paalvarador@gmail.com",
  };
};

export default function Index() {
  const { shopName, contactSupport } = useLoaderData<typeof loader>();

  return (
    <Page>
      <TitleBar title="Instant TS Sections" />

      <Layout>
        {/* MAIN COLUMN */}
        <Layout.Section>
          <BlockStack gap="500">
            {/* HEADER */}
            <Card>
              <BlockStack gap="300">
                <Text as="h1" variant="headingLg">
                  Welcome, {shopName}
                </Text>
                <Text as="p" variant="bodyMd">
                  Add countdown timers, dynamic shipping bars, and secure payment badges to your store.
                </Text>
              </BlockStack>
            </Card>

            {/* ACTIVATION STEPS */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Getting started
                </Text>

                <List>
                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">1</Badge>
                      <Text as="span">
                        Enable the Free Shipping Bar app embed from the Theme
                        Editor.
                      </Text>
                    </InlineStack>
                  </List.Item>

                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">2</Badge>
                      <Text as="span">
                        Add the Secure Payments section to your product page.
                      </Text>
                    </InlineStack>
                  </List.Item>

                  <List.Item>
                    <InlineStack gap="200">
                      <Badge tone="attention">3</Badge>
                      <Text as="span">
                        Configure the Flash Banner Offer to create urgency in
                        your promotions.
                      </Text>
                    </InlineStack>
                  </List.Item>
                </List>

                <InlineStack align="end">
                  <Button
                    variant="primary"
                    url="shopify:admin/themes/current/editor"
                    target="_blank"
                  >
                    Open Theme Editor
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>

            {/* EXTENSIONS */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Available extensions
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
                          Show customers how close they are to free shipping.
                        </Text>
                        <Badge tone="warning">App Embed</Badge>
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
                          Display trusted payment methods to increase
                          confidence.
                        </Text>
                        <Badge>Section</Badge>
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
                          Create urgency with a countdown offer banner.
                        </Text>
                        <Badge>Section</Badge>
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
                  <Badge tone="success">Active - Free trial</Badge>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Support
                </Text>
                <Text as="p" variant="bodyMd">
                  Need help with setup? Our team is here to help.
                </Text>
                <Button
                  variant="secondary"
                  url={`mailto:${contactSupport}`}
                  target="_blank"
                >
                  Contact support
                </Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
