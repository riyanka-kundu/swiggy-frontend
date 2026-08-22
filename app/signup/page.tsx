import RegisterPage from "@/components/auth/register";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow">
        <RegisterPage />
      </div>
    </main>
  );
}
