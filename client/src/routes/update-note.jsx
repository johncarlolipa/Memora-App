import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow from "../assets/arrow.svg";
import remove from "../assets/delete.svg";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);

        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        navigate("/");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex">
        <Link to="/" className="text-blue-500">
          <button className="bg-blue-300 hover:bg-blue-400 rounded-md px-2 py-2">
            <img src={arrow} alt="Back Arrow" className="w-7" />
          </button>
        </Link>
        <button
          onClick={removeNote}
          className="ml-4 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-300"
        >
          <img src={remove} alt="Back Arrow" className="w-4 h-3" />
        </button>
      </div>

      <form onSubmit={updateNote}>
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
        <button
          type="submit"
          disabled={submitted}
          className="px-4 py-2 bg-pomelo text-white rounded-md hover:bg-lips focus:outline-none focus:bg-blue-600"
        >
          {submitted ? "Saving Note..." : "Update Note"}
        </button>
        {submitted && <div className="mt-2">Note Updated!</div>}
      </form>
    </div>
  );
}

export default UpdateNote;
