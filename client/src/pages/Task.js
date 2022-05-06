import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Task() {
  const { project_id } = useParams();
  const { task_id } = useParams();
  const [task, setTask] = useState([]);
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    try {
      let res = await fetch(`http://localhost:8080/projects/${project_id}/tasks/${task_id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: true
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
      if (res.status === 201) {
        console.log("Project has been successfully updated");
      } else {
        console.log("Error updating project");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleDelete = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/projects/${project_id}/tasks/${task_id}`, { method: 'DELETE' })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('Error deleting task', error);
        });
        setMessage("Task has been successfully deleted.");
  };

  useEffect(() => {
    fetch(`http://localhost:8080/projects/${project_id}/tasks/${task_id}`)
      .then((body) => body.json())
      .then((json) => setTask(() => json));
  }, [project_id, task_id]);

  return (
      <>
        <h1>{task.title}</h1>
        <p>Description: {task.description}</p>
        <p>Completed: {JSON.stringify(task.completed)}</p>
        <div className="horiz">
          <form onSubmit={handleSubmit}>
            <button className="complete" type="submit">Complete</button>
          </form>
          <form onSubmit={handleDelete}>
            <button className="delete" type="submit">Delete</button>
          </form>
          <Link to={`/projects/${project_id}`}><button className="back">Back</button></Link>
        </div>
        <div className="message">{message}</div>
      </>
  );
}

export default Task;
