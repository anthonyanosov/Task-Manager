import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Add() {
  const { project_id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectID, setProjectID] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8080/projects/${project_id}/tasks`, {
        method: "POST",
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          title: title,
          description: description,
          completed: false,
          projectID: projectID
        }),
      });
      if (res.status === 201) {
        setMessage("Task has been successfully created");
      } else {
        setMessage("Error creating task");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="itemForm">
      <form onSubmit={handleSubmit}>
        <label>Task: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
        <br></br>
        <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/></label>
        <br></br>
        <label>Project ID: <input type="text" value={projectID} onChange={(e) => setProjectID(e.target.value)}/></label>
        <br></br>
        <div className="horiz">
          <button className="complete" type="submit">Submit</button>
          <Link to={`/projects/${project_id}`}><button className="back">Back</button></Link>
        </div>
      </form>
      <div className="message"><p>{message}</p></div>
    </div>
    
    </>
  );
}

export default Add;
