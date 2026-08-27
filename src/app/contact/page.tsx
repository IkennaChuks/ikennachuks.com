import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email, phone and LinkedIn for Ikenna Chuks Okolo, Senior Manager for Cloud, Data and AI Engineering at PwC Canada.",
};

export default function ContactPage() {
  return <Contact />;
}
