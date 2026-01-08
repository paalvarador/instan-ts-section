import { useLoaderData } from "react-router";

export const loader = async () => {
  return {
    contactEmail: process.env.CONTACT_EMAIL || "paalvarador@gmail.com",
  };
};

export default function Privacy() {
  const { contactEmail } = useLoaderData();

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        lineHeight: "1.6",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Privacy Policy for Instant TS Sections</h1>
      <p>
        <strong>Effective Date:</strong> January 8, 2026
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        Our app does not collect personal information from your customers. We
        only access store data necessary to display our theme sections, such as
        cart totals for the shipping bar calculation.
      </p>

      <h2>2. Data Usage</h2>
      <p>
        We use session tokens to ensure the app functions correctly within your
        Shopify admin. No data is shared with third parties or used for tracking
        purposes outside of your store.
      </p>

      <h2>3. Contact Us</h2>
      <p>
        If you have questions about this policy, please contact us through the
        Shopify Partner support channel or at {contactEmail}.
      </p>
    </div>
  );
}
