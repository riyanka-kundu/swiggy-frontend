import StaticPageShell from "@/components/static/static-page-shell";

export default function HelpCenterPage() {
  return (
    <StaticPageShell
      title="Help Center"
      subtitle="Answers to the questions we hear most often."
    >
      <section>
        <h2>Placing an order</h2>
        <p>
          Browse restaurants on the homepage, open one you like, and add dishes
          to your cart. When you are ready, head to your cart, enter a delivery
          address, and place your order with cash on delivery.
        </p>
      </section>

      <section>
        <h2>Tracking and cancelling</h2>
        <ul>
          <li>
            You can view all of your past and active orders from the orders
            section of your account.
          </li>
          <li>
            Orders can be cancelled while their status is still pending. Once
            the restaurant starts preparing food, cancellation is disabled.
          </li>
        </ul>
      </section>

      <section>
        <h2>Payments</h2>
        <p>
          We currently support cash on delivery. Your order total includes the
          item subtotal, a flat delivery fee, and GST where applicable.
        </p>
      </section>

      <section>
        <h2>Still need help?</h2>
        <p>
          Reach out to our support team at support@foodexpress.example and we
          will get back to you within 24 hours.
        </p>
      </section>
    </StaticPageShell>
  );
}
