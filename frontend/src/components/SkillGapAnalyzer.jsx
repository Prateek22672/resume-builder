import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const SkillGapAnalyzer = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Skill-course recommendations mapping
  const courseRecommendations = {
    JavaScript: [
      {
        title: 'JavaScript Basics by Meta (Coursera)',
        url: 'https://www.coursera.org/learn/javascript',
      },
      {
        title: 'Modern JavaScript (Udemy)',
        url: 'https://www.udemy.com/course/the-complete-javascript-course/',
      },
    ],
    React: [
      {
        title: 'React by Meta (Coursera)',
        url: 'https://www.coursera.org/learn/react',
      },
      {
        title: 'React JS Complete Guide (Udemy)',
        url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      },
    ],
    "Node.js": [
      {
        title: 'Node.js Basics (Coursera)',
        url: 'https://www.coursera.org/learn/server-side-nodejs',
      },
      {
        title: 'Node.js Complete Guide (Udemy)',
        url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
      },
    ],
    MongoDB: [
      {
        title: 'MongoDB Basics (MongoDB University)',
        url: 'https://university.mongodb.com/',
      },
      {
        title: 'MongoDB Essentials (Coursera)',
        url: 'https://www.coursera.org/learn/mongodb',
      },
    ],
    HTML: [
      {
        title: 'HTML Basics (Coursera)',
        url: 'https://www.coursera.org/learn/html',
      },
    ],
    CSS: [
      {
        title: 'CSS Basics (Coursera)',
        url: 'https://www.coursera.org/learn/css',
      },
    ],
    // ✅ Add more mappings as needed
  };

  // ✅ Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosInstance.get('/api/resumes/roles/list');
        setRolesList(res.data.roles);
      } catch (error) {
        console.error('Failed to fetch roles list', error);
      }
    };
    fetchRoles();
  }, []);

  // ✅ Handle input change with suggestions
  const handleInputChange = (e) => {
    const input = e.target.value;
    setJobDescription(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const filtered = rolesList.filter((role) =>
      role.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setJobDescription(suggestion);
    setSuggestions([]);
  };

  const handleAnalyze = async () => {
    const jdToUse = jobDescription || resumeData.profileInfo.designation;
    if (!jdToUse) {
      setAnalysisResult({
        error: 'Please enter a job description or designation',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/resumes/skillgap', {
        jobDescription: jdToUse,
        resumeSkills: resumeData.skills.map((s) => s.name),
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error(error);
      setAnalysisResult({ error: 'Failed to analyze skills' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl flex flex-col items-center border border-white/30">
      <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        SkillGap Analyzer
      </h2>

      <input
        type="text"
        className="w-full max-w-md border rounded-3xl p-3 mb-4 bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-700"
        placeholder="Type your role here..."
        value={jobDescription}
        onChange={handleInputChange}
      />

      {suggestions.length > 0 && (
        <ul className="bg-white/50 backdrop-blur-sm rounded shadow-lg max-h-40 overflow-y-auto w-full max-w-md mb-4">
          {suggestions.map((sugg, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(sugg)}
              className="p-2 cursor-pointer hover:bg-gray-200 border-b last:border-none"
            >
              {sugg}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleAnalyze}
        className="scale-in-btn transform hover:scale-105 transition-transform duration-300 rounded-full border border-purple-500 shadow-md px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {analysisResult && (
        <div className="mt-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 w-full max-w-xl">
          {analysisResult.matchPercentage !== undefined && (
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Match Percentage: {analysisResult.matchPercentage}%
            </p>
          )}

          {analysisResult.message && (
            <p className="text-yellow-500 mb-2">{analysisResult.message}</p>
          )}

          <h3 className="text-xl font-semibold mb-4">Results</h3>

          {analysisResult.error ? (
            <p className="text-red-500">{analysisResult.error}</p>
          ) : (analysisResult.missingSkills || []).length === 0 ? (
            <p className="text-green-600">
              No missing skills! You match the JD well.
            </p>
          ) : (
            <div>
              <p className="font-bold mb-2">Missing Skills:</p>
              <ul className="list-disc list-inside text-left space-y-1">
                {(analysisResult.missingSkills || []).map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Recommended Courses */}
          <div className="mt-8">
            <p className="text-lg font-semibold flex items-center mb-4">
              🎓 Recommended Courses
            </p>

            <div className="grid grid-cols-1 gap-4">
              {(analysisResult.missingSkills || []).map((skill, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 shadow"
                >
                  <h4 className="font-bold mb-2">{skill}</h4>
                  <ul className="space-y-2">
                    {(courseRecommendations[skill] || [
                      { title: 'Explore official docs', url: '#' },
                    ]).map((course, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <p>{course.title}</p>
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalyzer;
