import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateMiniProjects,
  nextStep,
  prevStep,
} from "../feature/ResumeSlice";
import StepIndicator from "../component/StepIndicator";
import "../../styles/miniProject.css";
import NavigationButtons from "./NavigationButtons";

const MiniProjectStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { miniProjects } = useSelector((state) => state.resume);

  const [project, setProject] = useState({
    projectName: "",
    description: "",
    techStack: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const validateProject = () => {
    if (!project.projectName.trim()) {
      setError("Project name is required.");
      return false;
    }
    if (!project.description.trim()) {
      setError("Project description is required.");
      return false;
    }
    if (!project.techStack.trim()) {
      setError("Tech stack is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddProject = () => {
    if (!validateProject()) return;

    const updatedProjects = [...miniProjects, project];
    dispatch(updateMiniProjects(updatedProjects));
    setProject({ projectName: "", description: "", techStack: "" });
    setError("");
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = miniProjects.filter((_, i) => i !== index);
    dispatch(updateMiniProjects(updatedProjects));
  };

  const handleSave = () => {
    if (miniProjects.length === 0) {
      setError("Please add at least one mini project before saving.");
      return;
    }
    dispatch(updateMiniProjects(miniProjects));
    console.log("Projects saved:", miniProjects);
    navigate("/social-link");
    dispatch(nextStep());
  };

  const handleNext = () => {
    navigate("/social-link");
    dispatch(nextStep());
  };

  const handleBack = () => {
    console.log('back is cliked');
    navigate("/skill");
    dispatch(prevStep());
  };

  return (
    <div className="project-container">
      <StepIndicator />

      <h2>Add your Mini Projects</h2>

      <div className="project-form">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={project.projectName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (e.g., React, Node.js)"
          value={project.techStack}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
        ></textarea>

        {error && <p className="error">{error}</p>}

        <button id="add_project" onClick={handleAddProject}>
          Add Project
        </button>
      </div>

      <ul className="project-list">
        {miniProjects.map((proj, index) => (
          <li key={index} className="project-item">
            <strong>{proj.projectName}</strong>
            <p>{proj.description}</p>
            <small>{proj.techStack}</small>
            <button id="delete" onClick={() => handleDeleteProject(index)}>
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

export default MiniProjectStep;
