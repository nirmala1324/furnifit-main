import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/about_us_page.scss";

const AboutUsPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="about-us-page">
        <div className="group-230AU">
          <div className="navAU">
            <div className="elegant-logo-2AU"></div>
            <NavLink to="/LandingPage" className="homeAU">
              Home
            </NavLink>
            <NavLink
              to="/recommendation"
              className="recommendationAU"
            >
              Recommendation
            </NavLink>
            <NavLink to="/furniture-page" className="furnitureAU">
              Furniture
            </NavLink>
            <NavLink to="/about-us" className="aboutAU">
              About
            </NavLink>
          </div>
        </div>
        <div className="nav-MobAU">
          <div
            className="clarityvmw-app-line"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={menuOpen ? "nav-page-mob-resive" : ""}>
              <div className="closenav" />
              <div className="elegant-logo-21"></div>
              {menuOpen && (
                <>
                  <NavLink to="/LandingPage" className="homeAU">
                    Home
                  </NavLink>
                  <NavLink
                    to="/RecommendationPageRevise"
                    className="recommendationAU"
                  >
                    Recommendation
                  </NavLink>
                  <NavLink to="/FurniturePageRevise" className="furnitureAU">
                    Furniture
                  </NavLink>
                  <NavLink to="/AboutUsPage" className="aboutAU">
                    About
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="elegant-logo-4-crop-1AU"></div>
        </div>

        <div className="landingAU">
          <div className="container-1AU">
            <span className="with-the-implementation-of-cutting-edge-technologies-such-as-augmented-reality-and-machine-learning-furnifit-is-determined-to-become-areliable-partner-for-many-people-in-arranging-spaces-with-the-right-furniture-thus-furnifit-is-not-just-an-ordinary-ar-platform-but-acomprehensive-solution-that-helps-overcome-doubts-and-uncertainties-in-the-furniture-purchasing-process">
              With the implementation of cutting-edge technologies such as
              Augmented Reality and machine learning, Furnifit is determined to
              become a reliable partner for many people in arranging spaces with
              the right furniture. Thus, Furnifit is not just an ordinary AR
              platform, but a comprehensive solution that helps overcome doubts
              and uncertainties in the furniture purchasing process.
            </span>
          </div>
          <div className="container-2AU">
            <span className="founded-by-agroup-of-informatics-students-department-in-president-university-furnifit-is-not-just-an-academic-project-but-also-an-expression-of-commitment-to-bring-innovative-solutions-this-team-consists-of-rizvany-aisyah-anisya-niken-manik-kartika-nirmala-pusparatna-and-yusi-roziana-who-combine-the-knowledge-and-skills-they-acquired-during-their-study-to-bring-technological-convenience-into-everyday-life">
              Founded by a group of Informatics students department in President
              University, Furnifit is not just an academic project but also an
              expression of commitment to bring innovative solutions. This team
              consists of Rizvany Aisyah, Anisya Niken, Manik Kartika, Nirmala
              Pusparatna, and Yusi Roziana, who combine the knowledge and skills
              they acquired during their study to bring technological
              convenience into everyday life.
            </span>
            <div className="image-30"></div>
          </div>
          <div className="image-28"></div>
          <div className="container-3AU">
            <div className="furnifit-and-team">Furnifit and Team</div>
            <span className="furnifit-established-in-2024-is-aresponse-to-the-common-issue-faced-by-many-people-when-purchasing-furniture-uncertainty-about-placement-with-aclear-vision-furnifit-was-founded-with-the-goal-of-convincing-consumers-to-choose-products-that-align-with-their-desires-through-the-integration-of-augmented-reality-ar-technology-in-the-spaces-they-desire">
              Furnifit, established in 2024, is a response to the common issue
              faced by many people when purchasing furniture uncertainty about
              placement. With a clear vision, Furnifit was founded with the goal
              of convincing consumers to choose products that align with their
              desires through the integration of Augmented Reality (AR)
              technology in the spaces they desire.
            </span>
          </div>
          <div className="desain-tanpa-judul-31"></div>
        </div>
        <div className="footerAU">
          <div className="vector-5AU"></div>
          <div className="containerAU">
            <div className="footer-furni-fitAU">
              <div className="furni-fitAU">FurniFit</div>
              <span className="all-rights-reservedAU">
                © 2024. All rights reserved
              </span>
            </div>
            <div className="nav-footerAU">
              <Link to="/AboutUsPage" className="about-usAU">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
