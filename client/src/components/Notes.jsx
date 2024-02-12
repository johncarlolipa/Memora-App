import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setError("Error fetching data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <Link to={`/add-note`}>Add notes +</Link>
      </div>
      <div>
        {data.map((item) => (
          <div key={item._id}>
            <Link to={`/note/${item._id}`}>
              <h3>{item.title}</h3>

              <p>
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
