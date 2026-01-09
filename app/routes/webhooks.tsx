import { authenticate } from "../shopify.server";

export const action = async ({ request }: { request: Request }) => {
  // Esta línea es la que genera el error 401 que Shopify está esperando.
  // Si Shopify manda una firma falsa, esta función responde 401 inmediatamente.
  const { topic } = await authenticate.webhook(request);

  // Si pasa de aquí, significa que la firma ERA válida (HMAC correcto)
  console.log(`Webhook recibido: ${topic}`);

  // Siempre responde 200 OK a Shopify si la firma fue válida
  return new Response(null, { status: 200 });
};
