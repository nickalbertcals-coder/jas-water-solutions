export const company = {
  name: "JAS Water Solutions Inc.",
  shortName: "JAS Water Solutions",
  tagline: "Digitized Water Systems. Managed with Precision. Built for Sustainability.",
};

export const about = {
  paragraphs: [
    "JAS Water Solutions Inc. is a professional water utility operations company specializing in the Operation and Maintenance (O&M) of Level III Water Distribution Systems.",
    "We provide comprehensive, end-to-end management of potable water services — from daily distribution network operations and preventive maintenance to computerized meter reading, billing, and collection. Our structured approach ensures reliable, efficient, and financially sustainable water supply for the communities we serve.",
    "Our team is composed of experienced engineers, system operators, finance professionals, and customer service specialists with strong backgrounds in utility management, regulatory compliance, revenue assurance, and performance monitoring.",
    "Operations are anchored on digitized platforms, real-time monitoring systems, data-driven decision-making, and transparent KPI-based performance management — ensuring operational control, accountability, and measurable results.",
    "JAS Water Solutions Inc. integrates technical excellence with disciplined revenue management to deliver sustainable and professionally managed water utility services.",
  ],
};

export const vision =
  "To be a leading provider of technology-driven water utility operations, setting the benchmark in digitized billing systems, intelligent distribution management, and measurable reduction of Non-Revenue Water (NRW) in Level III water systems.";

export const mission =
  "To deliver reliable, efficient, and financially sustainable water distribution services through professional operation and maintenance, technology-driven solutions, and transparent revenue management — ensuring safe and continuous water supply for the communities we serve.";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  subItems?: string[];
};

export const services: Service[] = [
  {
    slug: "om-level-iii",
    title: "Operations & Maintenance (O&M) — Level III",
    summary:
      "Comprehensive management, operation, and maintenance of water utility systems.",
    description:
      "Comprehensive management, operation, and maintenance of water utility systems, ensuring operational efficiency, regulatory compliance, and sustainable service delivery.",
    image: "/images/photos/worker_tablet.jpg",
  },
  {
    slug: "bulk-water-supply",
    title: "Bulk Water Supply Solutions",
    summary:
      "Reliable bulk water sourcing, treatment, and distribution for districts and industry.",
    description:
      "Reliable bulk water sourcing, treatment, and distribution services for Water Districts, Local Government Units (LGUs), industrial clients, and communities.",
    image: "/images/photos/treatment_aerial.jpg",
  },
  {
    slug: "hydraulic-modeling",
    title: "Hydraulic Modeling & Infrastructure Engineering",
    summary:
      "Engineering services from feasibility studies to distribution network design.",
    description:
      "Specialized engineering services including hydraulic modeling, network analysis, system optimization, feasibility studies, and design of water supply and distribution infrastructure.",
    image: "/images/photos/blueprint_review.jpg",
  },
  {
    slug: "bulk-water-retail",
    title: "Bulk Water Retail Operations",
    summary: "Safe, quality-assured containerized water supply and logistics.",
    description:
      "Supply and distribution of safe potable water through 20-liter containerized water systems, supported by quality assurance and efficient logistics management.",
    image: "/images/photos/water_bottles.jpg",
  },
  {
    slug: "technical-consultancy",
    title: "Technical Consultancy & Digital Water Solutions",
    summary:
      "Advisory and digital transformation support across the utility value chain.",
    description: "Professional advisory and support services covering:",
    image: "/images/photos/digital_tech.jpg",
    subItems: [
      "Non-Revenue Water (NRW) Reduction Program",
      "Water Utility Billing Systems",
      "Digital Transformation and Smart Water Solutions",
      "Water Quality Monitoring and Consultancy",
      "Technical Capacity Building and Training",
      "Utility Performance Improvement Programs",
    ],
  },
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  profession: string;
  expertise: string[];
  image: string | null;
};

export const team: TeamMember[] = [
  {
    slug: "baldelovar",
    name: "Joel A. Baldelovar",
    role: "Chairman",
    profession: "Mass Communication",
    expertise: [
      "Water Policy & Governance",
      "Corporate Management",
      "Former Chairman, Cagayan de Oro City Water District",
      "Public Relations",
    ],
    image: "/images/team/baldelovar.jpg",
  },
  {
    slug: "masangcay",
    name: "Engr. Sol Oro M. Masangcay",
    role: "President",
    profession: "Hydraulic Engineer",
    expertise: [
      "Water supply, wastewater management and NRW reduction",
      "Utility performance improvement and wastewater treatment",
      "Feasibility studies, hydraulic modeling (EPANET) and system design",
      "International water utility projects (16 years in the Middle East and Asia)",
    ],
    image: "/images/team/masangcay.jpg",
  },
  {
    slug: "elago",
    name: "Arnold S. Elago, CPA",
    role: "Executive Vice President",
    profession: "Certified Public Accountant",
    expertise: [
      "Executive Leadership",
      "Marketing & Revenue Management",
      "Strategic Planning & Execution",
      "Waterworks System Operation",
      "Risk Management and Governance",
      "Corporate Finance",
    ],
    image: "/images/team/elago.jpg",
  },
  {
    slug: "bollozos",
    name: "Atty. Kenneth Andrew R. Bollozos",
    role: "Vice President — Legal Affairs",
    profession: "Lawyer & Electrical Engineer",
    expertise: ["Legal affairs", "Regulatory compliance", "Corporate governance"],
    image: "/images/team/bollozos.jpg",
  },
  {
    slug: "rejuso-phillip",
    name: "Engr. Phillip Arthur V. Rejuso",
    role: "Vice President — Operations",
    profession: "Chemical Engineer",
    expertise: [
      "Water treatment plant operations & process optimization",
      "Production efficiency, cost control & performance monitoring",
      "Plant equipment, maintenance & reliability management",
      "Water quality, chemical dosing & regulatory compliance",
    ],
    image: "/images/team/rejuso_phillip.jpg",
  },
  {
    slug: "rejuso-kristina",
    name: "Maria Kristina O. Rejuso, CPA",
    role: "Vice President — Finance",
    profession: "Certified Public Accountant",
    expertise: [
      "Corporate finance and treasury",
      "Administration management",
      "Financial modeling and analysis",
      "Utility & infrastructure finance",
      "Compliance, risk and performance management",
    ],
    image: "/images/team/rejuso_kristina.jpg",
  },
  {
    slug: "tito",
    name: "Joy N. Tito",
    role: "Vice President — Business Development",
    profession: "Business Development",
    expertise: [
      "Strategic partnership",
      "Commercial negotiation",
      "Project development",
      "Market expansion",
      "Business development & growth strategy",
    ],
    image: null,
  },
];

// TODO: Replace with verified company contact details.
export const contact = {
  email: "info@jaswatersolutions.com",
  phone: "+63 (000) 000 0000",
  location: "Philippines",
};

export const differentiators = [
  {
    title: "Digitized Platforms",
    description:
      "Real-time monitoring and computerized meter reading, billing, and collection built for accountability.",
  },
  {
    title: "KPI-Based Performance",
    description:
      "Transparent, data-driven performance management ensures measurable, auditable results.",
  },
  {
    title: "Experienced Team",
    description:
      "Engineers, operators, finance professionals, and customer service specialists with deep utility expertise.",
  },
  {
    title: "Revenue Assurance",
    description:
      "Disciplined revenue management and Non-Revenue Water reduction for financially sustainable utilities.",
  },
];
