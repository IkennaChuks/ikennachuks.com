export const profile = {
  name: "Ikenna Chuks Okolo",
  credential: "MSc",
  initials: "IO",
  role: "Senior Manager, Cloud, Data & AI Engineering",
  company: "PwC Canada",
  location: "Edmonton, Alberta, Canada",
  tagline: "I build the data and AI platforms that enterprises bet on.",
  headline:
    "Snr Manager Cloud, Data & AI @ PwC | Ex-Googler | Agentic AI Engineer | Data Engineer | GCP, AWS, Azure & Databricks certified",
  email: "chuks2ikenna@gmail.com",
  phone: "+1 226 992 0440",
  phoneHref: "+12269920440",
  linkedin: "https://www.linkedin.com/in/ikenna-chuks-okolo-msc-99159a12b",
  linkedinLabel: "linkedin.com/in/ikenna-chuks-okolo",
} as const;

export const summary = [
  "Over a decade designing and deploying enterprise data estates across GCP, AWS and Azure. As a former Google senior engineer and now a PwC Senior Manager, I lead the migration of mission-critical workloads into the cloud with a focus on 99.99% reliability, security compliance and production-grade MLOps.",
  "I move fluently across real-time streaming, lakehouse architecture and infrastructure-as-code: Dataflow, Pub/Sub, Kinesis, Databricks, Terraform and Kubernetes, with deep roots in Python, Java, Scala and SQL. What I care about is the part most teams skip: turning messy, contested, high-volume data into systems that stakeholders actually trust.",
  "Today I lead cloud, data and AI engineering at PwC Canada, translating hard technical strategy into delivery that clears audit, scales, and holds up in production.",
] as const;

export const stats = [
  { value: "12+", label: "Years in data engineering" },
  { value: "3", label: "Hyperscalers, certified" },
  { value: "3+", label: "Years building at Google" },
  { value: "20+", label: "Professional certifications" },
] as const;

export const marqueeItems = [
  "BigQuery",
  "GCP Dataflow",
  "Pub/Sub",
  "Vertex AI",
  "Databricks",
  "Apache Spark",
  "Apache Beam",
  "Apache Airflow",
  "Terraform",
  "Kubernetes",
  "Azure Data Factory",
  "Azure Synapse",
  "AWS Glue",
  "AWS Kinesis",
  "Amazon Redshift",
  "Snowflake",
  "Python",
  "Scala",
  "Java",
  "SQL",
  "MLOps",
  "Agentic AI",
  "CI/CD",
] as const;

