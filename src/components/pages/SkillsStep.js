import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills, nextStep, prevStep } from "../feature/ResumeSlice"
import StepIndicator from "../component/StepIndicator";
import "../../styles/skill.css";

const SkillsStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skills } = useSelector((state) => state.resume);
  const [skill, setSkill] = useState("");

  const handleAddSkill = () => {
    if (skill.trim() === "") return;
    const updatedSkills = [...skills, skill];
    dispatch(updateSkills(updatedSkills)); 
    setSkill("");
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    dispatch(updateSkills(updatedSkills)); 
  };

  const handleSave = () => {
    dispatch(updateSkills(skills)); 
    console.log("Skills saved:", skills);
    navigate('/mini-project')
    dispatch(nextStep());
  };

  const handleNext = () => {
    navigate('/mini-project')
    dispatch(nextStep());
  };

  const handlePrev = () => {
    navigate(-1);
    dispatch(prevStep());
  };

  return (
    <div className="skill-container">
      <StepIndicator />

      <h2>Skill Section</h2>

      <div className="skill-form">
        <input
          type="text"
          name="skill"
          placeholder="Enter a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button id="add_skill" onClick={handleAddSkill}>
          Add
        </button>
      </div>

      <ul className="skill-list">
        {skills.map((s, index) => (
          <li key={index} className="skill-item">
            <span>{s}</span>
            <button id="delete_skill" onClick={() => handleDeleteSkill(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="navigation-buttons">
        <button onClick={handlePrev}>Back</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleSave}>Save & Continue</button>
      </div>
    </div>
  );
};

export default SkillsStep;
