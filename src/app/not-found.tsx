import { ArrowLeft } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-32">
      <p className="kicker">Error 404</p>
      <h1 className="display-lg mt-5 max-w-2xl text-text">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        The link may be out of date. Everything worth reading is on the home page.
      </p>
      <div className="mt-10">
        <ActionLink href="/" variant="signal">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back home
        </ActionLink>
      </div>
    </section>
  );
}
