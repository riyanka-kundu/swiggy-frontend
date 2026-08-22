type CTASectionProps = {
  onRegister?: () => void;
};

export default function CTASection({ onRegister }: CTASectionProps) {
  return (
    <section
      className="
        relative
        mx-6
        mb-16
        overflow-hidden
        rounded-2xl
        bg-gradient-to-br
        from-[#E4572E]
        to-[#B8511F]
        p-10
        text-center
        text-white
        md:mx-10
        md:p-14
      "
    >
      {/* Decorative circles */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          -bottom-10
          -left-6
          h-32
          w-32
          rounded-full
          bg-white/10
        "
      />

      <div className="relative">
        <h2 className="text-3xl font-black md:text-4xl">Hungry now?</h2>

        <p className="mt-3 text-white/80">
          Create an account and start ordering your favourite food today.
        </p>

        <button
          onClick={onRegister}
          className="
            mt-7
            rounded-md
            bg-white
            px-7
            py-3
            font-semibold
            text-[#E4572E]
            transition
            hover:bg-white/90
          "
        >
          Create account
        </button>
      </div>
    </section>
  );
}
