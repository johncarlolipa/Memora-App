import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link to={`/add-note`} className="bg-pomelo text-white px-4 py-2 rounded-lg shadow-md hover:bg-lips">Add Notes +</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-yellowish rounded-lg shadow-md p-4">
            <Link to={`/notes/${item._id}`} className="block">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">
                {item.description.length > 50
                  ? `${item.description.substring(0, 50)}...`
                  : item.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
