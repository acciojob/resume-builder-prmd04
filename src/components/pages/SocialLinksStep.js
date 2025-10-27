import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSocialLinks,
  prevStep,
  resetForm,
} from "../feature/ResumeSlice";
import StepIndicator from "../component/StepIndicator";
import "../../styles/socialLInk.css";

const SocialLinksStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { socialLinks } = useSelector((state) => state.resume);
  const [social, setSocial] = useState("");

  const handleAddSocial = () => {
    if (!social.trim()) return;
    dispatch(updateSocialLinks([...socialLinks, social]));
    setSocial("");
  };

  const handleDelete = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    dispatch(updateSocialLinks(updated));
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(prevStep());
  };

  const handleSave = () => {
    dispatch(updateSocialLinks(socialLinks));
  };

  const handleSubmit = () => {
    handleSave();
    alert("🎉 Resume Created Successfully!");
    navigate("/preview-resume");
  };

  return (
    <div className="social-container">
      <StepIndicator />

      <h2>Social Links</h2>

      <div className="social-form">
        <input
          type="text"
          name="Social"
          placeholder="Enter social link (e.g., GitHub, LinkedIn)"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
        />
        <button id="add_social" onClick={handleAddSocial}>
          Add Social
        </button>
      </div>

      <ul className="social-list">
        {socialLinks.map((link, index) => (
          <li key={index} className="social-item">
            {link}
            <button id="delete" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="navigation-buttons">
        <button id="back" onClick={handleBack}>
          Back
        </button>
        <button id="save_continue" onClick={handleSave}>
          Save & Continue
        </button>
        <button id="submit_resume" onClick={handleSubmit}>
          Submit Resume
        </button>
      </div>
    </div>
  );
};

export default SocialLinksStep;
