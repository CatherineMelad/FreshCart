import { Link } from "react-router-dom";
import errorImage from "../../assets/error.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={errorImage} alt="Page not found" />
      <Link to="/" className="text-[#0dac0c] font-medium hover:underline">
        Back to home
      </Link>
    </div>
  );
}
