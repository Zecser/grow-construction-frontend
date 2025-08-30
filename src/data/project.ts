// --- Project Type ---
export interface Project {
  id: string;
  projectName: string;
  location: string;
  status: 'Under Construction' | 'Planning' | 'Completed';
  date: string;
  category: 'recent' | 'upcoming' | 'completed';
  clientName: string;
  constructionDetails: string[];
  amenities: string[];
  contactDetails: string;
  startedDate: string;
  estimatedCompletionTime: string;
  currentStatus: number; // %
  projectPlanUrl: string;
  images: string[];
}

// --- Mock Database ---
export const allProjects: Project[] = [
  // ================= RECENT PROJECTS =================
  {
    id: "1001",
    projectName: "Residential Projects",
    location: "Kochi, Kerala",
    status: "Under Construction",
    date: "June 16, 2025",
    category: "recent",
    clientName: "Mr. Anand Verma",
    constructionDetails: ["Tower A (G+8 Floors)", "2 & 3 BHK Options"],
    amenities: ["Clubhouse", "Play Area"],
    contactDetails: "+91 99999 88888, anand.v@email.com",
    startedDate: "January 2025",
    estimatedCompletionTime: "December 2026",
    currentStatus: 40,
    projectPlanUrl: "/downloads/plan-1001.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1002",
    projectName: "Residential Projects",
    location: "Kozhikode, Kerala",
    status: "Under Construction",
    date: "July 2, 2025",
    category: "recent",
    clientName: "Mrs. Kavya Nair",
    constructionDetails: ["High-rise Tower (G+12 Floors)", "Luxury 3 BHK"],
    amenities: ["Swimming Pool", "Gym"],
    contactDetails: "+91 88888 77777, kavya.n@email.com",
    startedDate: "February 2025",
    estimatedCompletionTime: "January 2027",
    currentStatus: 35,
    projectPlanUrl: "/downloads/plan-1002.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1003",
    projectName: "Commercial Hub",
    location: "Kochi, Kerala",
    status: "Under Construction",
    date: "July 21, 2025",
    category: "recent",
    clientName: "Mr. Suresh Balan",
    constructionDetails: ["IT Office Complex", "Retail Spaces"],
    amenities: ["Parking", "Food Court"],
    contactDetails: "+91 77777 66666, suresh.b@email.com",
    startedDate: "March 2025",
    estimatedCompletionTime: "June 2027",
    currentStatus: 25,
    projectPlanUrl: "/downloads/plan-1003.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1004",
    projectName: "Industrial Facility",
    location: "Kannur, Kerala",
    status: "Under Construction",
    date: "August 4, 2025",
    category: "recent",
    clientName: "Mr. Ramesh Iyer",
    constructionDetails: ["Manufacturing Unit", "Warehouse Block"],
    amenities: ["Logistics Access", "Power Backup"],
    contactDetails: "+91 66666 55555, ramesh.i@email.com",
    startedDate: "April 2025",
    estimatedCompletionTime: "July 2027",
    currentStatus: 20,
    projectPlanUrl: "/downloads/plan-1004.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },

  // ================= UPCOMING PROJECTS =================
  {
    id: "1005",
    projectName: "Residential Projects",
    location: "Kochi, Kerala",
    status: "Planning",
    date: "June 4, 2025",
    category: "upcoming",
    clientName: "Ms. Priya Singh",
    constructionDetails: ["Gated Community Villas", "4 BHK Layouts"],
    amenities: ["Private Gardens", "24/7 Security"],
    contactDetails: "+91 77777 66666, priya.s@email.com",
    startedDate: "August 2025",
    estimatedCompletionTime: "August 2027",
    currentStatus: 5,
    projectPlanUrl: "/downloads/plan-1005.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1006",
    projectName: "Commercial Hub",
    location: "Kozhikode, Kerala",
    status: "Planning",
    date: "July 2, 2025",
    category: "upcoming",
    clientName: "Mr. Vivek Krishnan",
    constructionDetails: ["Business Towers", "Conference Facilities"],
    amenities: ["Parking", "Cafeteria"],
    contactDetails: "+91 99999 55555, vivek.k@email.com",
    startedDate: "September 2025",
    estimatedCompletionTime: "September 2027",
    currentStatus: 3,
    projectPlanUrl: "/downloads/plan-1006.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1007",
    projectName: "Commercial Hub",
    location: "Kochi, Kerala",
    status: "Planning",
    date: "July 21, 2025",
    category: "upcoming",
    clientName: "Mrs. Sneha Pillai",
    constructionDetails: ["Mall + Office Space", "Entertainment Zone"],
    amenities: ["Cinema", "Parking", "Food Court"],
    contactDetails: "+91 88888 44444, sneha.p@email.com",
    startedDate: "October 2025",
    estimatedCompletionTime: "November 2027",
    currentStatus: 2,
    projectPlanUrl: "/downloads/plan-1007.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1008",
    projectName: "Industrial Facility",
    location: "Kannur, Kerala",
    status: "Planning",
    date: "August 2, 2025",
    category: "upcoming",
    clientName: "Mr. Rohit Sharma",
    constructionDetails: ["Textile Unit", "Storage Blocks"],
    amenities: ["Transport Access", "Power Supply"],
    contactDetails: "+91 55555 33333, rohit.s@email.com",
    startedDate: "December 2025",
    estimatedCompletionTime: "December 2027",
    currentStatus: 1,
    projectPlanUrl: "/downloads/plan-1008.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },

  // ================= COMPLETED PROJECTS =================
  {
    id: "1009",
    projectName: "Residential Projects",
    location: "Kochi, Kerala",
    status: "Completed",
    date: "May 16, 2025",
    category: "completed",
    clientName: "Mr. Arjun Menon",
    constructionDetails: ["2 Residential Towers (G+12 Floors)", "3 & 4 BHK Apartments"],
    amenities: ["Swimming Pool", "Gym", "Parking", "Landscaped Gardens"],
    contactDetails: "+91 98765 43210, rahul@abccomstructions.com",
    startedDate: "March 2023",
    estimatedCompletionTime: "December 2026",
    currentStatus: 100,
    projectPlanUrl: "/downloads/plan-1009.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1010",
    projectName: "Residential Projects",
    location: "Kozhikode, Kerala",
    status: "Completed",
    date: "May 20, 2025",
    category: "completed",
    clientName: "Mrs. Neeta Sreedhar",
    constructionDetails: ["Luxury Apartments", "Sky Lounge"],
    amenities: ["Clubhouse", "Swimming Pool"],
    contactDetails: "+91 66666 22222, neeta.s@email.com",
    startedDate: "January 2023",
    estimatedCompletionTime: "April 2025",
    currentStatus: 100,
    projectPlanUrl: "/downloads/plan-1010.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1011",
    projectName: "Commercial Hub",
    location: "Thrissur, Kerala",
    status: "Completed",
    date: "May 29, 2025",
    category: "completed",
    clientName: "Mr. Manoj Varrier",
    constructionDetails: ["Shopping Mall", "Corporate Offices"],
    amenities: ["Food Court", "Multiplex"],
    contactDetails: "+91 77777 11111, manoj.v@email.com",
    startedDate: "February 2022",
    estimatedCompletionTime: "May 2025",
    currentStatus: 100,
    projectPlanUrl: "/downloads/plan-1011.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
  {
    id: "1012",
    projectName: "Industrial Facility",
    location: "Kannur, Kerala",
    status: "Completed",
    date: "June 2, 2025",
    category: "completed",
    clientName: "Mr. Deepak Rao",
    constructionDetails: ["Steel Plant", "Logistics Yard"],
    amenities: ["Dedicated Parking", "24/7 Power Supply"],
    contactDetails: "+91 55555 22222, deepak.r@email.com",
    startedDate: "March 2022",
    estimatedCompletionTime: "June 2025",
    currentStatus: 100,
    projectPlanUrl: "/downloads/plan-1012.pdf",
    images: ["/images/w1.png", "/images/w2.png", "/images/w3.png"]
  },
];
