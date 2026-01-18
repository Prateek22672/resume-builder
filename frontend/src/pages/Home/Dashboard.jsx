import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus, MoveDiagonal } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateResumeForm from "./CreateResumeForm";
import AIChatbot from "../../components/AIChatbot";


const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-6">
        {/* Add New Resume Card */}
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl border border-purple-300 hover:border-purple-500 hover:bg-purple-50/10 cursor-pointer shadow-sm"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-full">
            <CirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800 text-sm">Add New Resume</h3>
        </div>

        {/* Render Resume Cards */}
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imgUrl={resume?.thumbnailLink || null}
            title={resume?.title}
            lastUpdated={moment(resume?.updatedAt).format("Do MMM YYYY")}
            onSelect={() => navigate(`/resume/${resume?._id}`)}

          />
        ))}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}

        hideHeader
      >
        {/* Add your form or content here if needed */}
        <CreateResumeForm />
      </Modal>

      <AIChatbot />

    </DashboardLayout>
  );
};

export default Dashboard;
