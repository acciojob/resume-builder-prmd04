import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../styles/resumePreview.css";

const ResumePreview = () => {
  const { profile, education, skills, miniProjects, socialLinks } = useSelector(
    (state) => state.resume
  );

  const handleDownload = () => {
    const resumeElement = document.getElementById("resume");

    html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const imgHeight = (canvasHeight * pageWidth) / canvasWidth;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
  heightLeft -= pageHeight;

  // Additional pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${profile.fname || "My"}_Resume.pdf`);
});

  };

  return (
    <div className="resume-preview-container">
      <div id="resume" className="resume">
        <header className="resume-header">
          {profile.url && (
            <img src={profile.url} alt="Profile" className="profile-photo" />
          )}
          <div>
            <h1>
              {profile.fname || "First"} {profile.lname || "Last"}
            </h1>
            <p className="contact-info">{profile.address || "Your Address"}</p>
            <p className="contact-info">📞 {profile.phone || "Your Phone"}</p>
          </div>
        </header>

        <section className="resume-section">
          <h2>Education</h2>
          <hr />
          {education.map((edu, i) => (
            <div key={i} className="edu-item">
              <h3>{edu.courseName}</h3>
              <p>
                {edu.college} | {edu.completionYear}
              </p>
              <p>Percentage: {edu.percentage}%</p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <hr />
          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2>Mini Projects</h2>
          <hr />
          {miniProjects.map((proj, i) => (
            <div key={i} className="project-item">
              <h3>{proj.projectName}</h3>
              <p className="tech-stack">{proj.techStack}</p>
              <p>{proj.description}</p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Social Links</h2>
          <hr />
          <ul className="social-list">
            {socialLinks.map((link, i) => (
              <li key={i}>{link}</li>
            ))}
          </ul>
        </section>
      </div>

      <button className="download-btn" onClick={handleDownload}>
        📄 Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
