import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();
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
        navigate("/");
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
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500">Back Home</Link>
      <form onSubmit={addNote} className="mt-4">
        <div className="mb-4">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button type="submit" disabled={submitted} className="px-4 py-2 bg-pomelo text-white rounded-md hover:bg-lips focus:outline-none focus:bg-blue-600">
          {submitted ? "Saving Note..." : "Add Note"}
        </button>
        {submitted && <div className="mt-2">Note Added!</div>}
      </form>
    </div>
  );
}

export default AddNote;
