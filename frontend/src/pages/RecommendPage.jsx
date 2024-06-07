import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/recommend_page.scss";
import {
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Close as CloseIcon, Menu as MenuIcon } from "@mui/icons-material";


// Chip data structure
const chip_data = {
  Indoor: {
    "Living Room": {
      Modern: ["Coffee Table", "Armchair", "Sofa", "Drawer", "Stool", "Pouf"],
      Classic: ["Sofa", "Armchair", "Desk"],
      "Pop-Art": ["Coffee Table", "Sofa", "Dining Table", "Stool", "Chair"],
      Classy: ["Cabinet", "Armchair", "Sofa", "Coffee Table"],
      Industrial: ["Coffee Table"],
      "Japanese Zen": ["Chair"],
      "Tropical/Natural": ["TV Stand", "Stool"],
      Traditional: ["Cabinet"],
      "Shabby Chic": ["Cabinet"],
      Scandinavian: ["Coffee Table"],
      "Mid-Century Modern": ["Coffee Table", "Drawer", "Armchair"],
      Minimalism: ["Coffee Table", "Sofa"],
    },
    Bedroom: {
      Rustic: ["Cabinet"],
      Industrial: ["Wardrobe"],
      "Japanese Zen": ["Drawer"],
      "Shabby Chic": ["Side Table", "Drawer"],
      Scandinavian: ["Wardrobe", "Drawer", "Side Table"],
      Minimalism: ["Dresser"],
      "Tropical/Natural": ["Side Table"],
      Classy: ["Wardrobe"],
    },
    "Dressing Room": {
      Rustic: ["Wardrobe"],
      Industrial: ["Wardrobe"],
      "Japanese Zen": ["Wardrobe"],
      Traditional: ["Wardrobe"],
      "Shabby Chic": ["Wardrobe"],
      Scandinavian: ["Dresser"],
      Minimalism: ["Stool"],
    },
    "Dining Room": {
      Classic: ["Dining Chair", "Dining Table"],
      Rustic: ["Dining Table"],
      Classy: ["Dining Table"],
      Industrial: ["Dining Chair"],
      "Japanese Zen": ["Dining Table"],
      Traditional: ["Dining Table", "Dining Chair"],
      "Mid-Century Modern": ["Cabinet"],
    },
    Bars: {
      Rustic: ["Side Table"],
    },
    Bathroom: {
      Rustic: ["Stool", "Cabinet"],
      Classy: ["Cabinet"],
      Industrial: ["Mirror"],
      "Japanese Zen": ["Doormat"],
    },
    Kitchen: {
      Industrial: ["Kitchen Island"],
    },
  },
  Outdoor: {
    Terrace: {
      Industrial: ["Coffee Table"],
      "Tropical/Natural": ["Side Table"],
      Traditional: ["Armchair"],
      Modern: ["Sofa", "Armchair"],
    },
    Garden: {
      Rustic: ["Armchair"],
      Classy: ["Seat/Bench"],
      "Japanese Zen": ["Seat/Bench"],
      "Tropical/Natural": ["Sofa"],
      "Mid-Century Modern": ["Side Table"],
    },
    Balcony: {
      Classy: ["Pouf", "Armchair"],
      Traditional: ["Coffee Table"],
      Minimalism: ["Pouf"],
      Modern: ["Pouf"],
    },
  },
  furni_material: [
    "Wood",
    "Fabric",
    "Metal",
    "Rubber",
    "Glass",
    "Bamboo",
    "Plastic",
    "Acrylic",
    "Foam",
    "Leather",
    "Wax",
    "Stone",
  ],
};

