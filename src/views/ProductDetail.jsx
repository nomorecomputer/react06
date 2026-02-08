import { Link, useNavigate } from "react-router";
// import { useParams } from "react-router";
import { useLocation } from "react-router";
import "bootstrap/js/dist/carousel";
import { useState } from "react";
import { api, API_PATH } from "../App";
import { useCarCount } from "../CartCountContext";
import { Currency, taiwanCurrency } from "../utilities/dataTransform";

function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.productData;

  const images = [product.imageUrl, ...product.imagesUrl];
  const [currentImageUrl, setCurrentImageUrl] = useState(images[0]);
  // const { id } = useParams();
  const { syncCartCount } = useCarCount();
  const addCart = async (product_id, qty) => {
    const data = { product_id: product_id, qty: qty };
    try {
      await api.post(`/api${API_PATH}/cart`, { data });
      syncCartCount();
      alert("成功加入購物車！");
    } catch (error) {
      console.dir(error);
    }
  };
  return (
    <div className="d-flex">
      <a
        className="ms-auto"
        onClick={() => {
          navigate(-1);
        }}
      >
        返回
      </a>

      <div className="py-5 w-75 h-75 mx-auto">
        <div className="row">
          <div className="col-6 mb-4">
            <img
              className="d-block w-100 mb-2"
              src={currentImageUrl}
              alt="Front"
            />
            <div>
              {images.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button img-btn"
                  className="me-1"
                  onClick={() => setCurrentImageUrl(images[index])}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 右側：產品資訊與購買 */}
          <div className="col-6">
            <div className="mb-2">
              <div className="me-2 badge text-danger">熱銷中</div>
              <div className="badge text-success">免運費</div>
            </div>

            <h1 className="display-6">{product.title}</h1>

            <div className="mb-3">
              <span className="h3 text-danger me-2">
                {taiwanCurrency(product.price)}
              </span>
              <span className="text-muted text-decoration-line-through">
                {Currency(product.origin_price)}
              </span>
            </div>

            <p className="lead text-muted" style={{ fontSize: "1rem" }}>
              {product.content}
            </p>
            <p className="lead text-muted" style={{ fontSize: "1rem" }}>
              {product.description}
            </p>
            {/* 購買按鈕 */}
            <div className="d-grid gap-2">
              <button
                variant="dark"
                size="lg"
                onClick={() => addCart(product.id, 1)}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
