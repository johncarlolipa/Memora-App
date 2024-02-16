import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function Notes() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("baseUrl:", baseUrl);

    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
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

    fetchData();
  }, [baseUrl]);

  const removenote = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }
      // Remove the deleted note from the state
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
            </Link>
            <div className="absolute top-0 right-0 p-2 flex space-x-2">
              <Link to={`/notes/${item._id}`}>
                <FaEdit className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              </Link>
              <FaTrashAlt
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => removenote(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
