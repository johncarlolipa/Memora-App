import { useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
    <div>
      <div>
        <Link to="/">back home</Link>
        <button onClick={removeNote}>Remove</button>
      </div>

      <form onSubmit={updateNote}>
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
        <button type="submit" disabled={submitted}>
          {submitted ? "Saving note..." : "Update Note"}
        </button>
        {submitted && <div>Note added!</div>}
      </form>
    </div>
  );
}

export default UpdateNote;
