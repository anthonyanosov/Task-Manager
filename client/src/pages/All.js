import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function All() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/projects`)
      .then((body) => body.json())
      .then((json) => setProjects(() => [...json]));
  }, []);

  return (
    <>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/projects`}><button className="complete">Add new project</button></Link>
    </>
  );
}

export default All;
