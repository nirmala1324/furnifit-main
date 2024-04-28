import React, {useEffect, useState} from "react";
import "../styles/furniture_page.scss";
import axios from 'axios';

// IMPORT CARDS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Popper } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

const FurnituresPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();


  // HANDLE PAGINATION =========================================================
  
  const limitedData = data.slice(0, 12);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/furnitures?page=${page}`);
      setData(response.data.furnitureData);
      setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  // HANDLE SCROLL SEARCH BAR ====================================================
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);

  // Inside LandingPage component
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
  
      if (currentPosition > scrollPosition && currentPosition > 156) {
        // Scrolling down, hide the search bar
        setIsSearchBarVisible(false);
      } else if (currentPosition < 156) {
        // At the top of the page, show the search bar
        setIsSearchBarVisible(true);
      } else if (currentPosition < scrollPosition) {
        // Scrolling up, but not yet reached the top, show the search bar if previously hidden
        if (!isSearchBarVisible) {
          setIsSearchBarVisible(false);
        }
      }
  
      // Update the scroll position
      setScrollPosition(currentPosition);
    };
  
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
  
    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, isSearchBarVisible]);


  // HANDLE CLICK TO DETAIL FURNITURE

  const handleCardClick = (furni_id) => {
    // Redirect to the targeted page with the furni_id as a URL parameter
    navigate(`/detail-furniture/${furni_id}`);
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
          <div className="container-top">
            <div className="dive-into-your-needs">Dive into yo ur needs</div>
          </div>
          <div className='group-252'>
            <div className={`search-bar ${isSearchBarVisible ? '' : 'hidden'}`}>
              <input
                className="ex-ineed-awhite-chair inputsearch"
                type="text"
                placeholder="ex. I need a white chair" // Anda dapat menambahkan kelas CSS untuk styling
              />
              <div className="group"></div>
            </div>
          </div>
          <span className="furniture-items">Furniture Items</span>
          <div className="grid-container">
          {limitedData.map((item) => (
            <div key={item.furni_id} class="grid-item" onClick={() => handleCardClick(item.furni_id)}>
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
          
        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
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
                <span className="about-us" onClick={() => navigate("/about-us")} >About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default FurnituresPage