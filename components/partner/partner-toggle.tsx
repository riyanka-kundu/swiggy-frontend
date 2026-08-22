"use client";

type PartnerToggleProps = {
  activeTab: "delivery" | "dineout";
  onChange: (tab: "delivery" | "dineout") => void;
};

export default function PartnerToggle({
  activeTab,
  onChange,
}: PartnerToggleProps) {
  return (
    <div className="relative z-20 mx-auto -mt-7 flex w-[430px] rounded-full bg-muted p-1 shadow">
      <button
        onClick={() => onChange("delivery")}
        className={`flex-1 rounded-full py-3 font-semibold transition-all ${
          activeTab === "delivery"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
      >
        Food Delivery
      </button>

      <button
        onClick={() => onChange("dineout")}
        className={`flex-1 rounded-full py-3 font-semibold transition-all ${
          activeTab === "dineout"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
      >
        Dineout
      </button>
    </div>
  );
}
