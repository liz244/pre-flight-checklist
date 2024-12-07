import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ChecklistDetails from "./components/ChecklistDetails";
import ChecklistForm from "./components/ChecklistForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/checklist/:id" element={<ChecklistDetails />} />
        <Route path="/form/:id?" element={<ChecklistForm />} />
      </Routes>
    </Router>
  );
}

export default App;
