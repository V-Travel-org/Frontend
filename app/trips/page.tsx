import { ThemeToggle } from "@/components/ui/theme-toggle"
import CreateTrip from "@/components/trips/createTrip";

export default function trips() {
  return (
    <>
    <h1 className="text-3xl font-bold mx-auto max-w-sm mt-12 mb-12">V-Travel</h1>
    <div className="mx-auto max-w-sm mb-4"> <ThemeToggle/> </div>
    <h5 className="text-xl font-bold mx-auto max-w-sm mt-12 mb-12">You have signed in successfully !</h5>
    <CreateTrip />
    </>
  );
}