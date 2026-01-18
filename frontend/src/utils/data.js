import TEMPLATE_ONE_IMG from '../assets/template-one.png';
import TEMPLATE_TWO_IMG from '../assets/template-two.png';
import TEMPLATE_THREE_IMG from '../assets/template-three.png';

export const resumeTemplates = [
  {
    id: '01',
    thumbnailImg: TEMPLATE_ONE_IMG,
    templateCode: '01', // ✅ use this for matching in RenderResume
    colorPaletteCode: 'themeOne',
  },
  {
    id: '02',
    thumbnailImg: TEMPLATE_TWO_IMG,
    templateCode: '02',
    colorPaletteCode: 'themeTwo',
  },
  {
    id: '03',
    thumbnailImg: TEMPLATE_THREE_IMG,
    templateCode: '03',
    colorPaletteCode: 'themeThree',
  }
];


export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8BD", "#4A5565"],
    ["#E9FBFF", "#B4EEF7", "#93E2DA", "#2CA9A0", "#3DC45A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2FB", "#8579D1", "#B44B5C"],
    ["#FAFAFF", "#F0F0FC", "#ADFDF7", "#3399FF", "#545C31"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#A5A5A5"],
    ["#F8FAFB", "#E4E7EB", "#CBD5E0", "#F7F9CF5", "#2D3748"],
    ["#4FFFD7", "#D3FDF2", "#B0E9D4", "#34C79D", "#3B4C48"],
    ["#FFF7F0", "#FFE6D9", "#FFDBAA", "#FF9561", "#4C4743"],
    ["#CFF9CF", "#E3F0F9", "#C0DDEE", "#6C6ACF", "#46455E"],
    ["#FFEFD6", "#F4D7A7", "#FFD8A0", "#FFDD00", "#57534E"],
    ["#E8CCFF", "#C8B0FF", "#99E0FF", "#00B7A7", "#2B3342"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#8AD2F4", "#1E88E5", "#D047A1"]
  ]
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven developer with 6+ years of experience building full-stack web applications."
  },
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "#12 Anywhere, Any City, Any Country",
    linkedin: "https://linkedin.com/timetoprogram",
    github: "https://github.com/timetoprogram",
    website: "https://timetoprogram.com"
  },
  workExperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-04",
      description:
        "Leading the frontend team to build scalable enterprise applications using React."
    },
    {
      company: "Coding Dev",
      role: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-02",
      description:
        "Worked on cross-functional teams developing full-stack solutions with React, Node.js, and MongoDB."
    },
    {
      company: "Startup Company",
      role: "Junior Web Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Built responsive websites for startups and small businesses. Maintained legacy codebases."
    }
  ],
  education: [
    {
      degree: "M.Sc. Software Engineering",
      institution: "Tech University",
      startDate: "2021-08",
      endDate: "2023-06"
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "State University",
      startDate: "2017-08",
      endDate: "2021-05"
    },
    {
      degree: "High School Diploma",
      institution: "Central High School",
      startDate: "2015-06",
      endDate: "2017-05"
    }
  ],
  skills: [
    { name: "JavaScript", progress: 95 },
    { name: "React", progress: 90 },
    { name: "Node.js", progress: 85 },
    { name: "TypeScript", progress: 80 },
    { name: "MongoDB", progress: 75 }
  ],
  projects: [
    {
      title: "Project Manager App",
      description:
        "A task and team management app built with MERN stack. Includes user roles, real-time updates.",
      github: "https://github.com/timetoprogram/project-manager-app"
    },
    {
      title: "E-Commerce Platform",
      description:
        "An e-commerce site built with Next.js and Stripe integration. Supports cart, orders, payments.",
      liveDemo: "https://ecommerce-demo.timetoprogram.com"
    },
    {
      title: "Blog CMS",
      description:
        "A custom CMS for blogging using Express and React. Includes WYSIWYG editor, media upload, and theme settings.",
      github: "https://github.com/timetoprogram/blog_cms",
      liveDemo: "https://blogcms.timetoprogram.dev"
    }
  ],
  certifications: [
    {
      title: "Full Stack Web Developer",
      issuer: "Udemy",
      year: "2023"
    },
    {
      title: "React Advanced Certification",
      issuer: "Coursera",
      year: "2022"
    }
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 70 },
    { name: "French", progress: 40 }
  ],
  interests: ["Reading", "Open Source Contribution", "Hiking"]
};
