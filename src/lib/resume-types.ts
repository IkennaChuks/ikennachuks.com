export function stripAiPunctuation(raw: string) {
  return raw
    .replace(/[\u2014\u2015]/g, ", ")
    .replace(/[\u2012\u2013\u2011\u2212]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u00a0/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export type ResumeRole = {
  title: string;
  period: string;
  location?: string;
};

export type ResumePosition = {
  company: string;
  span: string;
  roles: ResumeRole[];
  bullets: string[];
};

export type ResumeSkillGroup = {
  label: string;
  items: string[];
};

export type ResumeEducation = {
  qualification: string;
  school: string;
  place: string;
  period: string;
};

export type ResumeCertification = {
  name: string;
  issuer: string;
};

export type ResumeCheckItem = {
  item: string;
  covered: boolean;
  evidence?: string;
};

export type ResumeDraft = {
  name: string;
  credential: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinLabel: string;
  targetRole: string;
  companyHint: string;
  headline: string;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumePosition[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  checklist: ResumeCheckItem[];
  notes: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  const raw = typeof value === "string" ? value.trim() : fallback;
  return stripAiPunctuation(raw);
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter((item) => item !== "");
}

function linkedinLabelFrom(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
}

export function parseResumeDraft(value: unknown): ResumeDraft | null {
  if (!isRecord(value)) return null;

  const identity = isRecord(value.identity) ? value.identity : value;

  const skills = Array.isArray(value.skills)
    ? value.skills.flatMap((group) => {
        if (!isRecord(group)) return [];
        const items = asStringList(group.items);
        const label = asString(group.label);
        if (label === "" || items.length === 0) return [];
        return [{ label, items }];
      })
    : [];

  const experience = Array.isArray(value.experience)
    ? value.experience.flatMap((position) => {
        if (!isRecord(position)) return [];
        const company = asString(position.company);
        const bullets = asStringList(position.bullets);
        if (company === "" || bullets.length === 0) return [];
        const roles = Array.isArray(position.roles)
          ? position.roles.flatMap((role) => {
              if (!isRecord(role)) return [];
              const title = asString(role.title);
              const period = asString(role.period);
              if (title === "" || period === "") return [];
              const location = asString(role.location);
              return location
                ? [{ title, period, location }]
                : [{ title, period }];
            })
          : [];
        return [
          {
            company,
            span: asString(position.span),
            roles,
            bullets,
          },
        ];
      })
    : [];

  const education = Array.isArray(value.education)
    ? value.education.flatMap((item) => {
        if (!isRecord(item)) return [];
        const qualification = asString(item.qualification);
        const school = asString(item.school);
        if (qualification === "" || school === "") return [];
        return [
          {
            qualification,
            school,
            place: asString(item.place),
            period: asString(item.period),
          },
        ];
      })
    : [];

  const certifications = Array.isArray(value.certifications)
    ? value.certifications.flatMap((item) => {
        if (!isRecord(item)) return [];
        const name = asString(item.name);
        const issuer = asString(item.issuer);
        if (name === "") return [];
        return [{ name, issuer }];
      })
    : [];

  const checklist = Array.isArray(value.checklist)
    ? value.checklist.flatMap((item) => {
        if (!isRecord(item)) return [];
        const label = asString(item.item);
        if (label === "") return [];
        const evidence = asString(item.evidence);
        return [
          {
            item: label,
            covered: item.covered === true,
            ...(evidence ? { evidence } : {}),
          },
        ];
      })
    : [];

  const summary = asString(value.summary);
  const name = asString(identity.name);
  if (summary === "" || experience.length === 0 || name === "") return null;

  const linkedin = asString(identity.linkedin);

  return {
    name,
    credential: asString(identity.credential),
    location: asString(identity.location),
    email: asString(identity.email),
    phone: asString(identity.phone),
    linkedin,
    linkedinLabel: asString(identity.linkedinLabel) || linkedinLabelFrom(linkedin),
    targetRole: asString(value.targetRole, "Target role"),
    companyHint: asString(value.companyHint),
    headline: asString(value.headline),
    summary,
    skills,
    experience,
    education,
    certifications,
    checklist,
    notes: asString(value.notes),
  };
}
