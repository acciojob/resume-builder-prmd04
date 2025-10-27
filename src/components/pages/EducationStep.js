
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateEducation, nextStep, prevStep } from "../feature/ResumeSlice";
import "../../styles/education.css";
import StepIndicator from "../component/StepIndicator";

const EducationStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { education } = useSelector((state) => state.resume);

  const [educationList, setEducationList] = useState(
    education.length > 0
      ? education
      : [{ courseName: "", completionYear: "", college: "", percentage: "" }]
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educationList];
    updated[index][name] = value;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { courseName: "", completionYear: "", college: "", percentage: "" },
    ]);
  };

  const deleteEducation = (index) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  const handleSave = () => {
    dispatch(updateEducation(educationList));
    navigate('/skill');
     dispatch(nextStep());
  };

  const handleNext = () => {
    handleSave();
   
  };

  const handleBack = () => {
    navigate(-1)
    dispatch(prevStep());
  };

  return (
    <div className="education-container">
      <StepIndicator currentStep={2} />

      <h2>Add Education Details</h2>

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

            <label>Completion Year</label>
            <input
              type="text"
              name="completionYear"
              value={edu.completionYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. 2023"
            />
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

            <label>Percentage / CGPA</label>
            <input
              type="text"
              name="percentage"
              value={edu.percentage}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. 8.5 CGPA"
            />
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

      <button type="button" id="add_education" className="add-btn" onClick={addEducation}>
        + Add Education
      </button>

      <div className="edu-buttons">
        <button type="button" id="back" onClick={handleBack}>
          Back
        </button>
        <button type="button" id="next" onClick={handleNext}>
          Next
        </button>
        <button type="button" id="save_continue" onClick={handleSave}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default EducationStep;
