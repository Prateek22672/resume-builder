import React, { useEffect, useRef, useState } from "react";
import { resumeTemplates, themeColorPalette } from "../../utils/data";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import Tabs from "../../components/Tabs";
import { LuCircleCheckBig } from "react-icons/lu";
import StarIcon from "../../assets/gemini-color.svg"; // ✅ Make sure this path is correct

const TAB_DATA = [
  { label: "Templates" },
  { label: "Color Palettes" },
];

const ColorPalette = ({ colors, isSelected, onSelect }) => (
  <div
    className={`relative h-16 flex rounded-lg overflow-hidden border-2 cursor-pointer transition ${
      isSelected ? "border-purple-600 scale-[1.03]" : "border-gray-200"
    }`}
    onClick={onSelect}
  >
    {colors.map((color, i) => (
      <div key={i} className="flex-1" style={{ backgroundColor: color }} />
    ))}
    {isSelected && (
      <LuCircleCheckBig className="absolute top-1 right-1 text-purple-600 bg-white rounded-full" />
    )}
  </div>
);

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  setResumeData,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(700);
  const [tabValue, setTabValue] = useState("Templates");

  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  const handleThemeSelection = () => {
    setResumeData((prev) => ({
      ...prev,
      template: {
        ...prev.template,
        colorPalette: selectedColorPalette?.colors,
        theme: selectedTemplate?.theme,
      },
    }));
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose?.();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* LEFT PANEL */}
      <div className="md:w-[45%] w-full max-h-screen overflow-y-auto px-2 pb-6 border-r">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        {tabValue === "Templates" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {resumeTemplates.map((template, index) => (
              <div
                key={template.id}
                className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition ${
                  selectedTemplate.index === index
                    ? "border-purple-600 scale-[1.02]"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  setSelectedTemplate({ theme: template.templateCode, index })
                }
              >
                <img
                  src={template.thumbnailImg}
                  alt={`Template ${template.id}`}
                  className="w-full h-auto sm:h-[300px] overflow-auto"
                />
                {selectedTemplate.index === index && (
                  <LuCircleCheckBig className="absolute top-1 right-1 text-purple-600 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}

        {tabValue === "Color Palettes" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {themeColorPalette.themeOne.map((colors, index) => (
              <ColorPalette
                key={`palette_${index}`}
                colors={colors}
                isSelected={selectedColorPalette?.index === index}
                onSelect={() => setSelectedColorPalette({ colors, index })}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="md:w-[55%] w-full h-full overflow-auto relative bg-gray-50">
        {/* Done Button */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
<button
  onClick={handleThemeSelection}
  className="combined-shiny-scale hover:scale-105 transition-transform duration-300 flex items-center gap-2 px-6 py-3 rounded-3xl text-white font-medium text-sm border border-purple-500 shadow-md"
>
  <img src={StarIcon} alt="Star Icon" className="w-5 h-5" />
  <span className="z-10 text-white">Generate</span>
</button>


        </div>

        {/* Resume Preview */}
        <div className="w-full min-h-screen flex justify-center items-start pt-16 pb-8 px-2 overflow-x-auto">
          <div
            ref={resumeRef}
            className="bg-white rounded shadow-md w-[min(100%,700px)]"
            style={{ transformOrigin: "top center", minHeight: "1100px" }}
          >
            <RenderResume
              templateId={selectedTemplate?.theme || resumeData?.template?.theme}
              resumeData={resumeData}
              colorPalette={
                selectedColorPalette?.colors || resumeData?.template?.colorPalette
              }
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
