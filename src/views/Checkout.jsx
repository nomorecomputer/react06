/* eslint-disable no-unused-vars */
import { createRef, useEffect, useRef, useState } from "react";
import { api, API_PATH } from "../App";
import { useCarCount } from "../CartCountContext";
import { taiwanCurrency } from "../utilities/dataTransform";
import { useForm } from "react-hook-form";
import { CircularProgress, RotatingLines } from "react-loader-spinner";
import { Modal } from "bootstrap";
import ProductModal from "./ProductModal";
import { emailValidator } from "../utilities/validators";

function Checkout() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [results, setResults] = useState({ carts: [] });
  const { syncCartCount } = useCarCount();
  const [loading, setLoading] = useState(true);
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingProductId, setloadingProductId] = useState(null);
  const productModalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange", defaultValues: {} });

  const deletCart = async (id, cartTotal) => {
    try {
      await api.delete(
        `/api${API_PATH}/${id ? "cart" : "carts"}/${id ? id : ""}`,
      );
      setResults((prevResults) => ({
        ...prevResults,
        carts: id ? prevResults.carts.filter((cart) => cart.id !== id) : [],
        final_total: id ? prevResults.final_total - cartTotal : 0,
      }));
      syncCartCount();
      alert(`成功從採購車中${id ? "" : "全部"}刪除！！`);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (formData) => {
    try {
      const { message, ...exceptMessage } = formData;
      const data = { data: { user: exceptMessage, message: formData.message } };
      const response = await api.post(`/api${API_PATH}/order`, data);

      const response2 = await api.get(`/api${API_PATH}/cart`);
      syncCartCount();
      setResults(response2.data.data);
    } catch (error) {
      console.log(error.response);
    }
    reset();
  };
  const addCart = async (product_id, qty = 1) => {
    setLoadingCartId(product_id);
    try {
      const data = { product_id: product_id, qty: qty };
      await api.post(`/api${API_PATH}/cart`, { data });
      syncCartCount();
      const response = await api.get(`/api${API_PATH}/cart`);
      setResults(response.data.data);
      alert("成功加入購物車！");
    } catch (error) {
      console.dir(error);
    } finally {
      setLoadingCartId(null);
    }
  };
  const viewProductDetail = (product) => {
    setloadingProductId(product.id);
    setProduct(product);
    setTimeout(() => {
      setloadingProductId(null);
    }, 600);
    productModalRef.current.show();
  };
  const closeProductModal = () => {
    productModalRef.current.hide();
  };
  useEffect(() => {
    let isMounted = true;
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

    const getCarts = async () => {
      try {
        const response = await api.get(`/api${API_PATH}/cart`);
        if (isMounted) {
          setResults(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCarts();

    productModalRef.current = new Modal("#productModal", {
      keyboard: false,
    });
    // Modal 關閉時移除焦點
    document
      .querySelector("#productModal")
      .addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    return () => {
      isMounted = false; // 清理
    };
  }, []);
  return (
    <div className="mx-4">
      <h2>產品清單</h2>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ width: "200px" }}>
                <div
                  style={{
                    height: "100px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `URL(${product.imageUrl})`,
                  }}
                ></div>
              </td>
              <td>{product.title}</td>
              <td>
                <del className="h6">
                  原價：{taiwanCurrency(product.origin_price)}
                </del>
                <div className="h5">特價：{taiwanCurrency(product.price)}</div>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={loadingProductId === product.id}
                    onClick={() => viewProductDetail(product)}
                  >
                    {loadingProductId === product.id ? (
                      <CircularProgress
                        color="#4fa94d"
                        width={32}
                        height={32}
                      />
                    ) : (
                      "查看更多"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={loadingCartId === product.id}
                    onClick={() => addCart(product.id, 1)}
                  >
                    {loadingCartId === product.id ? (
                      <CircularProgress
                        color="#4fa94d"
                        width={32}
                        height={32}
                      />
                    ) : (
                      "加到購物車"
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>購物車清單</h2>
      <div className="d-flex justify-content-end me-5">
        {results.carts.length === 0 ? (
          ""
        ) : (
          <button className="btn btn-danger" onClick={() => deletCart()}>
            清空購物車
          </button>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">序號</th>
            <th scope="col">品名</th>
            <th scope="col">單價</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {results.carts.map((cart, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{cart.product.title}</td>
              <td>{cart.product.price}</td>
              <td>{cart.qty}</td>
              <td>{cart.final_total}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletCart(cart.id, cart.final_total)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="bg-info text-fw-bold text-end">
              總計：{taiwanCurrency(results.final_total)}
            </td>
          </tr>
        </tfoot>
      </table>
      {/* 結帳頁面 */}
      <div className="my-5 row justify-content-center">
        {results.carts.length === 0 ? (
          <p>無待結帳購物項目</p>
        ) : (
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="請輸入 Email"
                // defaultValue="test@gamil.com"
                {...register("email", emailValidator)}
              />
              {errors.email && (
                <p className="text-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="請輸入姓名"
                // defaultValue="小明"
                {...register("name", {
                  required: "收件人姓名必填",
                  minLength: {
                    value: 2,
                    message: "最少兩個字",
                  },
                })}
              />
              {errors.name && (
                <p className="text-danger mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人手機號碼
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                className="form-control"
                placeholder="請輸入手機號碼"
                // defaultValue="0912345678"
                {...register("tel", {
                  required: "手機號碼必填",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "必須符合手機號碼樣式",
                  },
                })}
              />
              {errors.tel && (
                <p className="text-danger mt-1">{errors.tel.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                placeholder="請輸入地址"
                // defaultValue="臺北市信義區信義路5段7號"
                {...register("address", {
                  required: "地址必填",
                })}
              />
              {errors.address && (
                <p className="text-danger mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                id="message"
                className="form-control"
                cols="30"
                rows="10"
                {...register("message")}
              ></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-danger">
                送出訂單
              </button>
            </div>
          </form>
        )}
      </div>
      <ProductModal
        product={product}
        addCart={addCart}
        closeProductModal={closeProductModal}
      />
    </div>
  );
}

export default Checkout;
