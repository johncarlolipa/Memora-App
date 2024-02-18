import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Notes({ item }) {

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
  return (
    <>
      <Link to={`/note/${item._id}`} className="block">
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
    </>
  );
}

// Prop validation
Notes.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notes;
