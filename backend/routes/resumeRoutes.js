const express = require("express");
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImages } = require("../controllers/uploadImages");


const router = express.Router();

  // ✅ Role-skill dictionary
const roleSkillDictionary = {
  "web developer": ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Node.js", "MongoDB", "Git", "Responsive Design"],
  "frontend developer": ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Bootstrap"],
  "backend developer": ["Node.js", "Express.js", "Java", "Spring Boot", "Python", "Django", "Flask", "SQL", "MongoDB"],
  "full stack developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Git", "SQL"],
  "app developer": ["Java", "Kotlin", "Swift", "React Native", "Flutter", "Firebase"],
  "android developer": ["Java", "Kotlin", "Android Studio", "XML", "Firebase"],
  "ios developer": ["Swift", "Objective-C", "Xcode", "SwiftUI"],
  "ml developer": ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Matplotlib", "Deep Learning"],
  "ml engineer": ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "NLP"],
  "machine learning engineer": ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Deep Learning", "Model Deployment"],
  "ai engineer": ["Python", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch"],
  "data engineer": ["SQL", "Python", "ETL", "Apache Spark", "Airflow", "AWS", "Data Warehousing"],
  "data scientist": ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn", "Deep Learning", "TensorFlow", "PyTorch"],
  "devops engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform", "Jenkins"],
  "cloud engineer": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Linux"],
  "cybersecurity analyst": ["Network Security", "Penetration Testing", "Firewalls", "IDS/IPS", "Encryption"],
  "blockchain developer": ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Truffle", "Ganache"],
  "game developer": ["Unity", "C#", "Unreal Engine", "C++", "Game Physics"],
  "ui ux designer": ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research"],
  "data analyst": ["Excel", "SQL", "Data Visualization", "Power BI", "Tableau", "Requirement Gathering"]
};


// ✅ Resume CRUD routes
router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);
router.post("/:id/upload-images", protect, uploadResumeImages);

// ✅ SkillGap Analyzer route
router.post("/skillgap", protect, (req, res) => {
  const { jobDescription, resumeSkills } = req.body;

  if (!jobDescription || !Array.isArray(resumeSkills) || resumeSkills.length === 0) {
    return res.status(400).json({
      error: "Please provide a job description and at least one skill in your resume.",
    });
  }

  const jdLower = jobDescription.toLowerCase();

  let matchedRole = Object.keys(roleSkillDictionary).find(role =>
    jdLower.includes(role)
  );

  if (!matchedRole) {
    if (jdLower.includes("ml") || jdLower.includes("machine learning")) matchedRole = "ml engineer";
    else if (jdLower.includes("ai")) matchedRole = "ai engineer";
  }

  if (!matchedRole) {
    return res.json({
      missingSkills: [],
      matchPercentage: 0,
      message: "No matching role found in our dictionary. Please update your input or contact admin to expand roles."
    });
  }

  const jdSkills = roleSkillDictionary[matchedRole] || [];
  const missingSkills = jdSkills.filter(skill =>
    !resumeSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
  );

  const matchPercentage = jdSkills.length === 0 ? 0 :
    Math.round(((jdSkills.length - missingSkills.length) / jdSkills.length) * 100);

  res.json({
    matchedRole,
    missingSkills,
    matchPercentage
  });
});

// ✅ GET roles list route (move OUTSIDE skillgap route)
router.get("/roles/list", (req, res) => {
  const roles = Object.keys(roleSkillDictionary);
  res.json({ roles });
});




module.exports = router;