export default function DeliveryContent() {
  return (
    <section className="grid gap-12 px-6 py-16 md:grid-cols-2 max-w-6xl mx-auto">
      <div>
        <p className="text-sm text-muted-foreground">In just 3 easy steps</p>

        <h2 className="text-2xl font-bold">
          Get your restaurant delivery-ready in 24hrs!
        </h2>

        <div className="mt-6 rounded-2xl bg-muted p-8">
          {[
            "Install Partner App",
            "Register your restaurant",
            "Start receiving orders",
          ].map((item, index) => (
            <div key={item} className="mb-6 flex gap-4">
              <div className="h-4 w-4 rounded-full bg-purple-600" />

              <div>
                <p className="text-xs">STEP {index + 1}</p>

                <p className="font-semibold">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">Keep these documents ready</h2>

        <ul className="mt-6 space-y-4">
          {[
            "FSSAI License",
            "Restaurant Menu",
            "Bank Details",
            "GSTIN",
            "PAN Card",
          ].map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
