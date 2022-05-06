import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import All from "./pages/All";
import New from "./pages/New";
import Project from "./pages/Project";
import Edit from "./pages/Edit";
import Task from "./pages/Task";
import Add from "./pages/Add";

function App() {
  return (
    <>
    <div className="app-container">
      <Router>
        <Routes>
          <Route exact path="/" element={<All />} />
          <Route exact path="/projects" element={<New />} />
          <Route exact path="/projects/:project_id" element={<Project />} />
          <Route exact path="/projects/:project_id/edit" element={<Edit />} />
          <Route exact path="/projects/:project_id/tasks/:task_id" element={<Task />} />
          <Route exact path="/projects/:project_id/tasks/add" element={<Add />} />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
