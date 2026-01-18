const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @desc   Create a new resume
// @route  POST /api/resumes
// @access Private
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [""],
    };

    

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: "Failed to create resume", error: error.message });
  }
};

// @desc   Get all resumes for logged-in user
// @route  GET /api/resumes
// @access Private
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ UpdatedAt: -1 });

    
    res.json(resumes); // ✅ Send the resumes here
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc   Get single resume by ID
// @route  GET /api/resumes/:id
// @access Private
const getResumeById = async (req, res) => {
  try {
    // Add logic here
    const resume = await Resume.findById({ _id: req.params.id, userId: req.user._id });

    if(!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a resume
// @route  PUT /api/resumes/:id
// @access Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    // Merge updates from req.body into existing resume
    Object.assign(resume, req.body);

    // Save updated resume
    const savedResume = await resume.save();

    res.json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update resume", error: error.message });
  }
};


// @desc   Delete a resume
// @route  DELETE /api/resumes/:id
// @access Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id, 
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    // Delete the resume
    const uploadsFolder = path.join(__dirname, "..", "uploads");

    // Optional: Build base URL if needed
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Delete thumbnail image if exists
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail))  fs.unlinkSync(oldThumbnail);
    }

    // Delete profile image if exists
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    // Delete the resume document
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