export const skillGroups = [
  {
    title: "Cloud",
    items: ["AWS", "GCP", "Azure"],
  },
  {
    title: "Data platforms",
    items: [
      "BigQuery",
      "Redshift",
      "Snowflake",
      "Azure Synapse",
      "Databricks",
      "Cloud SQL",
      "MS SQL",
      "Oracle",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    title: "Streaming and pipelines",
    items: [
      "Dataflow",
      "Pub/Sub",
      "Kinesis",
      "Kafka",
      "Azure Event Hubs",
      "Azure Data Factory",
      "AWS Glue",
      "Apache Beam",
      "Apache Airflow",
      "Spark",
      "Hadoop",
      "SSIS",
    ],
  },
  {
    title: "NoSQL and storage",
    items: ["MongoDB", "Cassandra", "Hive", "Redis", "Bigtable", "S3", "GCS", "ADLS Gen2"],
  },
  {
    title: "Engineering",
    items: ["Python", "Java", "Scala", "SQL", "Terraform", "Kubernetes", "CI/CD", "Microservices", "MLOps"],
  },
] as const;

export type Capability = {
  title: string;
  icon: "cloud" | "activity" | "sparkles" | "database" | "chart" | "users";
  body: string;
  tags: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    title: "Cloud Data Platforms",
    icon: "cloud",
    body: "Architecture and build-out across all three hyperscalers: lakehouse foundations, governed warehouses, and the plumbing that keeps them cheap and fast.",
    tags: ["GCP", "AWS", "Azure", "Databricks"],
  },
  {
    title: "Streaming & Real-Time",
    icon: "activity",
    body: "Event-driven pipelines that stay correct under load, from Pub/Sub, Kinesis and Event Hubs through to sub-second analytics and alerting.",
    tags: ["Dataflow", "Pub/Sub", "Kinesis", "Event Hubs"],
  },
  {
    title: "Agentic AI & MLOps",
    icon: "sparkles",
    body: "Production ML and LLM systems on enterprise data: feature stores, Vertex AI endpoints, evaluation, guardrails and the CI/CD that makes them shippable.",
    tags: ["Vertex AI", "Agents", "RAG", "MLOps"],
  },
  {
    title: "Data Modeling & Warehousing",
    icon: "database",
    body: "Dimensional and lakehouse modeling, warehouse migrations, and complex ETL structures built to survive a decade of changing requirements.",
    tags: ["BigQuery", "Redshift", "Synapse", "Snowflake"],
  },
  {
    title: "Platform Engineering",
    icon: "chart",
    body: "Infrastructure-as-code, CI/CD and cost control with Terraform, Kubernetes, Cloud Build and Composer, so platforms stay auditable and cheap in production.",
    tags: ["Terraform", "Kubernetes", "CI/CD", "FinOps"],
  },
  {
    title: "Leadership & Delivery",
    icon: "users",
    body: "Building and mentoring engineering teams, owning technical oversight of partners, and acting as the bridge between C-suite stakeholders and delivery.",
    tags: ["Team building", "Mentoring", "Stakeholders", "Strategy"],
  },
];

export type Role = {
  title: string;
  period: string;
  location?: string;
};

export type Position = {
  company: string;
  span: string;
  current?: boolean;
  roles: readonly Role[];
  highlights: readonly string[];
};

