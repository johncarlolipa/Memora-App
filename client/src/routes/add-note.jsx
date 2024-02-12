import { useState } from "react";
import { Link } from "react-router-dom";

function AddNote() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/">back home</Link>
      <form onSubmit={addNote}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className=""
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="4"
            cols="50"
            className=""
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={submitted}
        >
          {submitted ? "Saving note..." : "Add Note"}
        </button>
        {submitted && <div>Note added!</div>}
      </form>
    </div>
  );
}

export default AddNote;
