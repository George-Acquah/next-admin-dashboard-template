export interface _IDummyProjects extends _ITableSignature {
  _id: string;
  title: string;
  description: string;
  teamMembers: string[];
  isActive: boolean;
}

export const projectsData: _IDummyProjects[] = [
  {
    _id: "101",
    title: "Project A",
    description: "Building the next-gen platform.",
    teamMembers: ["Alice", "Bob", "Charlie"], // Array of strings
    isActive: true,
  },
  {
    _id: "102",
    title: "Project B",
    description: "Improving user experience.",
    teamMembers: ["David", "Eve"],
    isActive: false,
  },
  {
    _id: "103",
    title: "Project A",
    description: "Building the next-gen platform.",
    teamMembers: ["Alice", "Bob", "Charlie"], // Array of strings
    isActive: true,
  },
  {
    _id: "104",
    title: "Project B",
    description: "Improving user experience.",
    teamMembers: ["David", "Eve"],
    isActive: false,
  },
  {
    _id: "105",
    title: "Project A",
    description: "Building the next-gen platform.",
    teamMembers: ["Alice", "Bob", "Charlie"], // Array of strings
    isActive: true,
  },
  {
    _id: "106",
    title: "Project B",
    description: "Improving user experience.",
    teamMembers: ["David", "Eve"],
    isActive: false,
  },
  {
    _id: "107",
    title: "Project A",
    description: "Building the next-gen platform.",
    teamMembers: ["Alice", "Bob", "Charlie"], // Array of strings
    isActive: true,
  },
  {
    _id: "108",
    title: "Project B",
    description: "Improving user experience.",
    teamMembers: ["David", "Eve"],
    isActive: false,
  },
];
