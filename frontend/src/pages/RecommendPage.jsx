import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from "react";
import "../styles/recommend_page.scss";
import axios from 'axios';

export const RecommendPage = () => {
  const navigate = useNavigate()
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
