import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleInput from './Inputs/TitleInput';
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import StepProgress from './StepProgress';
import ProfileInfoForm from '../pages/ResumeUpdate/Forms/ProfileInfoForm';
import ContactInfoForm from '../pages/ResumeUpdate/Forms/ContactInfoForm';
import WorkExperienceForm from '../pages/ResumeUpdate/Forms/WorkExperienceForm';
import EducationDetailsForm from '../pages/ResumeUpdate/Forms/EducationDetailsForm';
import SkillsInfoForm from '../pages/ResumeUpdate/Forms/SkillsInfoForm';
import ProjectDetailForm from '../pages/ResumeUpdate/Forms/ProjectDetailForm';
import CertificationInfoForm from '../pages/ResumeUpdate/Forms/CertificationInfoForm';
import AdditionalInfoForm from '../pages/ResumeUpdate/Forms/AdditionalInfoForm';
import RenderResume from './ResumeTemplates/RenderResume';
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from '../utils/helper';
import Modal from './Modal';
import ThemeSelector from '../pages/ResumeUpdate/ThemeSelector'; // ✅
import DownloadResume from "../components/DownloadResume"; // adjust path
import StarIcon from "../assets/gemini-color.svg";
import SkillGapAnalyzer from "../components/SkillGapAnalyzer"; // adjust path





