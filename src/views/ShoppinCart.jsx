import { useEffect, useState } from "react";
import { api, API_PATH } from "../App";
import { useCarCount } from "../CartCountContext";
import { taiwanCurrency } from "../utilities/dataTransform";

function ShoppingCart() {
  const [results, setResults] = useState({ carts: [] });
  const { syncCartCount } = useCarCount();
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

  useEffect(() => {
    let isMounted = true;
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

    return () => {
      isMounted = false; // 清理
    };
  }, []);
  return (
    <div className="mx-4">
      <h2>購物車清單</h2>
      <div className="d-flex justify-content-end me-5">
        <button className="btn btn-danger" onClick={() => deletCart()}>
          全部刪除
        </button>
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
    </div>
  );
}

export default ShoppingCart;
