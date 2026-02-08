import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useCarCount } from "../CartCountContext";

function FrontendLayout() {
  const navigate = useNavigate();
  const { cartCount } = useCarCount();

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // 1. 移除所有 nav-link 的 active 類別
        navLinks.forEach((l) => l.classList.remove("active"));

        // 2. 為當前被點擊的連結加上 active 類別
        this.classList.add("active");
      });
    });
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <ul className="nav d-flex flex ms-5 mt-3 ">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">
              首頁
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/Product">
              產品列表
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/ShoppingCart">
              購物車
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/Checkout">
              結帳
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/Login">
              登入
            </Link>
          </li>
          {/* header左邊的購物車 icon */}
          <li
            className="nav-item ms-auto me-5"
            onClick={() => {
              navigate("/ShoppingCart", { replace: true });
            }}
          >
            <a className="position-relative">
              <img
                className="mt-2"
                src="https://raw.githubusercontent.com/nomorecomputer/homeworkImages/ebf0fc249214bb606f8c3b9b0bf1cf7d1838e2bb/cart.svg"
                alt=""
              />
              <span
                className="position-absolute top-0 start-50 translate-middle-y bage rounded-circle bg-danger text-white py-1 px-2"
                style={{ fontSize: "10px" }}
              >
                {cartCount}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
      <footer className="py-4 text-center">
        <div className="mb-5">
          <h3
            className="text-primary border border-primary py-2 px-5 d-inline-block"
            style={{ marginBottom: "1rem" }}
          >
            練習使用 useNavigate
          </h3>
          <div className="w-75 mx-auto">
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              回上一頁
            </button>
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                navigate("/", { replace: true });
              }}
            >
              回首頁
            </button>
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                navigate("/Product", { replace: true });
              }}
            >
              回產品列表
            </button>
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                navigate("/ShoppingCart", { replace: true });
              }}
            >
              回購物車
            </button>
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                navigate("/Checkout", { replace: true });
              }}
            >
              結帳
            </button>
            <button
              className="btn btn-primary  me-3"
              onClick={() => {
                navigate(1);
              }}
            >
              回下一頁
            </button>
          </div>
        </div>
        <p>© 2025 React 第五堂主線作業</p>
      </footer>
    </>
  );
}

export default FrontendLayout;
