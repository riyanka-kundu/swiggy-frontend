import StaticPageShell from "@/components/static/static-page-shell";

export default function PrivacyPolicyPage() {
  return (
    <StaticPageShell
      title="Privacy Policy"
      subtitle="Last updated: January 2026 · Placeholder content."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          When you create an account or place an order, we collect the details
          needed to run the service: your name, email address, phone number,
          delivery addresses, and order history.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To create and secure your account.</li>
          <li>To deliver your orders and provide support.</li>
          <li>To improve our product and personalise your experience.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing</h2>
        <p>
          We share delivery details with partner restaurants and delivery
          partners strictly to fulfil your order. We never sell your personal
          data to third parties.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting privacy@foodexpress.example.
        </p>
      </section>
    </StaticPageShell>
  );
}
