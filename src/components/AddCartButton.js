import { checkItemInCart } from "../utils/checkItemInCart";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";

import "../styles/addcartbutton.css";

export default function AddToCartButton(item) {
  const ADD_CART_ITEM = "addCartItem";
  const { cartItems, dispatchData } = useCart();
  const items = item.item;
  function handleClick() {
    if (!checkItemInCart(cartItems, item.item._id)) {
      dispatchData({
        type: ADD_CART_ITEM,
        items
      });
    }
  }

  function getButtonText() {
    if (item.item.inStock) {
      return checkItemInCart(cartItems, item.item._id)
        ? "Go to Cart"
        : "Add to cart";
    }
    return "Out Of Stock";
  }
  return (
    <Link to={getButtonText() === "Go to Cart" ? "/cart" : ""}>
      <button
        disabled={!item.item.inStock}
        onClick={handleClick}
        className={`btn-add ${!item.item.inStock ? "out" : "instock"}`}
      >
        {getButtonText()}
      </button>
    </Link>
  );
}