const EditResume = () => {

  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);


  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSkillGapAnalyzer, setOpenSkillGapAnalyzer] = useState(false);


  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: { profileImg: null, profilePreviewUrl: "", fullName: "", designation: "", summary: "" },
    template: { theme: "", colorPalette: "" },
    contactInfo: { email: "", phone: "", location: "", linkedin: "", github: "", website: "" },
    workExperience: [{ company: "", role: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    skills: [{ name: "", progress: 0 }],
    projects: [{ title: "", description: "", github: "", liveDemo: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [{ name: "", progress: 0 }],
    interests: [""]
  });

  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required");
        if (!designation.trim()) errors.push("Designation is required");
        if (!summary.trim()) errors.push("Summary is required");
        break;
      }

      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
          errors.push("Valid email is required.");
        }
        if (!phone.trim()) {
          errors.push("Valid 10-digit phone number is required");
        }
        break;
      }

      case "work-experience": {
        resumeData.workExperience.forEach(({ company, role, startDate, endDate }, index) => {
          if (!company.trim())
            errors.push(`Company is required in experience ${index + 1}`);
          if (!role.trim())
            errors.push(`Role is required in experience ${index + 1}`);
          if (!startDate || !endDate)
            errors.push(`Start and End dates are required in experience ${index + 1}`);
        });
        break;
      }

      case "education-info": {
        resumeData.education.forEach(({ degree, institution, startDate, endDate }, index) => {
          if (!degree.trim())
            errors.push(`Degree is required in education ${index + 1}`);
          if (!institution.trim())
            errors.push(`Institution is required in education ${index + 1}`);
          if (!startDate || !endDate)
            errors.push(`Start and End dates are required in education ${index + 1}`);
        });
        break;
      }

      case "skills": {
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skill ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(`Skill progress must be between 1 and 100 in skill ${index + 1}`);
        });
        break;
      }

      case "projects": {
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required in project ${index + 1}`);
          if (!description.trim())
            errors.push(`Project description is required in project ${index + 1}`);
        });
        break;
      }

      case "certifications": {
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(`Certification title is required in certification ${index + 1}`);
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}`);
        });
        break;
      }

      case "additionalInfo": {
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0]?.name?.trim()
        ) {
          errors.push("At least one language is required");
        }
        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("At least one interest is required");
        }
        break;
      }

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    // Move to next step
    setErrorMsg("");
    goToNextStep();
  };

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") {
      navigate("/dashboard");
      return;
    }

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex != -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      //Set progress as percentage
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };



  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience} // ✅ correct prop name
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) => removeArrayItem("workExperience", index)}
          />
        );

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "certifications":
        return (
          <CertificationInfoForm
            projectInfo={resumeData?.certifications}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("certifications", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        );


      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={({ section, index, key, value }) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={({ section, newItem }) =>
              addArrayItem(section, newItem)
            }
            removeArrayItem={({ section, index }) =>
              removeArrayItem(section, index)
            }
          />
        );


      default:
        return null;
    }


  };


  // Update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Update array items (like workExperience, education, etc.)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value; // Replace entire object
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        }; // Update specific key
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };


  // Add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };


  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;
        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };


  // Remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };




  // ✅ upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      // Capture resume preview as image
      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      // Convert base64 to File
      const thumbnailFile = dataURLtoFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );

      const profileImageFile = resumeData?.profileInfo?.profileImg || null;

      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      // Upload images
      const uploadResponse = await axiosInstance.post(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;

      console.log("RESUME_DATA__", resumeData);

      // Call the second API to update other resume data
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      toast.success("Resume Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };


  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink: thumbnailLink || "",
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl || "",
          },
        }
      );
    } catch (err) {
      console.error("Error capturing image:", err);
    } finally {
      setIsLoading(false);
    }
  };


  // Delete Resume
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success('Resume Deleted Successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error("Error capturing image:", err);
    } finally {
      setIsLoading(false);
    }
  };




  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  const handleCloseThemeSelector = () => setOpenThemeSelector(false);


  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) fetchResumeDetailsById();
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <DashboardLayout>

      <div className="container py-0 max-w-7xl min-h-screen relative z-10">

        {/* Topbar */}
        <div className="flex items-center justify-between bg-white rounded-2xl border border-purple-100 py-4 px-4 sm:px-8 shadow-sm hover:shadow-md transition-all gap-2">
          <div className="flex items-center gap-2">
            <TitleInput
              className="text-4xl font-semibold"
              title={resumeData.title}
              setTitle={(value) =>
                setResumeData((prevState) => ({ ...prevState, title: value }))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenThemeSelector(true)}
              className="scale-in-btn transform hover:scale-105 transition-transform duration-300 rounded-3xl border border-purple-500 shadow-md p-0"
              title="Change Theme"
            >
              <div className="shiny-bg flex items-center gap-2 px-5 py-3 rounded-3xl text-white font-medium text-sm">
                <img src={StarIcon} alt="Star Icon" className="w-5 h-5" />
                <span className="hidden sm:inline z-10">Change Theme</span> {/* 👈 only shows on >=sm */}
              </div>
            </button>

            <button
              onClick={() => setOpenSkillGapAnalyzer(true)} // 👉 your function to open modal or page
              className="scale-in-btn transform hover:scale-105 transition-transform duration-300 rounded-3xl border border-green-500 shadow-md p-0"
              title="Analyze Skills"
            >
              <div className="shiny-bg flex items-center gap-2 px-5 py-3 rounded-3xl text-white font-medium text-sm bg-green-600"> {/* optional bg */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /> {/* 🔍 Plus icon, change if you want a magnifier */}
                </svg>
                <span className="hidden sm:inline z-10">Analyze Skills</span>
              </div>
            </button>











            <button
              onClick={handleDeleteResume}
              className="flex items-center gap-2 px-3 py-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white hover:opacity-90 transition"
              title="Delete Resume"
            >
              <LuTrash2 className=" text-white" /> {/* now white icon for visual clarity */}
              <span className="hidden lg:inline text-sm font-medium">Delete</span>
            </button>



<button
  onClick={() => setOpenPreviewModal(true)}
  className="flex items-center gap-1 px-3 py-3 rounded-full bg-gradient-to-r from-purple-800 to-purple-400 text-white hover:opacity-90 transition"
  title="Preview & Download"
>
  <LuDownload className="" />
  <span className="hidden lg:inline text-sm font-medium">Download</span>
</button>

          </div>
        </div>

        {/* Editable Form Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm min-h-[650px] transition-all duration-300">

            {/* ✅ Fix here */}
            <StepProgress progress={progress} />

            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[12px] font-medium text-amber-600 bg-amber-100 px-3 py-1 my-2 rounded-md w-fit">
                  <LuCircleAlert className="text-lg" />
                  {errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-6 mb-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 border border-purple-300 bg-purple-50 hover:bg-purple-100 rounded-md transition-all duration-200"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-all duration-200"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="w-4 h-4" />
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-all duration-200"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" ? (
                    <>
                      <LuDownload className="w-4 h-4" />
                      Preview & Download
                    </>
                  ) : (
                    <>
                      <span>Next</span>
                      <LuArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>


          {/* Resume template */}

          <div ref={resumeRef} className="min-h-[0px] ">
            <RenderResume
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>


      <Modal
        isOpen={openThemeSelector}
        onClose={handleCloseThemeSelector}
        title="Change Theme"
        className="w-[90vw] max-w-[90vw] h-[92vh] rounded-xl"
      >
        <ThemeSelector
          selectedTheme={resumeData?.template}
          setSelectedTheme={(value) =>
            setResumeData((prevState) => ({
              ...prevState,
              template: value || prevState.template,
            }))
          }
          resumeData={resumeData}
          setResumeData={setResumeData}
          onClose={handleCloseThemeSelector}
        />
      </Modal>




      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        className="max-w-[95vw] h-[95vh] w-full px-0"
        headerClassName="flex items-center justify-between px-6 pt-4 pb-2 border-b"
        footer={false}
      >

        {/* Render our custom download resume */}
        <div className="w-full h-[72vh] overflow-auto bg-white px-4 py-6">
          <DownloadResume resumeData={resumeData} />
        </div>
      </Modal>



      <Modal
        isOpen={openSkillGapAnalyzer}
        onClose={() => setOpenSkillGapAnalyzer(false)}
        title="SkillGap Analyzer"
        className="max-w-[95vw] h-[95vh] w-full px-0"
        headerClassName="flex items-center justify-between px-6 pt-4 pb-2 border-b"
        footer={false}
      >
        <div className="w-full h-[72vh] overflow-auto bg-white px-4 py-6">
          <SkillGapAnalyzer resumeData={resumeData} />
        </div>
      </Modal>

    </DashboardLayout>

  );
};

export default EditResume;