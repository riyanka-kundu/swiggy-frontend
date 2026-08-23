import StaticPageShell from "@/components/static/static-page-shell";

export default function RefundPolicyPage() {
  return (
    <StaticPageShell
      title="Refund Policy"
      subtitle="Last updated: January 2026 · Placeholder content."
    >
      <section>
        <h2>When refunds apply</h2>
        <ul>
          <li>An item you ordered was unavailable or missing.</li>
          <li>The order arrived significantly late or in poor condition.</li>
          <li>You were charged an incorrect amount.</li>
        </ul>
      </section>

      <section>
        <h2>How to request one</h2>
        <p>
          Contact support@foodexpress.example within 48 hours of delivery with
          your order id and a short description of the issue. Our team reviews
          every request and responds within one business day.
        </p>
      </section>

      <section>
        <h2>Refund method</h2>
        <p>
          Approved refunds for cash-on-delivery orders are returned via UPI or
          bank transfer within 5–7 business days. In some cases we may offer a
          discount code of equal value instead.
        </p>
      </section>

      <section>
        <h2>Non-refundable cases</h2>
        <ul>
          <li>Change of mind after the restaurant has started preparing food.</li>
          <li>Incorrect address or contact details entered by the customer.</li>
        </ul>
      </section>
    </StaticPageShell>
  );
}
