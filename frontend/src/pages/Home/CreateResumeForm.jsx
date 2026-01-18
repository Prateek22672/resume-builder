import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please resume title");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });

      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className=" max-w-5sm p-0 md:p-1 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create New Resume</h3>
      <p className="text-xs text-slate-700 mt-1.5 mb-3">
        Give your resume a title to get started. You can edit all details later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="Eg: Mike's Resume"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2 cursor-pointer hover:bg-purple-600 transition-all duration-200"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
