import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import RenderResume from "../components/ResumeTemplates/RenderResume";
import { fixTailwindColors } from "../utils/helper";

const DownloadResume = ({ resumeData }) => {
  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    const original = resumeRef.current;
    if (!original) return;

    try {
      const clone = original.cloneNode(true);

      // Append the clone off-screen
      Object.assign(clone.style, {
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: `${original.offsetWidth}px`,
        height: `${original.scrollHeight}px`,
        zoom: 1,
        backgroundColor: "#fff",
      });


      document.body.appendChild(clone);

      // Fix `oklch` issue
      const all = clone.querySelectorAll("*");
      all.forEach((el) => {
        const style = window.getComputedStyle(el);
        ["color", "backgroundColor", "borderColor"].forEach((prop) => {
          if (style[prop]?.includes("oklch")) {
            el.style[prop] = "#000"; // or your preferred fallback
          }
        });
      });

      const canvas = await html2canvas(clone, {
        scale: 3, // 🟢 2 is default, 3+ gives better quality
        useCORS: true,
        backgroundColor: "#ffffff",
      });


      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, '', 'FAST'); // Use 'FAST' for better compression

      pdf.save(`${resumeData?.title || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };



  // Responsive scale based on screen width
  const scaleStyle = window.innerWidth < 768
    ? {
      transform: "scale(0.5)",
      transformOrigin: "top center",
    }
    : {
      transform: "scale(1)",
      transformOrigin: "top center",
    };

  return (
    <div className="w-full">
      {/* Button + Message */}
      <div className="flex flex-col items-center gap-4 mt-0">
<button
  onClick={async () => {
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
    await handleDownloadPDF();// wait 1 second to ensure file is downloaded
  }}
  className="text-white font-medium text-sm px-6 py-3 rounded-3xl shadow-md border border-purple-500
    bg-[linear-gradient(90deg,_#8b5cf6,_#ec4899,_#000000,_#ffffff)]
    bg-[length:300%_300%] animate-text-shine hover:scale-105 transition-all duration-300 cursor-pointer"
>
  Download PDF
</button>



        <p className="text-sm text-center  px-0">
          Mobile preview is scaled down for display. Click download to get the full original resume.
        </p>
      </div>

      {/* Scaled resume preview */}
      <div className="w-full mt-6 flex justify-center overflow-auto">
        <div
          ref={resumeRef}
          className="bg-white shadow p-4"
          style={{
            ...scaleStyle,
            width: "830px",
            minHeight: "800px",
          }}
        >
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
            containerWidth={800}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadResume;
