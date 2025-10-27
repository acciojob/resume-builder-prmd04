import { createSlice} from "@reduxjs/toolkit";


const initialState = {
  currentStep: 1,
  profile: {
    fname: "",
    lname: "",
    address: "",
    phone: "",
    url: "",
  },
  education: [],
  skills: [],
  miniProjects: [],
  socialLinks: [],
};

const ResumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    updateEducation: (state, action) => {
      state.education = action.payload;
    },

    updateSkills: (state, action) => {
      state.skills = action.payload;
    },

    updateMiniProjects: (state, action) => {
      state.miniProjects = action.payload;
    },

    updateSocialLinks: (state, action) => {
      state.socialLinks = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },

    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetForm:(state) => {
      return initialState;
    }
  },
});

export const {
  updateProfile,
  updateSkills,
  updateEducation,
  updateMiniProjects,
  updateSocialLinks,
  nextStep,
  prevStep,
  resetForm
} = ResumeSlice.actions;

export default ResumeSlice.reducer