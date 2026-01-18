import React from 'react';
import Input from "../../../components/Inputs/Input";

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

<div className="mt-4 flex flex-col gap-4">
  <div className="col-span-2">
    <Input
      label="Address"
      placeholder="Short Address"
      type="text"
      value={contactInfo.location || ""}
      onChange={({ target }) => updateSection("location", target.value)}
    />
  </div>

  {/* Email & Phone Side by Side on md, stacked on mobile */}
  <div className="w-full">
    <Input
      label="Email"
      placeholder="john@example.com"
      type="email"
      value={contactInfo.email || ""}
      onChange={({ target }) => updateSection("email", target.value)}
    />
  </div>

  <div className="w-full">
    <Input
      label="Phone Number"
      placeholder="9876543210"
      type="text"
      value={contactInfo.phone || ""}
      onChange={({ target }) => updateSection("phone", target.value)}
    />
  </div>

  <div className="w-full">
    <Input
      label="LinkedIn"
      placeholder="https://linkedin.com/in/username"
      type="text"
      value={contactInfo.linkedin || ""}
      onChange={({ target }) => updateSection("linkedin", target.value)}
    />
  </div>

  <div className="w-full">
    <Input
      label="GitHub"
      placeholder="https://github.com/username"
      type="text"
      value={contactInfo.github || ""}
      onChange={({ target }) => updateSection("github", target.value)}
    />
  </div>

  <div className="col-span-1 md:col-span-2">
    <Input
      label="Portfolio / Website"
      placeholder="https://yourwebsite.com"
      type="text"
      value={contactInfo.website || ""}
      onChange={({ target }) => updateSection("website", target.value)}
    />
  </div>
</div>


    </div>
  );
};

export default ContactInfoForm;
