import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/detail_furni_page.scss";

// IMPORTING ICONS
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Chip } from "@mui/material";

const DetailFurniPage = () => {
  const navigate = useNavigate();

  const { furni_id } = useParams();
  const [furnitureData, setFurnitureData] = useState({});

  console.log(furni_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/furniture/${furni_id}`);
        setFurnitureData(response.data);
      } catch (error) {
        console.error("Error fetching furniture data:", error);
      }
    };

    fetchData();
  }, [furni_id]);

  console.log(furnitureData);

  return (
    <>
      {Object.keys(furnitureData).length > 0 ? (
        <div className="furniture-page-revise">
          <div className="nav">
            <div className="elegant-logo-2"></div>
            <div className="home">Home</div>
            <div className="recommendation">Recommendation</div>
            <div className="container-line">
              <div className="furniture">Furniture</div>
              <div className="group-229">
                <div className="line-1"></div>
              </div>
            </div>
            <div className="about">About</div>
            <div className="user-cicrle-duotone"></div>
          </div>
          <div className="content-container">
            <div className="breadcrumb">
              <p className="link1">Furniture</p>
              <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
              <p className="bread-name">{furnitureData.furni_name}</p>
            </div>
            <div className="highlight-content">
              <div className="vectary-left-container">
                <iframe
                  id="d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c"
                  src={furnitureData.vectary_link}
                  frameborder="0"
                  width="100%"
                  height="560"
                />
              </div>
              <div className="right-container">
                <div className="furni-name">{furnitureData.furni_name}</div>
                <div className="furni-subspace subtitle">
                  {furnitureData.space_cat}
                </div>
                <div className="text-format">
                  <div className="key">Sub Space Category</div>
                  <div className="value">
                    : &nbsp;&nbsp;{furnitureData.sub_space_cat}
                  </div>

                  <div className="key">Furniture Type</div>
                  <div className="value">
                    : &nbsp;&nbsp;{furnitureData.furni_type}
                  </div>

                  <div className="key">Dimension</div>
                  <div className="value">
                    : &nbsp;&nbsp;{furnitureData.furni_dimension[0]} x{" "}
                    {furnitureData.furni_dimension[1]} x{" "}
                    {furnitureData.furni_dimension[2]} mm
                  </div>

                  <div className="key">Style</div>
                  <div className="value">
                    : &nbsp;&nbsp;{furnitureData.furni_style}
                  </div>

                  <div className="key">Material Tag</div>
                  <div className="value">
                    : &nbsp;&nbsp;
                    {furnitureData.material_tag.map((tag, index) => (
                      <Chip key={index} label={tag} />
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
          <div className="home-page-3-footer">
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
        <div>Loading...</div>
      )}
    </>
  );
};

export default DetailFurniPage;
