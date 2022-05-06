import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function New() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8080/projects`, {
        method: "POST",
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          title: title
        }),
      });
      if (res.status === 201) {
        setMessage("Project has been successfully created");
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
        <label>Project Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
        <br></br>
        <div className="horiz">
          <button className="complete" type="submit">Submit</button>
          <Link to={`/`}><button className="back">Back</button></Link>
        </div>
      </form>
      <div className="message"><p>{message}</p></div>
    </div>
    
    </>
  );
}

export default New;
