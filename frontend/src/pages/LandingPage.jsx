import React from "react";
import "../styles/landing_page.scss";

// IMPORT CARDS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Popper } from "@mui/material";

const LandingPage = ({data}) => {

  const limitedData = data.slice(0, 12);

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
          <div className="container-top">
            <div className="dive-into-your-needs">Dive into your needs</div>
          </div>
          <div className="group-252">
            <div className="search-bar">
              <input
                className="ex-ineed-awhite-chair inputsearch"
                type="text"
                placeholder="ex. I need a white chair" // Anda dapat menambahkan kelas CSS untuk styling
              />
              <div className="group"></div>
            </div>
          </div>
          <span className="furniture-items">Furniture Items</span>
          <div class="grid-container">
          {limitedData.map((item) => (
            <div key={item.furni_id} class="grid-item">
              <Card sx={{ maxWidth: 345, minHeight: 400, backgroundColor: "#D9E2D7" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="284"
                    image={item.furni_picture.url}
                    alt="green iguana"
                  />
                  <CardContent style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", marginTop: 8}}>
                    <Typography gutterBottom style={{fontFamily: "poppins", fontWeight: "600", fontSize: "16px", maxWidth: "170px"}} variant="h5" component="div">
                    {item.furni_name}
                    </Typography>
                    <div className="bottom-text">
                    <Typography variant="body2" style={{fontFamily: "poppins"}} color="text.secondary">
                    {item.furni_type}
                    </Typography>
                    <Typography variant="body2" style={{fontFamily: "poppins", textAlign: "right"}} color="text.secondary">
                    {item.space_cat}
                    </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>))}
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
                <span className="about-us">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
