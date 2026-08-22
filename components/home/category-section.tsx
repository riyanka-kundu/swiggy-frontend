import { Flame } from "lucide-react";

import { dishes } from "@/data/home";

export default function CategorySection() {
  return (
    <section id="picks" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="mb-8">
        <p
          className="
            mb-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-primary
          "
        >
          Popular picks
        </p>

        <h2 className="text-2xl font-black md:text-3xl">
          What are you craving?
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {dishes.map((food) => (
          <div
            key={food.name}
            className="
              group
              cursor-pointer
              overflow-hidden
              rounded-xl
              bg-[#FBF4E8]
              text-[#0B0906]
              transition-transform
              hover:-translate-y-1
            "
          >
            <div
              className="
                relative
                flex
                h-32
                items-center
                justify-center
                bg-[#F0E4CE]
                text-5xl
              "
            >
              {food.tag && (
                <span
                  className="
                    absolute
                    left-2
                    top-2
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-primary
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-white
                  "
                >
                  <Flame size={10} />
                  {food.tag}
                </span>
              )}

              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              >
                {food.emoji}
              </span>
            </div>

            <div className="px-4 py-4">
              <h3 className="font-bold">{food.name}</h3>

              <p className="mt-0.5 text-xs text-[#0B0906]/50">{food.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
