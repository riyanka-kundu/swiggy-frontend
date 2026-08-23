import StaticPageShell from "@/components/static/static-page-shell";

export default function ContactPage() {
  return (
    <StaticPageShell
      title="Contact Us"
      subtitle="We would love to hear from you. Placeholder details."
    >
      <section>
        <h2>Customer support</h2>
        <p>
          For help with orders, refunds, or your account, email
          support@foodexpress.example or call 1800-000-000 (toll free, 9 AM –
          11 PM).
        </p>
      </section>

      <section>
        <h2>Partner with us</h2>
        <p>
          Restaurants interested in joining FoodExpress can apply through the{" "}
          Partner with us page or write to partners@foodexpress.example.
        </p>
      </section>

      <section>
        <h2>Head office</h2>
        <p>
          FoodExpress Technologies Pvt. Ltd.
          <br />
          4th Floor, Tech Park One
          <br />
          Salt Lake City, Kolkata 700091
        </p>
      </section>

      <section>
        <h2>Other enquiries</h2>
        <p>
          Press and media: press@foodexpress.example
          <br />
          Legal: legal@foodexpress.example
        </p>
      </section>
    </StaticPageShell>
  );
}
