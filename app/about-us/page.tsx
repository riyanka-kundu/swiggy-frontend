import StaticPageShell from "@/components/static/static-page-shell";

export default function AboutUsPage() {
  return (
    <StaticPageShell
      title="About Us"
      subtitle="Food that finds you. Placeholder story, real ambition."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          FoodExpress is a food delivery platform that connects hungry customers
          with the restaurants they love. From quick lunches to family dinners,
          we make sure great food is never more than a few taps away.
        </p>
      </section>

      <section>
        <h2>What we do</h2>
        <ul>
          <li>
            Partner with local restaurants and help them reach more customers.
          </li>
          <li>Deliver orders fast, hot, and reliably.</li>
          <li>Build tools that make running a kitchen simpler for our partners.</li>
        </ul>
      </section>

      <section>
        <h2>Why us</h2>
        <p>
          Transparent pricing, honest delivery times, and support that actually
          responds. We are building the food delivery experience we always
          wanted as customers ourselves.
        </p>
      </section>

      <section>
        <h2>Join us</h2>
        <p>
          Whether you want to order your next meal or grow your restaurant with
          us, there is a place for you at FoodExpress. Partners can apply
          through the Partner with us page.
        </p>
      </section>
    </StaticPageShell>
  );
}
