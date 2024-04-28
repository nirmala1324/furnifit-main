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
    fetch("/api/furnitures")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error)); // Log error to console
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage data={data} />} />
        <Route path="/trialApiRoute" element={<AboutUsPage data={data} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
