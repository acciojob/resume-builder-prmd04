
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from "./component/Header";
import ProfileStep from "./pages/ProfileStep";
import EducationStep from "./pages/EducationStep";
import SkillsStep from "./pages/SkillsStep";
import MiniProjectsSteps from "./pages/MiniProjectsSteps";
import SocialLinksStep from "./pages/SocialLinksStep";
import ResumePreview from "./pages/ResumePreview";

import './../styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<ProfileStep/>}/>
        <Route path="/education" element={<EducationStep/>}/>
        <Route path="/skill" element={<SkillsStep/>}/>
        <Route path="/mini-project" element={<MiniProjectsSteps/>}/>
        <Route path="/social-link" element={<SocialLinksStep/>}/>
        <Route path="/preview-resume" element={<ResumePreview/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
