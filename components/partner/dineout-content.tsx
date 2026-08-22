export default function DineoutContent() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Grow your dine-in business</h2>

      <p className="mt-4 text-muted-foreground">
        Increase table bookings and build your restaurant brand.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {["Get more customers", "Manage reservations", "Increase revenue"].map(
          (item) => (
            <div key={item} className="rounded-2xl bg-muted p-6">
              <h3 className="font-bold">{item}</h3>

              <p className="mt-2 text-sm">
                Grow your restaurant with our platform.
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
