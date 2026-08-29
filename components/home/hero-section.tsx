import { MapPin, Search } from "lucide-react";

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

        {/* Search */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_60px_-15px_rgba(228,87,46,0.5)] sm:flex-row">
          {/* Location */}
          <div className="flex items-center gap-2 border-border px-4 py-4 sm:border-r">
            <MapPin size={18} className="shrink-0 text-muted-foreground/60" />

            <input
              placeholder="Enter delivery location"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>

          {/* Search */}
          <div className="flex flex-1 items-center gap-2 px-4 py-4">
            <Search size={18} className="shrink-0 text-muted-foreground/60" />

            <input
              placeholder="Search for food..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>

          <button className="bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Find food
          </button>
        </div>
      </div>
    </section>
  );
}
