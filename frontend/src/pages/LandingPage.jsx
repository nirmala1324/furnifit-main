import React, { useState, useEffect } from "react";
import "../styles/landing_page.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Material UI
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".nav");
      const distanceFromTop = navbar.offsetTop;

      if (window.pageYOffset > distanceFromTop) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
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
      <div className="landing-page-revise-1">
        <div className="elegant-logo-4-crop-1"></div>

        <div className="group-230">
          <div className={`nav ${isNavbarFixed ? "fixed" : ""}`}>
            <div className="elegant-logo-2"></div>
            <NavLink to="/" className="home">
              <strong>Home</strong>
            </NavLink>
            <NavLink to="/recommendation" className="recommendation">
              Recommendation
            </NavLink>
            <NavLink to="/furniture-page" className="furniture">
              Furniture
            </NavLink>
            <NavLink to="/about-us" className="about">
              About
            </NavLink>
          </div>
        </div>
        <div className="nav-MobLP">
          <div
            className="clarityvmw-app-lineLP"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon style={{fontSize: "42px", color: "#4b4b4b"}}/>
            <div className={menuOpen ? "nav-page-mob-resiveLP" : ""}>
              {menuOpen && <div className="closenavLP"><CloseIcon style={{fontSize: '31px', marginTop: '-9px', marginRight: '-6px', color: '#4b4b4b'}}/></div>}
              <div className="elegant-logo-21LP"></div>
              {menuOpen && (
                <>
                  <NavLink to="/" className="home">
                    <b>Home</b>
                  </NavLink>
                  <NavLink
                    to="/recommendation"
                    className="recommendation"
                  >
                    Recommendation
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

        <div className="frame-32">
          <div className="landing">
            <div className="introlanding">
              <div className="image-14"></div>
              <div className="introbutt">
                <div className="explore-home">
                  <div onClick={() => navigate("/furniture-page")} className="explore">Explore</div>
                </div>
                <div className="try-now-home">
                  <div onClick={() => navigate("/recommendation")} className="try-now">Try Now</div>
                </div>
              </div>
              <span className="augment-your-space-amplify-your-reality">
                &#34;Augment Your Space, Amplify Your Reality&#34;
              </span>
            </div>
            <div className="container-5">
              <span className="titleser">OUR SERVICES</span>
              <div className="container-10">
                <div className="image-16"></div>
                <div className="container-1">
                  <div className="ar-furniture">AR Furniture</div>
                  <span className="visualize-furniture-in-your-space-instantly-browse-our-wide-range-of-furniture-and-decor-options-on-our-intuitive-web-platform-then-see-them-in-real-time-using-your-smartphone-camera">
                    Visualize furniture in your space instantly. Browse our wide
                    range of furniture and style options on our intuitive web
                    platform, then see them using your smartphone camera.
                  </span>
                </div>
              </div>
              <div className="container-6">
                <div className="container-3">
                  <div className="furniture-recommendation">
                    Furniture Recommendation
                  </div>
                  <span className="every-home-is-unique-from-the-living-room-to-the-bedroom-we-provide-personalized-recommendations-tailored-to-your-lifestyle-and-aesthetics-helping-you-create-spaces-that-are-perfect-for-living-and-enjoying">
                    Every home is unique, from the living room to the bedroom.
                    We provide personalized recommendations tailored to your
                    aesthetics, helping you create spaces that are perfect for
                    living.
                  </span>
                </div>
                <div className="image-19"></div>
              </div>
            </div>
            <div className="container-11">
              <div className="why-choose-us">Why Choose Us ?</div>
              <div className="container-8">
                <div className="wcu-1">
                  <div className="container-2"></div>
                  <div className="simple">Simple</div>
                  <span className="no-need-to-install-an-application-only-using-the-browser">
                    No need to install an application, only using the browser.
                  </span>
                </div>
                <div className="wcu-2">
                  <div className="container-12"></div>
                  <div className="easy-to-use">Easy to Use</div>
                  <span className="select-the-furniture-then-arrange-the-furniture-in-your-space-only-with-your-phone-camera">
                    Select the furniture then arrange the furniture in your
                    space only with your phone camera.
                  </span>
                </div>
                <div className="wcu-3">
                  <div className="container-9"></div>
                  <div className="real-time">Technology</div>
                  <span className="no-worry-of-misplaced-you-be-able-to-displays-3-dfurniture-models-in-real-time-camera-view">
                    No worry of misplaced. You be able to displays 3D Furniture
                    models with your camera view.
                  </span>
                </div>
                <div className="wcu-4">
                  <div className="container-13"></div>
                  <div className="helpful">Helpful</div>
                  <span className="we-will-recommend-you-some-furniture-according-to-your-needs">
                    We will recommend you some furniture according to your
                    needs.
                  </span>
                </div>
              </div>
            </div>
            <div className="container-4">
              <div className="what-is-furni-fit">What is FurniFit?</div>
              <div className="welcome-to-furni-fit-discover-afun-new-way-to-choose-and-place-furniture-in-your-space-with-augmented-reality-ar-technology-simply-use-your-devices-camera-to-see-exactly-how-the-furniture-will-look-in-your-room-by-this-website-we-also-provide-arecommendation-system-to-help-you-determine-whether-the-furniture-placement-is-suitable-or-not-for-your-space-start-exploring-our-collection-now-to-effortlessly-and-accurately-update-your-room">
                Welcome to FurniFit! <br />
                Discover a fun new way to choose and place furniture in your
                space. With Augmented Reality (AR) technology, simply use your
                device&#39;s camera to see exactly how the furniture will look
                in your room by using this website. We also provide a
                recommendation system to help you choose the furniture that fits
                your preferences. Start exploring our collection now to
                effortlessly and accurately update your room.
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="vector-5"></div>
            <div className="container-7">
              <div className="footer-furni-fit">
                <div className="furni-fit">FurniFit</div>
                <span className="all-rights-reserved">
                  © 2024. All rights reserved
                </span>
              </div>
              <div className="nav-footer">
                <Link to="/about-us" className="about-us">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
