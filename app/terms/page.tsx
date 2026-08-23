import StaticPageShell from "@/components/static/static-page-shell";

export default function TermsPage() {
  return (
    <StaticPageShell
      title="Terms of Service"
      subtitle="Last updated: January 2026 · Placeholder content."
    >
      <section>
        <h2>Using FoodExpress</h2>
        <p>
          By creating an account you agree to use FoodExpress only for lawful
          orders. You are responsible for keeping your login credentials secure
          and for the accuracy of the delivery details you provide.
        </p>
      </section>

      <section>
        <h2>Orders</h2>
        <ul>
          <li>
            All orders are subject to acceptance by the partner restaurant.
          </li>
          <li>
            Prices, availability, and promotions are set by restaurants and may
            change without notice.
          </li>
          <li>
            Orders placed with cash on delivery must be paid in full at the time
            of delivery.
          </li>
        </ul>
      </section>

      <section>
        <h2>Accounts</h2>
        <p>
          We may suspend accounts that engage in fraud, abuse, or repeated
          cancellations of confirmed orders.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to legal@foodexpress.example.
        </p>
      </section>
    </StaticPageShell>
  );
}
