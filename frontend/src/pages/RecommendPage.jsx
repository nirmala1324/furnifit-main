import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/recommend_page.scss";
import axios from "axios";

// Import Material UI
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const ChipModal = ({ open, handleClose }) => {
  const [fieldChips, setFieldChips] = useState({
    space_category: [],
    sub_space_category: [],
    furni_style: [],
    furni_type: [],
    furni_material: [],
  });

  const handleChipClick = (field, chip) => {
    const updatedFieldChips = { ...fieldChips };
    const index = updatedFieldChips[field].indexOf(chip);
    if (index === -1) {
      updatedFieldChips[field] = [...updatedFieldChips[field], chip];
    } else {
      updatedFieldChips[field] = updatedFieldChips[field].filter((c) => c !== chip);
    }
    setFieldChips(updatedFieldChips);
  };

  const handleSubmit = async () => {
    console.log(fieldChips)
    try {
      const response = await axios.post('/recommend', {
        inputData: fieldChips,
      });
      console.log(response.data.recommended_products);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md" // Set to false to disable the maxWidth property
      fullWidth={true}
    >
      <DialogContent style={{ paddingInline: '40px' }}>
        <div className="modal-header">
          <div className="modal-title">Recommender System</div>
          <div className="modal-desc">
            In order to get your recommended furniture items, you only need to
            insert your preference based on necessary below.
          </div>
          <div className="uderline-modal"></div>
        </div>
        <div className="modal-recommend-content">
          <div className="left-recommend-container">
            <div className="the-field">
              <strong>Space Category</strong>
              <div className="the-chips">
              {["Outdoor", "Indoor"].map(
                (chip) => (
                  <Chip
                    sx={{mr: 0.5, mt: 0.7}}
                    key={chip}
                    label={chip}
                    clickable
                    color={
                      fieldChips.space_category.includes(chip) ? "primary" : "default"
                    }
                    onClick={() => handleChipClick("space_category", chip)}
                  />
                )
              )}
              </div>
            </div>
            <div className="the-field">
              <strong>Sub Space Category</strong>
              <div className="the-chips">
              {["Bathroom", "Bedroom", "Garden", "Dining Room", "Dressing Room", "Living Room", "Kitchen"].map((chip) => (
                <Chip
                  sx={{mr: 0.5, mt: 0.7}}
                  key={chip}
                  label={chip}
                  clickable
                  color={
                    fieldChips.sub_space_category.includes(chip) ? "primary" : "default"
                  }
                  onClick={() => handleChipClick("sub_space_category", chip)}
                />
              ))}
              </div>
            </div>
            <div className="the-field">
              <strong>Furniture Style</strong>
              <div className="the-chips">
              {["Modern", "Classy", "Minimalist", "Traditional", "Industrial", "Scandinavian",
                "Rustic", "Shabby Chic", "Classic", "Japanese Zen", "Mid-Century Modern", "Pop-Art", "Tropical/Natural"
              ].map((chip) => (
                <Chip
                  sx={{mr: 0.5, mt: 0.7}} 
                  key={chip}
                  label={chip}
                  clickable
                  color={
                    fieldChips.furni_style.includes(chip) ? "primary" : "default"
                  }
                  onClick={() => handleChipClick("furni_style", chip)}
                />
              ))}
              </div>
            </div>
          </div>
          <div className="right-recommend-container">
            <div className="the-field">
              <strong>Furniture Type</strong>
              <div className="the-chips">
              {["Coffee Table", "Stool", "Drawer", "Armchair", "Sofa",
                "TV Stand", "Side Table", "Cabinet", "Wardrobe", "Mirror",
                "Dining Chair", "Pouf", "Doormat", "Desk", "Chair", "Dining Table", "Seat/Bench"
              ].map(
                (chip) => (
                  <Chip
                    sx={{mr: 0.5, mt: 0.7}}
                    key={chip}
                    label={chip}
                    clickable
                    color={
                      fieldChips.furni_type.includes(chip) ? "primary" : "default"
                    }
                    onClick={() => handleChipClick("furni_type", chip)}
                  />
                )
              )}
              </div>
            </div>
            <div className="the-field">
              <strong>Furniture Material</strong>
              <div className="the-chips">
              {["Wood", "Fabric", "Metal", "Rubber", "Glass",
                "bamboo", "Plastic", "Acrylic", "Foam", "Leather", "Wax", "Stone"
              ].map((chip) => (
                <Chip
                  sx={{mr: 0.5, mt: 0.7}}
                  key={chip}
                  label={chip}
                  clickable
                  color={
                    fieldChips.furni_material.includes(chip) ? "primary" : "default"
                  }
                  onClick={() => handleChipClick("furni_material", chip)}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RecommendPage = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (fieldChips) => {
    console.log("Submitted:", fieldChips);
    // You can perform additional actions here, such as sending the data to the backend
  };

  return (
    <>
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
        <div className="landing">
          {/* HERO CONTAINER */}
          <div className="hero-container">
            <div className="overlay"></div>
            <div className="title-recommend">
              Tell Us, <br /> What are You Looking for?
            </div>
            <div className="para-recommend">
              Hi, Furni User!
              <br />
              It's awesome that you've made it to our recommendation system.
              <br />
              It's super easy! Just let us know your preferences in items you're{" "}
              <br />
              looking for, and we'll provide recommendations right away.
            </div>
            <div className="button-recommend">Start</div>
          </div>

          {/* RECOMMENDATION RESULTS */}
          <div className="result-container">
            <div className="header-recommend">
              Recommended Furniture based on Your Preferences
            </div>
            <div className="the-result">
              <div>
                <Button
                  onClick={handleOpenModal}
                  color="primary"
                  variant="contained"
                >
                  Open Modal
                </Button>
                <ChipModal
                  open={modalOpen}
                  handleClose={handleCloseModal}
                  onSubmit={handleFormSubmit}
                />
              </div>
            </div>
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
    </>
  );
};
