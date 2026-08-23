import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Partner with us", href: "/partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/help-center" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Refund policy", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-border
        bg-muted/20
        px-6
        py-12
        md:px-10
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          gap-10
          md:grid-cols-3
        "
      >
        {/* Brand */}
        <div>
          <h3
            className="
              text-xl
              font-black
              text-foreground
            "
          >
            FoodExpress
          </h3>

          <p
            className="
              mt-3
              max-w-xs
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            Delicious food from your favourite restaurants, delivered fast to
            your doorstep.
          </p>

          <div
            className="
              mt-5
              flex
              gap-3
            "
          >
            <Link
              href="#"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-border
                transition
                hover:bg-accent
              "
            >
              <FaFacebookF size={16} />
            </Link>

            <Link
              href="#"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-border
                transition
                hover:bg-accent
              "
            >
              <FaInstagram size={16} />
            </Link>

            <Link
              href="#"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-border
                transition
                hover:bg-accent
              "
            >
              <FaTwitter size={16} />
            </Link>
          </div>
        </div>

        {/* Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4
              className="
                mb-4
                font-semibold
              "
            >
              {section.title}
            </h4>

            <ul className="space-y-3">
              {section.links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="
                      text-sm
                      text-muted-foreground
                      transition
                      hover:text-foreground
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        className="
          mx-auto
          mt-10
          max-w-6xl
          border-t
          border-border
          pt-6
          text-center
          text-xs
          text-muted-foreground
        "
      >
        © 2026 FoodExpress. All rights reserved.
      </div>
    </footer>
  );
}
