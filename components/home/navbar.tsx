"use client";

import { ModeToggle } from "@/components/mode-toggle";
import SignInSheet from "@/components/auth/signin-sheet";
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
  const [showSignIn, setShowSignIn] = useState(false);
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
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-black">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-4.5 w-4.5" />
          </span>
          FoodExpress
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/partner" className="hover:text-foreground transition-colors">Partner with us</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Get the app</Link>
          <ModeToggle />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {loading ? (
            <button
              disabled
              className="flex min-w-24 cursor-not-allowed items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-70"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </button>
          ) : mounted && data ? (
            <>
              {/* Cart icon — only for users */}
              {role === "user" && (
                <Link
                  href="/cart"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background text-foreground transition-colors hover:bg-accent"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="max-w-28 truncate">{data.data?.name}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border bg-card p-1.5 shadow-lg">
                    <div className="border-b px-3 pb-2 pt-1">
                      <p className="text-xs font-medium">{data.data?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{role}</p>
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
              onClick={() => setShowSignIn(true)}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
            >
              Sign in
            </button>
          )}
        </div>
      </nav>

      {/* Sign in sidebar */}
      <SignInSheet open={showSignIn} onOpenChange={setShowSignIn} />

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

