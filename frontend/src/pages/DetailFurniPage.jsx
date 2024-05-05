import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/detail_furni_page.scss";

// IMPORTING ICONS
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Chip } from "@mui/material";

// Material UI
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LoadingPage from "./LoadingPage";

const DetailFurniPage = () => {
  const navigate = useNavigate();

  const { furni_id } = useParams();
  const [furnitureData, setFurnitureData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-main-frf8.onrender.com/api/furniture/${furni_id}`);
        setFurnitureData(response.data);
      } catch (error) {
        console.error("Error fetching furniture data:", error);
      }
    };

    fetchData();
  }, [furni_id]);

  // navbar
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".nav");
      if (navbar) {
        const distanceFromTop = navbar.offsetTop;

        if (window.pageYOffset > distanceFromTop) {
          setIsNavbarFixed(true);
        } else {
          setIsNavbarFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {Object.keys(furnitureData).length > 0 ? (
        <div className="furniture-page-revise">
          <div className="group-230">
            <div className={`nav ${isNavbarFixed ? "fixed" : ""}`}>
              <div className="elegant-logo-2"></div>
              <NavLink to="/" className="home">
                Home
              </NavLink>
              <NavLink to="/recommendation" className="recommendation">
                Recommendation
              </NavLink>
              <NavLink to="/furniture-page" className="furniture">
                <strong>Furniture</strong>
              </NavLink>
              <NavLink to="/about-us" className="about">
                About Us
              </NavLink>
            </div>
          </div>
          <div className="nav-MobLP">
            <div
              className="clarityvmw-app-lineLP"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon style={{ fontSize: "42px", color: "#4b4b4b" }} />
              <div className={menuOpen ? "nav-page-mob-resiveLP" : ""}>
                {menuOpen && (
                  <div className="closenavLP">
                    <CloseIcon
                      style={{
                        fontSize: "31px",
                        marginTop: "-9px",
                        marginRight: "-6px",
                        color: "#4b4b4b",
                      }}
                    />
                  </div>
                )}
                <div className="elegant-logo-21LP"></div>
                {menuOpen && (
                  <>
                    <NavLink to="/" className="home">
                      Home
                    </NavLink>
                    <NavLink to="/recommendation" className="recommendation">
                      Recommendation
                    </NavLink>
                    <NavLink to="/furniture-page" className="furniture">
                      <b>Furniture</b>
                    </NavLink>
                    <NavLink to="/about-us" className="about">
                      About Us
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="elegant-logo-4-crop-1LP"></div>
          </div>
          <div className="content-container">
            <div className="breadcrumb">
              <p className="link1" onClick={() => navigate("/furniture-page")}>
                Furniture
              </p>
              <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
              <p className="bread-name">{furnitureData.furni_name}</p>
            </div>
            <div className="highlight-content">
              <div className="title-container">
                <div className="furni-name">{furnitureData.furni_name}</div>
              </div>
              <div className="vectary-left-container">
                <iframe
                  id="d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c"
                  src={furnitureData.vectary_link}
                  frameborder="0"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="right-container">
                <div className="furni-name-scnd">
                  {furnitureData.furni_name}
                </div>
                <div className="furni-subspace subtitle">
                  {furnitureData.space_cat}
                </div>
                <div className="text-format">
                  <div className="key div1">Sub Space Category</div>
                  <div className="value div2">
                    : &nbsp;&nbsp;{furnitureData.sub_space_cat}
                  </div>

                  <div className="key div3">Furniture Type</div>
                  <div className="value div4">
                    : &nbsp;&nbsp;{furnitureData.furni_type}
                  </div>

                  <div className="key div5">Dimension</div>
                  <div className="value div6">
                    : &nbsp;&nbsp;{furnitureData.furni_dimension[0]} x{" "}
                    {furnitureData.furni_dimension[1]} x{" "}
                    {furnitureData.furni_dimension[2]} mm
                  </div>

                  <div className="key div7">Style</div>
                  <div className="value div8">
                    : &nbsp;&nbsp;{furnitureData.furni_style}
                  </div>

                  <div className="key div9">Material Tag</div>
                  <div className="value div10">
                    : &nbsp;&nbsp;
                    {furnitureData.material_tag.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        style={{ marginRight: "3px" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="desc-content">
              <div className="title2 subtitle">Description</div>
              <div className="underline"></div>
              <div className="desc-para">{furnitureData.furni_desc}</div>
            </div>
          </div>
          <div className="detail-footer">
            <div className="footer">
              <div className="vector-5"></div>
              <div className="container-6">
                <div className="footer-furni-fit">
                  <div className="furni-fit">FurniFit</div>
                  <span className="all-rights-reserved">
                    © 2024. All rights reserved
                  </span>
                </div>
                <div className="nav-footer">
                  <span
                    className="about-us"
                    onClick={() => navigate("/about-us")}
                  >
                    About Us
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default DetailFurniPage;