export const experience: readonly Position[] = [
  {
    company: "PwC Canada",
    span: "2026 - Present",
    current: true,
    roles: [
      {
        title: "Senior Manager, Cloud, Data & AI Engineering",
        period: "March 2026 - Present",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Spearhead end-to-end cloud, data and AI strategy for enterprise clients, aligning architecture with business objectives.",
      "Lead engineering teams designing AI/ML models and data pipelines on Azure, AWS and GCP.",
      "Advise senior leadership and clients, turning cloud and data concepts into ROI-driven roadmaps.",
      "Raise data maturity through governance frameworks, CI/CD and cost-effective cloud management, while mentoring engineers and architects.",
    ],
  },
  {
    company: "Life360",
    span: "2026",
    roles: [
      {
        title: "Principal Data Engineer",
        period: "January 2026 - March 2026",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Designed large-scale streaming pipelines for high-volume location and event data on Kinesis, Kafka and Spark-style architectures, with low latency and strong data-quality guarantees.",
      "Owned incident investigation and SLA-driven monitoring to restore production data flows quickly.",
      "Enforced data contracts with external partners and built Python and SQL streaming transformations into analytics-ready lakes.",
      "Orchestrated Airflow DAGs covering ingestion, validation and reporting against defined SLAs.",
    ],
  },
  {
    company: "MedWatch Technologies",
    span: "2025 - 2026",
    roles: [
      {
        title: "Manager, Data Engineering",
        period: "January 2025 - February 2026",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Set the architectural vision for a HIPAA-compliant GCP lakehouse unifying wearable biosensing telemetry with clinical EHR data.",
      "Directed Pub/Sub and Dataflow streaming for multimodal biosignals with sub-second processing for real-time metabolic alerts.",
      "Built the MLOps foundation for non-invasive glucose models: feature stores, quality checks and Vertex AI CI/CD.",
      "Instituted zero-trust security and encryption across GCP, with HIPAA, GDPR and FDA-ready data provenance, while mentoring cross-functional engineering squads.",
    ],
  },
  {
    company: "Deloitte",
    span: "2025 - 2026",
    roles: [
      {
        title: "Senior Data Engineer",
        period: "November 2025 - February 2026",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Architected GCP pipelines for a financial-services client using Dataflow and Pub/Sub for high-throughput real-time and batch processing.",
      "Integrated Vertex AI for a centralized model registry and real-time prediction endpoints.",
      "Built Cloud Build CI/CD for Cloud Functions, scheduled with Cloud Scheduler, and Cloud Composer DAGs for auditable orchestration.",
    ],
  },
  {
    company: "ATB Financial",
    span: "2025",
    roles: [
      {
        title: "Senior Data Engineer",
        period: "February 2025 - August 2025",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Built batch and streaming ETL on Apache Beam and Dataflow, landing Pub/Sub financial transactions in BigQuery for near real-time reporting.",
      "Automated Dev-Test-Prod releases with Cloud Build, Terraform and GitHub CI/CD.",
      "Optimized BigQuery schemas and queries, with Cloud Monitoring that held 99.9% data availability.",
      "Shipped a cost-optimization pipeline over GCS and BigQuery that cut storage and analytics spend by more than 35%.",
    ],
  },
  {
    company: "Government of Alberta",
    span: "2024 - 2025",
    roles: [
      {
        title: "Software Data Engineer",
        period: "December 2024 - February 2025",
        location: "Edmonton, Alberta",
      },
    ],
    highlights: [
      "Implemented schema validation, outlier detection and spatial joins that cut downstream reporting defects against Alberta's TIER framework.",
      "Authored developer documentation and a TDD playbook adopted by three other government analytics teams, shortening analyst onboarding by 25%.",
    ],
  },
  {
    company: "Google",
    span: "2021 - 2024",
    roles: [
      {
        title: "Data Engineering Lead",
        period: "February 2023 - December 2024",
        location: "Waterloo, Canada",
      },
      {
        title: "Senior Data Engineer",
        period: "September 2021 - January 2023",
        location: "Warsaw, Poland",
      },
    ],
    highlights: [
      "Three years and four months at Google across Warsaw and Waterloo. Named Best Engineer, Warsaw in 2024, with more than 25 peer and leadership awards.",
      "As Data Engineering Lead, directed senior engineers on GCP data platforms and oversaw multi-million-dollar cloud migrations for Fortune 500 customers into BigQuery and Cloud Storage lakehouses.",
      "Designed Dataflow and Pub/Sub pipelines processing billions of daily events, and optimized BigQuery partitioning, clustering and slot management for latency and cost.",
      "Standardized Terraform and Cloud Composer blueprints with data quality, observability and RBAC. Built a GCS and BigQuery inventory tool that helped decommission unused resources and cut GCP spend by 30% in three months.",
    ],
  },
  {
    company: "TradeDepot",
    span: "2021",
    roles: [
      {
        title: "Engineering Manager, Data Analytics",
        period: "January 2021 - September 2021",
      },
    ],
    highlights: [
      "Led AWS-native ETL on Glue, Lambda and Step Functions processing over 2 TB a day, lifting analytics availability by 40%.",
      "Built S3 data lakes with Parquet, partitioning and Glue Data Catalog for Athena and Redshift Spectrum.",
      "Automated ingestion on Airflow (MWAA), cutting manual intervention by 90%, with KMS, IAM RBAC and VPC peering across accounts.",
      "Migrated transactional data into Redshift and shipped a Kinesis fraud-detection pipeline that reduced fraud losses by more than 40% in the first six months.",
    ],
  },
  {
    company: "BetKing",
    span: "2019 - 2021",
    roles: [
      {
        title: "Manager, Data Engineering",
        period: "July 2020 - January 2021",
      },
      {
        title: "Data Engineer",
        period: "August 2019 - May 2020",
        location: "London Area, United Kingdom",
      },
    ],
    highlights: [
      "Directed Azure Data Factory and Synapse pipelines unifying SQL Server, Blob Storage and REST APIs for executive reporting.",
      "Built ADLS Gen2 with Delta Lake, plus Event Hubs and Stream Analytics for sub-second operational alerting.",
      "Migrated the estate from on-prem SQL Server to Azure Data Lake and Azure SQL DW, cutting downtime 85%, accelerating BI readiness 70% and reducing infrastructure cost 30%.",
      "Automated ETL and ML delivery with Azure DevOps, Databricks autoscaling and PySpark streaming, with Airflow DAGs and Key Vault, Private Endpoints and RBAC.",
    ],
  },
  {
    company: "Sterling Bank Plc",
    span: "2017 - 2019",
    roles: [
      {
        title: "Data Engineer",
        period: "July 2018 - August 2019",
      },
      {
        title: "Business Intelligence Developer",
        period: "January 2018 - July 2018",
      },
      {
        title: "Application Support Engineer",
        period: "February 2017 - December 2017",
      },
    ],
    highlights: [
      "Led the migration of the on-prem warehouse to Azure with Databricks and SSIS, improving analytics availability by 90% and enabling self-service reporting.",
      "Helped the AML team build fraud and anti-money-laundering detection systems.",
      "Managed as much as 5 TB of BI data and shipped company-wide intelligence-sharing dashboards on the Azure stack.",
      "Supported internet and mobile banking platforms and more than doubled e-channel onboarding through improved reliability.",
    ],
  },
  {
    company: "CrispTV",
    span: "2014 - 2017",
    roles: [
      {
        title: "Data Analyst",
        period: "November 2014 - January 2017",
      },
    ],
    highlights: [
      "Built SSIS packages loading flat files, XML and Oracle into Azure SQL Data Warehouse, with error handling and logging.",
      "Designed Power BI models, visuals and stakeholder dashboards, translating reporting needs into technical specifications.",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: readonly Certification[] = [
  { name: "Google Cloud Certified Professional Cloud Architect", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Professional Data Engineer", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Professional Cloud Developer", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Professional Cloud DevOps Engineer", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Professional Cloud Database Engineer", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Associate Cloud Engineer", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Cloud Digital Leader", issuer: "Google Cloud" },
  { name: "Google Cloud Certified Generative AI Leader", issuer: "Google Cloud" },
  { name: "AWS Certified Data Engineer", issuer: "Amazon Web Services" },
  { name: "AWS Certified DevOps Engineer - Professional", issuer: "Amazon Web Services" },
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
  { name: "AWS Certified Developer", issuer: "Amazon Web Services" },
  { name: "AWS Certified Database - Specialty", issuer: "Amazon Web Services" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "MCSE: Data Management and Analytics", issuer: "Microsoft" },
  { name: "MCSA: SQL 2016 Database Development", issuer: "Microsoft" },
  { name: "Azure Data Fundamentals", issuer: "Microsoft" },
  { name: "Azure Fundamentals", issuer: "Microsoft" },
  { name: "Databricks Certified Data Engineer", issuer: "Databricks" },
  { name: "Neo4j Certified Professional", issuer: "Neo4j" },
  { name: "Big Data for Data Engineering", issuer: "Simplilearn" },
  { name: "Data Engineering with Hadoop", issuer: "Simplilearn" },
];

export const education = [
  {
    school: "Data ScienceTech Institute",
    qualification: "Applied MSc, Data Engineering for Artificial Intelligence",
    place: "Paris, France",
    period: "Completed March 2024",
  },
  {
    school: "Federal University of Technology, Owerri",
    qualification: "BEng, Electronics and Computer Engineering",
    place: "Nigeria",
    period: "Completed October 2014",
  },
] as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise" },
  { href: "/journey", label: "Journey" },
  { href: "/twin", label: "Digital Twin" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quick-resume", label: "Quick Resume" },
  { href: "/contact", label: "Contact" },
] as const;
