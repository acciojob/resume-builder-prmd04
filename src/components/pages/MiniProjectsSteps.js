import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateMiniProjects,
  nextStep,
  prevStep,} from '../feature/ResumeSlice'
import StepIndicator from "../component/StepIndicator";
import "../../styles/miniProject.css";

const MiniProjectStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { miniProjects } = useSelector((state) => state.resume);

  const [project, setProject] = useState({
    projectName: "",
    description: "",
    techStack: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    if (!project.projectName.trim() || !project.description.trim()) return;
    const updatedProjects = [...miniProjects, project];
    dispatch(updateMiniProjects(updatedProjects));
    setProject({ projectName: "", description: "", techStack: "" });
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = miniProjects.filter((_, i) => i !== index);
    dispatch(updateMiniProjects(updatedProjects));
  };

  const handleSave = () => {
    dispatch(updateMiniProjects(miniProjects));
    console.log("Projects saved:", miniProjects);
    navigate('/social-link')
    dispatch(nextStep());
  };

  const handleNext = () => {
    navigate('/social-link')
    dispatch(nextStep());
  };

  const handlePrev = () => {
    navigate(-1);
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

      <div className="navigation-buttons">
        <button id="back" onClick={handlePrev}>
          Back
        </button>
        <button id="next" onClick={handleNext}>
          Next
        </button>
        <button id="save_continue" onClick={handleSave}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default MiniProjectStep;
