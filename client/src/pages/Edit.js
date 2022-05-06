import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit() {
  const { project_id } = useParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8080/projects/${project_id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
      if (res.status === 201) {
        setMessage("Project has been successfully updated");
      } else {
        setMessage("Error updating project");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="itemForm">
      <form onSubmit={handleSubmit}>
        <label>New project title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
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

export default Edit;
