export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  teamSize: number;
  postedDate: string;
}

export const jobOpenings: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Mumbai",
    type: "Full-time",
    experience: "5+ years",
    salary: "₹25L - ₹35L",
    description: "We are looking for a Senior Software Engineer to join our engineering team and help build the next generation of visa processing systems. You will be working on challenging problems at scale and mentoring junior engineers.",
    responsibilities: [
      "Design and implement scalable backend services",
      "Lead technical architecture discussions and decisions",
      "Mentor junior engineers and conduct code reviews",
      "Work closely with product and design teams",
      "Improve system performance and reliability"
    ],
    requirements: [
      "Bachelor\u2019s degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in Node.js, TypeScript, and React",
      "Experience with cloud services (AWS/GCP)",
      "Strong problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health insurance for you and family",
      "Annual learning budget",
      "Flexible work hours",
      "Remote work options",
      "Regular team events"
    ],
    teamSize: 12,
    postedDate: "March 1, 2024"
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Bangalore",
    type: "Full-time",
    experience: "4+ years",
    salary: "₹20L - ₹30L",
    description: "We are seeking an experienced Product Manager to drive our visa processing platform forward. You will work closely with engineering, design, and business teams to define and execute the product roadmap.",
    responsibilities: [
      "Define product strategy and roadmap",
      "Gather and analyze user feedback",
      "Work with engineering to deliver features",
      "Monitor product metrics and KPIs",
      "Conduct market research"
    ],
    requirements: [
      "Bachelor\u2019s degree in Business/Technology",
      "4+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication abilities",
      "Experience with agile methodologies"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Stock options",
      "Flexible work hours",
      "Professional development budget"
    ],
    teamSize: 8,
    postedDate: "March 5, 2024"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹15L - ₹25L",
    description: "Join our design team to create beautiful and intuitive user experiences for our visa application platform. You will work on complex workflows and make them simple and delightful for our users.",
    responsibilities: [
      "Design user interfaces for web and mobile",
      "Create user flows and wireframes",
      "Conduct user research and testing",
      "Collaborate with product and engineering",
      "Maintain design system"
    ],
    requirements: [
      "Degree in Design or related field",
      "3+ years of UI/UX design experience",
      "Strong portfolio of web/mobile projects",
      "Proficiency in Figma and design tools",
      "Experience with design systems"
    ],
    benefits: [
      "Competitive salary",
      "Remote work setup allowance",
      "Health insurance",
      "Learning budget",
      "Flexible hours"
    ],
    teamSize: 6,
    postedDate: "March 8, 2024"
  }
];