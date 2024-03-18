import { ThemeToggle } from "@/components/ui/theme-toggle"
import Register from "@/components/login/register"

export default function Home() {
  return (
    <>
    <h1 className="text-3xl font-bold mx-auto max-w-sm mt-12 mb-12">V-Travel Login</h1>
    <div className="mx-auto max-w-sm mb-4"> <ThemeToggle/> </div>
    <Register />
    </>
  );
}