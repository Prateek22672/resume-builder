import React from "react";
import Progress from "../Progress";

const LanguageSection = ({ languages, accentColor, bgColor }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {languages?.map((language, index) => (
        <div
          key={`language_${index}`}
          className="flex items-center justify-between"
        >
          <p className="text-sm font-medium text-gray-800">{language.name}</p>
          <Progress
            progress={(language.progress / 100) * 5}
            color={accentColor}
            bgColor={bgColor}
          />
        </div>
      ))}
    </div>
  );
};

export default LanguageSection;
