import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";

function Notes() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const { user } = useAuthContext();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("baseUrl:", baseUrl);

    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Error fetching data.");
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [baseUrl, user]);

  const removeNote = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }
      setData(data.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Function to format createdAt time
  const formatCreatedAt = (createdAt) => {
    const currentTime = new Date();
    const noteTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - noteTime);
    const minutesDifference = Math.round(timeDifference / (1000 * 60));

    if (minutesDifference < 60) {
      return `${minutesDifference} mins ago`;
    } else if (minutesDifference < 60 * 24) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / (60 * 24));
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
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
    return (
      <div className="h-screen flex items-center justify-center">{error}</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-10 flex justify-end">
        <Link
          to={`/add-note`}
          className="bg-pomelo text-white px-4 py-2 rounded-lg shadow-md hover:bg-lips"
        >
          Add Notes +
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-yellowish rounded-lg shadow-md p-4 relative"
          >
            <Link to={`/notes/${item._id}`} className="block">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">
                {item.description.length > 200
                  ? `${item.description.substring(0, 200)}...`
                  : item.description}
              </p>
              <div>
                <span className="text-xs text-gray-500">
                  {formatCreatedAt(item.createdAt)}
                </span>
              </div>
            </Link>
            <div className="absolute top-0 right-0 p-2 flex space-x-2">
              <Link to={`/notes/${item._id}`}>
                <FaEdit className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              </Link>
              <FaTrashAlt
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => removeNote(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
