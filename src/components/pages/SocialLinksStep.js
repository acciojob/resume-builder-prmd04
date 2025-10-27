import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSocialLinks,
  nextStep,
  prevStep,
} from "../feature/ResumeSlice";
import StepIndicator from "../component/StepIndicator";
import NavigationButtons from "./NavigationButtons";
import "../../styles/socialLInk.css";

const SocialLinksStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socialLinks } = useSelector((state) => state.resume);
  const [social, setSocial] = useState("");
  const [error, setError] = useState("");

  const handleAddSocial = () => {
    if (!social.trim()) {
      setError("Please enter a social link before adding.");
      return;
    }

    const updated = [...socialLinks, social.trim()];
    dispatch(updateSocialLinks(updated));
    setSocial("");
    setError("");
  };

  const handleDelete = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    dispatch(updateSocialLinks(updated));
  };

  const handleBack = () => {
    navigate('mini-project');
    dispatch(prevStep());
  };

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/resume-preview");
  };

  const handleSave = () => {
    if (socialLinks.length === 0) {
      setError("Please add at least one social link before saving.");
      return;
    }
    dispatch(updateSocialLinks(socialLinks));
    setError("");
  };

  const handleSubmit = () => {
    if (socialLinks.length === 0) {
      setError("Please add at least one social link before submitting.");
      return;
    }
    dispatch(updateSocialLinks(socialLinks));
    alert("🎉 Resume Created Successfully!");
    navigate("/preview-resume");
  };

  return (
    <div className="social-container">
      <StepIndicator />

      <h2>Add your Social Links (e.g., LinkedIn, GitHub, Portfolio)</h2>

      <div className="social-form">
        <input
          type="text"
          name="social"
          placeholder="Enter social link (e.g., GitHub, LinkedIn)"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
        />
        <button id="add_social" onClick={handleAddSocial}>
          Add Social
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="social-list">
        {socialLinks.map((link, index) => (
          <li key={index} className="social-item">
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
            <button id="delete" onClick={() => handleDelete(index)}>
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

      <button
        id="submit_resume"
        onClick={handleSubmit}
        className="final-submit-btn"
      >
        Submit Resume
      </button>
    </div>
  );
};

export default SocialLinksStep;
