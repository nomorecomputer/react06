import { Link, useNavigate } from "react-router";
import { API_PATH, api } from "../App";
import { useEffect, useState } from "react";

import { taiwanCurrency } from "../utilities/dataTransform";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/api${API_PATH}/products`);

        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.dir(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-danger">查詢中....</p>
      ) : (
        <div className="row d-flex  m-4">
          {products.map((product) => (
            <div className="col-3 h-100" key={product.id}>
              <div
                className="card mb-3 h-100 bg-info"
                styel={{ height: "377px" }}
              >
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt="..."
                />
                <div
                  className="card-body d-flex flex-column  h-100"
                  styel={{ height: "197px" }}
                >
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text me-auto">{product.content}</p>
                  <p className="card-text me-auto">
                    售價：{taiwanCurrency(product.price)}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary  mt-auto"
                    onClick={() => {
                      navigate(`/product/${product.id}`, {
                        state: { productData: product },
                      });
                    }}
                  >
                    查看產品明細
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
