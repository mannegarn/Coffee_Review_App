import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home"; // Import the Home component
import Form from "./Components/Form/Form"; // Import your ReviewForm component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/submit" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
