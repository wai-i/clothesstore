import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../Store/cart-Slice";
import { authAction } from "../Store/auth-Slice";
import { useNavigate } from "react-router-dom";
import Backdrop from "../Components/Backdrop";
import Confirm from "../Components/Confirm";
import Signin from "../Components/Signin";
import { useTranslation } from "react-i18next";
import { ref, push, get, update } from "firebase/database"; 
import { database } from "../Firebase"; 

const Checkout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const token = useSelector((state) => state.auth.token);
  const paymentMsg = useRef("");
  const [showSignin, setShowSignin] = useState(false);
  const { t } = useTranslation("common");

  let total = 0;
  state.map((x) => (total += x.price * x.qty));

  const listItem = state.map((x, index) => (
    <div key={x.name} className="checkout_item">
      <img src={x.img} alt={x.name} />
      <div className="checkout_item_details">
        <div className="checkout_item_details_left">
          <span className="checkout_item_details_left_title">{x.name}</span>
          <div className="checkout_item_details_left_qty">
            <span>qty: {x.qty}</span>
            <i
              className="checkout_item_details_left_qty_icon fa-solid fa-plus"
              onClick={() => dispatch(cartAction.increaseItem(index))}
            ></i>
            <i
              className="checkout_item_details_left_qty_icon fa-solid fa-minus"
              onClick={() => dispatch(cartAction.decreaseItem(index))}
            ></i>
          </div>
        </div>
        <div className="checkout_item_details_right">
          <span>£{x.price * x.qty}</span>
        </div>
      </div>
    </div>
  ));

  const payHandler = async () => {
    try {
      const userRef = ref(database, `users/${token}`);
      const orderRef = ref(database, `users/${token}/orders`);

      const snapshot = await get(userRef);
      const userData = snapshot.val();
      if (!userData) {
        console.error("User data not found.");
        paymentMsg.current = t("payment_failed_please_relogin");
        setShowFailed(true);
        return;
      }

      const uid = userData.uid; 
      const orders = userData.orders || {}; 
      const orderCount = Object.keys(orders).length; 
      const nextOrderNo = `${uid}-${orderCount + 1}`; 

      const newOrderKey = push(orderRef).key; 
      const orderData = {
        amount: total,
        id: nextOrderNo,
        items: state.map((x) => ({
          item_id: x.id,
          name: x.name,
          price: x.price,
          imgurl: x.img,
          qty: x.qty,
        })),
        time: new Date().toISOString(),
      };

      await update(ref(database, `users/${token}/orders/${newOrderKey}`), orderData);

      paymentMsg.current = t("payment_success");
      setShowSuccess(true);
      dispatch(cartAction.deleteAllItem());
    } catch (error) {
      console.error("Error saving order to Firebase:", error);
      paymentMsg.current = t("payment_failed_please_relogin");
      setShowFailed(true);
    }
  };

  let cartEmpty = state.length === 0;

  return (
    <div className="checkout" onClick={(e) => e.stopPropagation()}>
      {cartEmpty && <div className="checkout_alert">{t("cart_is_empty")}</div>}
      {listItem}
      {!cartEmpty && (
        <div className="checkout_buttom" onClick={() => setShowConfirm(true)}>
          <div className="checkout_buttom_checkout">
            <span>{t("checkout")}</span>
          </div>
          <div>
            <span>£{total}</span>
          </div>
        </div>
      )}
      {showConfirm && isLogin && (
        <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
          <Confirm
            close={() => setShowConfirm(false)}
            confirm={() => {
              setShowConfirm(false);
              payHandler();
            }}
          >
            {t("confirm_payment")}
          </Confirm>
        </Backdrop>
      )}
      {showConfirm && !isLogin && (
        <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
          <Confirm
            close={() => setShowConfirm(false)}
            isOnlyConfirm="true"
            confirm={() => {
              setShowConfirm(false);
              setShowSignin(true);
            }}
          >
            {t("please_login_first")}
          </Confirm>
        </Backdrop>
      )}
      {showSuccess && (
        <Backdrop
          close={() => {
            setShowSuccess(false);
            navigate("/");
          }}
          transpanent={0.6}
        >
          <Confirm
            close={() => {
              setShowSuccess(false);
              navigate("/");
            }}
            isOnlyConfirm="true"
            confirm={() => {
              setShowSuccess(false);
              navigate("/");
            }}
          >
            {paymentMsg.current}
          </Confirm>
        </Backdrop>
      )}
      {showFailed && (
        <Backdrop
          close={() => {
            dispatch(authAction.logout());
            setShowFailed(false);
            setShowSignin(true);
          }}
          transpanent={0.6}
        >
          <Confirm
            close={() => {
              dispatch(authAction.logout());
              setShowFailed(false);
              setShowSignin(true);
            }}
            isOnlyConfirm="true"
            confirm={() => {
              dispatch(authAction.logout());
              setShowFailed(false);
              setShowSignin(true);
            }}
          >
            {paymentMsg.current}
          </Confirm>
        </Backdrop>
      )}
      {showSignin && (
        <Backdrop close={() => setShowSignin(false)} transpanent={0.6}>
          <Signin close={() => setShowSignin(false)} />
        </Backdrop>
      )}
    </div>
  );
};

export default Checkout;
