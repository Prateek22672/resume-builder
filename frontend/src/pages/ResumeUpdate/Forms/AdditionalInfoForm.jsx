import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput"; // Make sure the path is correct

const AdditionalInfoForm = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Additional Info</h2>

      {/* Languages Section */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Languages</h3>
        <div className="flex flex-col gap-4 mb-3">
          {(languages || []).map((lang, index) => (
            <div
              key={index}
              className="border border-gray-200/80 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input
                  label="Language"
                  placeholder="e.g. English"
                  value={lang.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem({
                      section: "languages",
                      index,
                      key: "name",
                      value: target.value,
                    })
                  }
                />

                <div className="flex flex-col">
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency ({(lang.progress / 20) || 0}/5)
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={lang.progress || 0}
                      total={5}
                      onChange={(value) =>
                        updateArrayItem({
                          section: "languages",
                          index,
                          key: "progress",
                          value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {languages.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  onClick={() =>
                    removeArrayItem({ section: "languages", index })
                  }
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({ section: "languages", newItem: { name: "", progress: 0 } })
          }
        >
          <LuPlus /> Add Language
        </button>
      </div>

      {/* Interests Section */}
      <div className="mt-8">
        <h3 className="text-md font-medium text-gray-800 mb-2">Interests</h3>
        <div className="flex flex-col gap-4 mb-3">
          {(interests || []).map((interest, index) => (
            <div
              key={index}
              className="border border-gray-200/80 p-4 rounded-lg relative"
            >
              <Input
                label="Interest"
                placeholder="Reading, Coding..."
                value={interest || ""}
                onChange={({ target }) =>
                  updateArrayItem({
                    section: "interests",
                    index,
                    key: null, // full value
                    value: target.value,
                  })
                }
              />
              {interests.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  onClick={() =>
                    removeArrayItem({ section: "interests", index })
                  }
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({ section: "interests", newItem: "" })
          }
        >
          <LuPlus /> Add Interest
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
