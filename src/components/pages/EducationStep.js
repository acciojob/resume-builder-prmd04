import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateEducation, nextStep, prevStep } from "../feature/ResumeSlice";
import "../../styles/education.css";
import StepIndicator from "../component/StepIndicator";
import NavigationButtons from "./NavigationButtons";

const EducationStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { education } = useSelector((state) => state.resume);

  const [educationList, setEducationList] = useState(
    education.length > 0
      ? education
      : [{ courseName: "", completionYear: "", college: "", percentage: "" }]
  );

  const [errors, setErrors] = useState([]); 
  
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educationList];
    updated[index][name] = value;
    setEducationList(updated);
  };

  // Add new education field
  const addEducation = () => {
    setEducationList([
      ...educationList,
      { courseName: "", completionYear: "", college: "", percentage: "" },
    ]);
    setErrors([...errors, {}]);
  };

  // Delete education field
  const deleteEducation = (index) => {
    const updated = [...educationList];
    const updatedErrors = [...errors];
    updated.splice(index, 1);
    updatedErrors.splice(index, 1);
    setEducationList(updated);
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let newErrors = [];

    educationList.forEach((edu, index) => {
      let err = {};
      if (!edu.courseName.trim()) err.courseName = "Course name is required.";
      if (!edu.completionYear.trim()) {
        err.completionYear = "Completion year is required.";
      } else if (!/^\d{4}$/.test(edu.completionYear)) {
        err.completionYear = "Enter a valid 4-digit year.";
      }
      if (!edu.college.trim()) err.college = "College name is required.";
      if (!edu.percentage.trim()) {
        err.percentage = "Percentage/CGPA is required.";
      } else if (!/^\d+(\.\d+)?$/.test(edu.percentage)) {
        err.percentage = "Enter a valid number (e.g. 8.5 or 85).";
      }

      newErrors[index] = err;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSave = () => {
    if (!validateForm()) return;
    dispatch(updateEducation(educationList));
    dispatch(nextStep());
    navigate("/skill");
  };

  const handleNext = () => {
     navigate("/skill");
    dispatch(nextStep());
  };

  const handleBack = () => {
    navigate(-1)
    dispatch(prevStep());
  };

  return (
    <div className="education-container">
      <StepIndicator currentStep={2} />

      <h2>Add your Education Details</h2>

      {educationList.map((edu, index) => (
        <div key={index} className="education-box">
          <div className="input-row">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={edu.courseName}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. B.Tech in Computer Science"
            />
            {errors[index]?.courseName && (
              <span className="error">{errors[index].courseName}</span>
            )}

            <label>Completion Year</label>
            <input
              type="text"
              name="completionYear"
              value={edu.completionYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. 2023"
            />
            {errors[index]?.completionYear && (
              <span className="error">{errors[index].completionYear}</span>
            )}
          </div>

          <div className="input-row">
            <label>College</label>
            <input
              type="text"
              name="college"
              value={edu.college}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. XYZ University"
            />
            {errors[index]?.college && (
              <span className="error">{errors[index].college}</span>
            )}

            <label>Percentage / CGPA</label>
            <input
              type="text"
              name="percentage"
              value={edu.percentage}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. 8.5 or 85"
            />
            {errors[index]?.percentage && (
              <span className="error">{errors[index].percentage}</span>
            )}
          </div>

          <button
            type="button"
            id="delete"
            className="delete-btn"
            onClick={() => deleteEducation(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        id="add_education"
        className="add-btn"
        onClick={addEducation}
      >
        + Add Education
      </button>

      <NavigationButtons
        handleBack={handleBack}
        handleSave={handleSave}
        handleNext={handleNext}
      />
    </div>
  );
};

export default EducationStep;
