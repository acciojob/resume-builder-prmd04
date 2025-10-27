import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, prevStep, updateProfile } from "../feature/ResumeSlice";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../component/StepIndicator";
import NavigationButtons from "./NavigationButtons";
import "../../styles/profile.css";

const ProfileStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfileData] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    url: "",
  });

  const [errors, setErrors] = useState({}); 

  
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

  
  const validateForm = () => {
    let newErrors = {};

    if (!profile.fname.trim()) newErrors.fname = "First name is required.";
    if (!profile.lname.trim()) newErrors.lname = "Last name is required.";
    if (!profile.address.trim()) newErrors.address = "Address is required.";

   
    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(profile.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits.";
    }

    
    if (!profile.url) newErrors.url = "Profile photo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSave = () => {
    if (!validateForm()) return; 

    dispatch(updateProfile(profile));
    console.log("Profile saved:", profile);
    dispatch(nextStep());
    navigate("/education");
  };

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/education");
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <>
      <StepIndicator />
      <div className="profile-container">
        <h2>Add your profile details</h2>

        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            First Name:
            <input
              type="text"
              name="fname"
              value={profile.fname}
              onChange={handleChange}
            />
            {errors.fname && <span className="error">{errors.fname}</span>}
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lname"
              value={profile.lname}
              onChange={handleChange}
            />
            {errors.lname && <span className="error">{errors.lname}</span>}
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>

          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label>
            Profile Photo:
            <input
              type="file"
              name="url"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {errors.url && <span className="error">{errors.url}</span>}
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

          <NavigationButtons
            handleBack={handleBack}
            handleSave={handleSave}
            handleNext={handleNext}
          />
        </form>
      </div>
    </>
  );
};

export default ProfileStep;