// MODAL CHIP FORM RECOMMENDATION INPUT
const ChipModal = ({ open, handleClose, receiveRecommendData }) => {
  const [selectedChips, setSelectedChips] = useState({
    space_category: null,
    sub_space_category: null,
    furni_style: null,
    furni_type: [],
    furni_material: [],
  });

  const handleChipClick = (level, chip) => {
    setSelectedChips((prev) => ({
      ...prev,
      [level]: chip,
      ...(level === "space_category" && {
        sub_space_category: null,
        furni_style: null,
        furni_type: [],
      }),
      ...(level === "sub_space_category" && {
        furni_style: null,
        furni_type: [],
      }),
      ...(level === "furni_style" && { furni_type: [] }),
    }));
  };

  const handlefurni_typeChipClick = (chip) => {
    setSelectedChips((prev) => ({
      ...prev,
      furni_type: prev.furni_type.includes(chip)
        ? prev.furni_type.filter((c) => c !== chip)
        : [...prev.furni_type, chip],
    }));
  };

  const handlefurni_materialChipClick = (chip) => {
    setSelectedChips((prev) => ({
      ...prev,
      furni_material: prev.furni_material.includes(chip)
        ? prev.furni_material.filter((c) => c !== chip)
        : [...prev.furni_material, chip],
    }));
  };

  const handleResetChips = () => {
    setSelectedChips({
      space_category: null,
      sub_space_category: null,
      furni_style: null,
      furni_type: [],
      furni_material: [],
    });
  };

  const handleSubmit = async () => {
    console.log(selectedChips);
    try {
      const response = await axios.post("https://backend-main-frf8.onrender.com/recommend", {
        inputData: selectedChips,
      });
      const recommendData = response.data.recommended_products;
      console.log(recommendData);
      receiveRecommendData(recommendData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogContent style={{ paddingInline: "40px" }}>
        <div className="modal-header">
          <div className="modal-title">Recommender System</div>
          <div className="modal-desc">
            In order to get your recommended furniture items, you only need to
            insert your preference based on necessary below.
          </div>
          <div className="underline-modal"></div>
        </div>
        <div className="modal-recommend-content">
          <div className="the-field">
            <strong>Space Category</strong>
            <div className="the-chips">
              {Object.keys(chip_data)
                .filter((key) => key !== "furni_material")
                .map((chip) => (
                  <Chip
                    sx={{ mr: 0.5, mt: 0.7 }}
                    key={chip}
                    label={chip}
                    clickable
                    color={
                      selectedChips.space_category === chip
                        ? "success"
                        : "default"
                    }
                    onClick={() => handleChipClick("space_category", chip)}
                  />
                ))}
            </div>
            <div className="separator"></div>
          </div>
          {selectedChips.space_category && (
            <div className="the-field">
              <strong>Sub Space Category</strong>
              <div className="the-chips">
                {Object.keys(chip_data[selectedChips.space_category]).map(
                  (chip) => (
                    <Chip
                      sx={{ mr: 0.5, mt: 0.7 }}
                      key={chip}
                      label={chip}
                      clickable
                      color={
                        selectedChips.sub_space_category === chip
                          ? "success"
                          : "default"
                      }
                      onClick={() =>
                        handleChipClick("sub_space_category", chip)
                      }
                    />
                  )
                )}
              </div>
              <div className="separator"></div>
            </div>
          )}
          {selectedChips.sub_space_category && (
            <div className="the-field">
              <strong>Furniture Style</strong>
              <div className="the-chips">
                {Object.keys(
                  chip_data[selectedChips.space_category][
                    selectedChips.sub_space_category
                  ]
                ).map((chip) => (
                  <Chip
                    sx={{ mr: 0.5, mt: 0.7 }}
                    key={chip}
                    label={chip}
                    clickable
                    color={
                      selectedChips.furni_style === chip ? "success" : "default"
                    }
                    onClick={() => handleChipClick("furni_style", chip)}
                  />
                ))}
              </div>
              <div className="separator"></div>
            </div>
          )}
          {selectedChips.furni_style && (
            <div className="the-field">
              <strong>Furniture Type</strong>
              <div className="the-chips">
                {chip_data[selectedChips.space_category][
                  selectedChips.sub_space_category
                ][selectedChips.furni_style].map((chip) => (
                  <Chip
                    sx={{ mr: 0.5, mt: 0.7 }}
                    key={chip}
                    label={chip}
                    clickable
                    color={
                      selectedChips.furni_type.includes(chip)
                        ? "success"
                        : "default"
                    }
                    onClick={() => handlefurni_typeChipClick(chip)}
                  />
                ))}
              </div>
              <div className="separator"></div>
            </div>
          )}
          {selectedChips.space_category &&
            selectedChips.sub_space_category &&
            selectedChips.furni_style && (
              <div className="the-field">
                <strong>Furniture Material</strong>
                <div className="the-chips">
                  {chip_data.furni_material.map((chip) => (
                    <Chip
                      sx={{ mr: 0.5, mt: 0.7 }}
                      key={chip}
                      label={chip}
                      clickable
                      color={
                        selectedChips.furni_material.includes(chip)
                          ? "success"
                          : "default"
                      }
                      onClick={() => handlefurni_materialChipClick(chip)}
                    />
                  ))}
                </div>
                <div className="separator"></div>
              </div>
            )}
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }} style={{ justifyContent: "center" }}>
        <Button
          onClick={handleClose}
          color="mainRed"
          variant="contained"
          style={{ borderRadius: "10px", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleResetChips}
          color="mainGrey"
          variant="contained"
          style={{ borderRadius: "10px", color: "white" }}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          color="mainGreen"
          variant="contained"
          style={{ borderRadius: "10px", color: "white" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RecommendPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [recommendData, setRecommendData] = useState([]);
  const recommendedRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && recommendData.length === 0) {
        window.scrollTo(0, 0);
        containerRef.current.style.overflow = "hidden";
      } else {
        containerRef.current.style.overflow = "auto";
      }
    };

    if (recommendData.length > 0 && recommendedRef.current) {
      recommendedRef.current.scrollIntoView({ behavior: "smooth" });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [recommendData]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const receiveRecommendData = (data) => {
    setRecommendData(data);
  };

  const handleFormSubmit = (fieldChips) => {
    console.log("Submitted:", fieldChips);
  };

  // HANDLE CLICK TO DETAIL FURNITURE

  const handleCardClick = (furni_id) => {
    // Redirect to the targeted page with the furni_id as a URL parameter
    navigate(`/detail-furniture/${furni_id}`);
  };

  // navbar
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="furniture-page-revise" ref={containerRef}>
        <div className="group-230">
          <div className={`nav ${isNavbarFixed ? "fixed" : ""}`}>
            <div className="elegant-logo-2"></div>
            <div
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
              className="home"
            >
              Home
            </div>
            <NavLink to="/recommendation" className="recommendation">
              <strong>Recommendation</strong>
            </NavLink>
            <NavLink to="/furniture-page" className="furniture">
              Furniture
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
                    <b>Recommendation</b>
                  </NavLink>
                  <NavLink to="/furniture-page" className="furniture">
                    Furniture
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
            <div className="button-recommend" onClick={handleOpenModal}>
              Start
            </div>
          </div>
          {/* RECOMMENDATION RESULTS */}
          <div
            className="result-container"
            ref={recommendedRef}
            id="recommended furniture"
          >
            <div className="header-recommend">
              <div className="inner-text">
                Recommended Furniture based on Your Preferences
              </div>
            </div>
            <div className="the-result">
              <div>

                <ChipModal
                  open={modalOpen}
                  handleClose={handleCloseModal}
                  onSubmit={handleFormSubmit}
                  receiveRecommendData={receiveRecommendData}
                />

                <div className="grid-container">
                  {recommendData.map((item) => (
                    <div
                      key={item.furni_id}
                      className="grid-item"
                      onClick={() => handleCardClick(item.furni_id)}
                    >
                      <Card
                        sx={{
                          maxWidth: "100%",
                          minHeight: 400,
                          backgroundColor: "#D9E2D7",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="284"
                            image={item.furni_picture.url}
                            alt="green iguana"
                            width="100%"
                          />
                          <CardContent
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: "100%",
                              marginTop: 8,
                              width: "89%",
                            }}
                          >
                            <Typography
                              gutterBottom
                              style={{
                                fontFamily: "poppins",
                                fontWeight: "600",
                                fontSize: "16px",
                                maxWidth: "170px",
                              }}
                              variant="h5"
                              component="div"
                            >
                              {item.furni_name}
                            </Typography>
                            <div className="bottom-text">
                              <Typography
                                variant="body2"
                                style={{ fontFamily: "poppins" }}
                                color="text.secondary"
                              >
                                {item.furni_type}
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  fontFamily: "poppins",
                                  textAlign: "right",
                                }}
                                color="text.secondary"
                              >
                                {item.space_cat}
                              </Typography>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="home-page-3-footer-recommend">
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
        </div>
      </div>
    </>
  );
};
