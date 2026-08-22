import FeaturedCarousel from "@/components/home/feature-carousel";
import { features } from "@/data/home";

export default function FeaturesSection() {
  return (
    <>
      {/* Features */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-14 md:grid-cols-3 md:px-10">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="
              flex 
              gap-4 
              rounded-xl 
              border 
              border-border 
              bg-card 
              p-6
              transition
              hover:border-primary/40
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-primary/15
              "
            >
              <Icon size={18} className="text-primary" />
            </span>

            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>

              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Carousel */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Featured today
        </p>

        <h2 className="mb-6 text-2xl font-black md:text-3xl">
          On everyone&apos;s plate
        </h2>

        <FeaturedCarousel />
      </section>
    </>
  );
}
