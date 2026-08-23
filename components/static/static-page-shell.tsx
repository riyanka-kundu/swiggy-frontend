import HomeNavbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { ReactNode } from "react";

export default function StaticPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <HomeNavbar />

      <main className="mx-auto max-w-3xl px-6 py-14 md:px-10">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          FoodExpress
        </p>
        <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

        <div
          className="
            mt-10
            space-y-8
            text-sm
            leading-7
            text-muted-foreground
            [&_h2]:mt-2
            [&_h2]:text-lg
            [&_h2]:font-bold
            [&_h2]:text-foreground
            [&_li]:ml-5
            [&_li]:list-disc
            [&_ul]:space-y-2
          "
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
