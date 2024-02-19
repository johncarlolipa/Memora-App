import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function AddNote() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const addNote = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
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

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={addNote} className="max-w-md mx-auto">
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
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={submitted}
          className="w-full px-4 py-2 bg-pomelo text-white rounded-md hover:bg-lips focus:outline-none focus:bg-pomelo"
        >
          {submitted ? "Saving Note..." : "Add Note"}
        </button>
        {submitted && <div className="mt-2 text-center">Note Added!</div>}
      </form>
    </div>
  );
}

export default AddNote;
