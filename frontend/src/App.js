import { useState, useEffect } from "react";
import FurniturePage from "./pages/FurniturePage";
import AboutUsPage from "./pages/AboutUsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(1); // Fetch data for the first page initially
  }, []);

  const fetchData = (page) => {
    fetch(`/api/furnitures?page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {  
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error)); // Log error to console
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trialApiRoute" element={<AboutUsPage data={data} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
