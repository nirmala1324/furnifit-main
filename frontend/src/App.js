import { useState, useEffect } from "react";
import FurniturePage from "./pages/FurniturePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api")
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
        <Route path="/" element={<FurniturePage data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
