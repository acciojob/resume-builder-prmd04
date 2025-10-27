import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills, nextStep, prevStep } from "../feature/ResumeSlice";
import StepIndicator from "../component/StepIndicator";
import NavigationButtons from "./NavigationButtons";
import "../../styles/skill.css";

const SkillsStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills } = useSelector((state) => state.resume);

  const [skill, setSkill] = useState("");
  const [error, setError] = useState(""); // 🧠 track validation message

  // ✅ Add skill with validation
  const handleAddSkill = () => {
    if (skill.trim() === "") {
      setError("Skill cannot be empty.");
      return;
    }

    if (skills.includes(skill.trim())) {
      setError("This skill is already added.");
      return;
    }

    const updatedSkills = [...skills, skill.trim()];
    dispatch(updateSkills(updatedSkills));
    setSkill("");
    setError("");
  };

  // ✅ Delete a skill
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    dispatch(updateSkills(updatedSkills));
  };

  
  const validateBeforeNext = () => {
    if (skills.length === 0) {
      setError("Please add at least one skill before continuing.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateBeforeNext()) return;
    dispatch(updateSkills(skills));
    dispatch(nextStep());
    navigate("/mini-project");
  };

  const handleNext = () => {
    navigate("/mini-project");
    dispatch(nextStep());
  };

  const handleBack = () => {
    navigate("/education");
    dispatch(prevStep());
  };

  return (
    <div className="skill-container">
      <StepIndicator />

      <h2>Add your Skills</h2>

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

      {error && <p className="error">{error}</p>}

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

      <NavigationButtons
        handleBack={handleBack}
        handleSave={handleSave}
        handleNext={handleNext}
      />
    </div>
  );
};

export default SkillsStep;
