"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/user";
import { logout } from "@/redux/slice/auth-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  ChevronDown,
  LayoutDashboard,
  Loader2,
  LogOut,
  ReceiptText,
  ShoppingCart,
  User,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function HomeNavbar() {
  const { data, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const role = data?.data?.role;
  const isCustomer = Boolean(mounted && data?.data && role === "user");
  const { data: cart } = useCart(isCustomer);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cart?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    setDropdownOpen(false);
    dispatch(logout());
    toast.success("Signed out successfully");
    router.replace("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <UtensilsCrossed className="h-4.5 w-4.5" />
            </span>
            <span className="text-lg font-black tracking-tight">
              FoodExpress
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/partner"
              className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
            >
              Partner with us
            </Link>

            {loading ? (
              <button
                disabled
                className="flex h-9 w-24 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground opacity-70"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </button>
            ) : mounted && data ? (
              <>
                {/* Cart icon — only for users */}
                {role === "user" && (
                  <Link
                    href="/cart"
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent"
                    aria-label="Cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] font-bold text-primary-foreground">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </Link>
                )}

                {/* User dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-background py-2 pl-2.5 pr-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <span className="hidden max-w-24 truncate sm:inline">
                      {data.data?.name}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border bg-card p-1.5 shadow-lg">
                      <div className="border-b px-3 pb-2 pt-1">
                        <p className="text-xs font-medium">{data.data?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {role}
                        </p>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {role === "restaurant_owner" && (
                          <Link
                            href="/partner/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                        )}
                        {role === "user" && (
                          <Link
                            href="/my-orders"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                          >
                            <ReceiptText className="h-4 w-4" />
                            My Orders
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            setShowLogoutDialog(true);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => router.push("/signin")}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
              >
                Sign in
              </button>
            )}

            {/* Utility divider */}
            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />

            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Sign out confirmation dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl">
          <div className="flex items-center gap-3.5 mb-1">
            <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 shrink-0">
              <LogOut className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Sign Out
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                FoodExpress Account
              </p>
            </div>
          </div>

          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to sign out of your account?
          </DialogDescription>

          <DialogFooter className="mt-3 flex-row justify-end gap-2.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setShowLogoutDialog(false)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none active:scale-[0.98]"
            >
              Sign Out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

