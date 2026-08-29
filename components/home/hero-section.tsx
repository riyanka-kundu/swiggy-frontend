export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(228,87,46,0.35), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Open now · 40-min average delivery
        </p>

        <h1 className="text-4xl font-black leading-[1.05] md:text-6xl">
          Delicious food,
          <br />
          delivered to your door
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Order from your favourite restaurants and enjoy fast delivery,
          anytime.
        </p>
      </div>
    </section>
  );
}
