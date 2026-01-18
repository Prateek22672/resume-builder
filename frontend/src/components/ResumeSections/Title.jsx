import React from "react";

const Title = ({ text, color }) => {
  return (
    <h2 className="text-lg font-bold mb-3" style={{ backgroundColor: color }}>
      {text}
    </h2>
  );
};

export default Title;
