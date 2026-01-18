import React, { useEffect, useRef, useState } from "react";
import { RiLinkedinLine } from "react-icons/ri";
import { LuGithub, LuRss } from "react-icons/lu";
import Title from "../ResumeSections/Title";
import WorkExperience from "../ResumeSections/WorkExperience";

import {
  LuMail,
  LuMapPinHouse,
  LuPhone,
  LuUser,
} from "react-icons/lu";
import ContactInfo from "../ResumeSections/ContactInfo";
import { formatYearMonth } from "../../utils/helper";
import EducationInfo from "../ResumeSections/EducationInfo";
import TitleInput from "../Inputs/TitleInput";
import LanguageSection from "../ResumeSections/LanguageSection";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import { SkillSection } from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";


const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B0BD", "#4A5565"];

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors =
    Array.isArray(colorPalette) &&
      colorPalette.length === DEFAULT_THEME.length &&
      colorPalette.every(c => c && c.trim() !== "")
      ? colorPalette
      : DEFAULT_THEME;



  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >

      <div className="flex gap-6 items-start px-10 pt-10 pb-6">
        {/* Profile Image */}
        <div
          className="w-[120px] h-[120px] flex items-center justify-center rounded-xl"
          style={{ backgroundColor: themeColors[1] }}
        >
          {resumeData.profileInfo.profilePreviewUrl ? (
            <img
              src={resumeData.profileInfo.profilePreviewUrl}
              alt="profile"
              className="w-[100px] h-[100px] rounded-xl object-cover border-2 border-white shadow"
            />
          ) : (
            <div
              className="w-[100px] h-[100px] flex items-center justify-center text-5xl rounded-xl"
              style={{ color: themeColors[4] }}
            >
              <LuUser />
            </div>
          )}
        </div>

        {/* Name and Contact Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {resumeData.profileInfo.fullName}
          </h2>
          <p className="text-sm font-semibold">{resumeData.profileInfo.designation}</p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
            <ContactInfo
              icon={<LuMapPinHouse />}
              iconBG={themeColors[2]}
              value={resumeData.contactInfo.location}
            />
            <ContactInfo
              icon={<LuMail />}
              iconBG={themeColors[2]}
              value={resumeData.contactInfo.email}
            />
            <ContactInfo
              icon={<LuPhone />}
              iconBG={themeColors[2]}
              value={resumeData.contactInfo.phone}
            />
            {resumeData.contactInfo.linkedin && (
              <ContactInfo
                icon={<RiLinkedinLine />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.linkedin}
                link={resumeData.contactInfo.linkedin}
              />
            )}
            {resumeData.contactInfo.website && (
              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.website}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mx-10 pb-5">
        <div>
          <Title text="Professional Summary" color={themeColors[1]} />
          <p className="text-sm font-medium">
            {resumeData.profileInfo.summary}
          </p>
        </div>

        <div className="mt-4">
          <Title text="Work Experience" color={themeColors[1]} />

          {resumeData.workExperience.map((data, index) => (
            <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>

        <div className="mt-4">
          <Title text="Projects" color={themeColors[1]} />
          {resumeData.projects.map((project, index) => (
            <ProjectInfo
              key={`project_${index}`}
              title={project.title}
              description={project.description}
              githubLink={project.github}
              liveDemoUrl={project.liveDemo}
              bgColor={themeColors[2]}
            />
          ))}
        </div>

        <div className="mt-6">
          <Title text="Education" color={themeColors[1]} />

          <div className="grid grid-cols-2 gap-3">
            {resumeData.education.map((edu, index) => (
              <EducationInfo
                key={`education_${index}`}
                degree={edu.degree}
                institution={edu.institution}
                duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Title text="Certifications" color={themeColors[1]} />

          <div className="grid grid-cols-2 gap-6">
            {resumeData.certifications.map((data, index) => (
              <CertificationInfo
                key={`cert_${index}`}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
        </div>


        <div className="mt-4">
          <Title text="Skills" color={themeColors[1]} />

          <SkillSection
            skills={resumeData.skills}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
          />
        </div>

        <div className="grid grid-cols-2 gap-10 mt-4">
          <div className="">
            <Title text="Languages" color={themeColors[1]} />

            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          {resumeData.interests.length > 0 &&
            resumeData.interests[0] != "" && (<div className="mt-4">
              <Title text="Interests" color={themeColors[1]} />
              <div className="flex items-center flex-wrap gap-3 mt-4">
                {resumeData.interests.map((interest, index) => {
                  if (!interest) return null;
                  return (
                    <div
                      key={`interest_${index}`}
                      className="text-[10px] font-medium py-1 px-3 rounded-lg"
                      style={{ backgroundColor: themeColors[2] }}
                    >
                      {interest}
                    </div>
                  );
                })}
              </div>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
