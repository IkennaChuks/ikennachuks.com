import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/profile";
import { Reveal } from "./ui/reveal";
import { ActionLink } from "./ui/action-link";
import { LinkedInIcon } from "./ui/icons";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-y relative scroll-mt-20">
      <div className="shell">
        <div className="panel relative overflow-hidden p-8 sm:p-14 lg:p-20">
          <div
            aria-hidden
            className="absolute -top-40 -right-24 h-80 w-80 rounded-full bg-ember/14 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-signal/16 blur-[120px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="kicker text-signal/80">07</span>
                  <span className="h-px w-8 bg-signal/40" />
                  <span className="kicker">Contact</span>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display-lg mt-5 text-text">
                  Got a data or AI problem worth solving?
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  I take on a small number of advisory conversations, platform reviews
                  and speaking engagements each year. If you are rebuilding a data
                  foundation or putting agentic AI into production, get in touch.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 flex items-start gap-2.5 font-mono text-[0.62rem] tracking-[0.16em] text-dim uppercase">
                  <span className="animate-pulse-dot mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  Mountain Time · Replies within two days
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ActionLink href={`mailto:${profile.email}`} variant="signal">
                    <Mail className="h-3.5 w-3.5" />
                    Send an email
                  </ActionLink>
                  <ActionLink
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5" />
                    Connect on LinkedIn
                  </ActionLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <ul className="space-y-px bg-line">
                {channels.map((channel, i) => {
                  const Icon = channel.icon;
                  const content = (
                    <div className="group flex items-center gap-4 bg-card px-5 py-4 transition-colors duration-500 hover:bg-tint">
                      <Icon
                        className="h-4 w-4 shrink-0 text-dim transition-colors duration-500 group-hover:text-signal"
                        strokeWidth={1.7}
                      />
                      <div className="min-w-0">
                        <p className="kicker">{channel.label}</p>
                        <p className="mt-1 truncate text-sm text-text">
                          {channel.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <Reveal as="li" key={channel.label} delay={i * 0.05}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                          className="block"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
