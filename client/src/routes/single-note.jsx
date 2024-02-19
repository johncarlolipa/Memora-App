import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function SingleNote() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Note not found.");
          }
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setNote(data);

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [baseUrl, user]);

  const removeNote = async (id) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete note.");
      }

      setData(data.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pomelo rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8 h-[500px]">
      {note ? (
        <div className="bg-yellowish rounded-lg shadow-md p-4 md:p-8 relative">
          <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
          <p className="text-gray-700">{note.description}</p>

          <div className="absolute top-0 right-0 p-2 flex space-x-2">
            <Link to={`/notes/${note._id}`}>
              <FaEdit className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </Link>
            <FaTrashAlt
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={() => removeNote(note._id)}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">Note not found.</div>
      )}
    </div>
  );
}

export default SingleNote;
