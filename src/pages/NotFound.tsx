import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      THis page doesn't exist. Go <Link to="/"> home </Link>
    </div>
  );
};

export default NotFound;
