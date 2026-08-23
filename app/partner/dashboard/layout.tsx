"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { logout } from "@/redux/slice/auth-slice";
import { AppDispatch, RootState } from "@/redux/store/store";

import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const navItems = [
  { href: "/partner/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/partner/dashboard/menu", label: "Menu", icon: ChefHat },
  { href: "/partner/dashboard/order", label: "Orders", icon: ShoppingBag },
  {
    href: "/partner/dashboard/settings",
    label: "Settings",
    icon: ClipboardList,
  },
];

function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    dispatch(logout());
    toast.success("Signed out successfully");
    router.replace("/");
  };

  return (
    <>
      <aside className="flex w-64 shrink-0 flex-col border-r bg-card">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-bold">FoodExpress</p>
            <p className="text-xs text-muted-foreground">Partner Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/partner/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t p-4">
          {mounted && (
            <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {data?.data?.name?.charAt(0)?.toUpperCase() ?? "R"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{data?.data?.name || "Restaurant Owner"}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Restaurant Owner
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Logout confirmation dialog */}
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
                Partner Portal
              </p>
            </div>
          </div>

          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to sign out from the Partner Portal?
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

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;

