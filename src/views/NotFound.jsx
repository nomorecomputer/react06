import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-danger my-5">無此頁面</h2>
      <button
        className="btn btn-primary me-3 btn-lg"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        回首頁
      </button>
    </>
  );
}

export default NotFound;
