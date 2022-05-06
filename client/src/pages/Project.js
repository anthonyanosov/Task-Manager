import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Project() {
  const { project_id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  let handleDelete = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/projects/${project_id}`, { method: 'DELETE' })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('Error deleting project', error);
        });
        setMessage("Project has been successfully deleted.")
  };

  useEffect(() => {
    fetch(`http://localhost:8080/projects/${project_id}/tasks`)
      .then((body) => body.json())
      .then((json) => setTasks(() => [...json]));
  }, [project_id]);

  return (
    <>
      <h1>Project Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`/projects/${project_id}/tasks/${task._id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
      <div className="horiz">
        <Link to={`/projects/${project_id}/tasks/add`}><button className="complete">Add new task</button></Link>
        <Link to={`/projects/${project_id}/edit`}><button className="edit">Edit</button></Link>
        <form onSubmit={handleDelete}>
            <button className="delete" type="submit">Delete</button>
        </form>
        <Link to={`/`}><button className="back">Back</button></Link>
      </div>
      <div className="message"><p>{message}</p></div>
    </>
  );
}

export default Project;
