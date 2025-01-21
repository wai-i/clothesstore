import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ToTopButton from "../Components/ToTopButton";
import { useTranslation } from "react-i18next";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";

const Order = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const user_id = useSelector((state) => state.auth.id);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (user_id === -1) return;

    const dbRef = ref(database, `users/${token}`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = data.orders || {};
        const result = Object.entries(userOrders).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setOrders(result);
        console.log("orders: ", result);
      }
    });

    return () => unsubscribe();
  }, [user_id, token]);

  const renderOrderDetails = (items) => {
    return items.map((item, index) => (
      <div key={index} className="order_item_details_product">
        <div className="order_item_details_product_left">
          <div className="order_item_details_product_left_img">
            <img src={item.imgurl} alt={item.name} />
          </div>
        </div>
        <div className="order_item_details_product_right">
          <div className="order_item_details_product_right_content">
            <div>
              <span>{item.name}</span>
            </div>
            <div>
              <span>
                £{item.price} <span className="smallfont">{t("quantity")}</span> {item.qty}
              </span>
            </div>
            <div>
              <span className="smallfont">{t("total_amount")}</span>
              <span> £{item.price * item.qty}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderOrders = () => {
    if (!orders.length) {
      return <div className="order_alert">{t("no_orders_go_shopping")}</div>;
    }

    return orders.map((order) => (
      <div key={order.id} className="order_item">
        <div className="order_item_header">
          <div className="order_item_header_date">
            <span>{t("order_date")}</span>
            <span>{order.time.substring(0, 10)}</span>
          </div>
          <div className="order_item_header_amount">
            <span>{t("order_total")}</span>
            <span>£{order.amount}</span>
          </div>
          <div className="order_item_header_id">
            <span>{t("order_number")}{order.id}</span>
          </div>
        </div>
        <div className="order_item_details">{renderOrderDetails(order.items)}</div>
      </div>
    ));
  };

  return (
    <div className="order">
      {renderOrders()}
      <ToTopButton />
    </div>
  );
};

export default Order;
