import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, prevStep, updateProfile } from '../feature/ResumeSlice'
import { useNavigate } from "react-router-dom";
import StepIndicator from "../component/StepIndicator";
import '../../styles/profile.css'

const ProfileStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfileData] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, url: imageURL }));
    }
  };

  const handleSave = () => {
    dispatch(updateProfile(profile));
    console.log("Profile saved:", profile);
    navigate("/education");
    dispatch(nextStep())
   
  };

  const handleNext = () => {
    navigate("/education"); 
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep()) 
  };

  return (
    <>
    <StepIndicator/>
    <div className="profile-container">
      <h2>Add your Profile Details</h2>
      <form className="profile-form">
        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={profile.fname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={profile.lname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Profile Photo:
          <input
            type="file"
            name="url"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>

        {profile.url && (
          <div className="photo-preview">
            <img
              src={profile.url}
              alt="Profile Preview"
              width="120"
              height="120"
              style={{ borderRadius: "50%", marginTop: "10px" }}
            />
          </div>
        )}

        <div className="buttons">
          <button
            type="button"
            id="back"
            onClick={handleBack}
          >
            Back
          </button>

          <button
            type="button"
            id="next"
            onClick={handleNext}
          >
            Next
          </button>

          <button
            type="button"
            id="save_continue"
            onClick={handleSave}
          >
            Save & Continue
          </button>

          
        </div>
      </form>
    </div>
    </>
  );
};

export default ProfileStep;
