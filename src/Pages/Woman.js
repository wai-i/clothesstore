import React, { Fragment, useEffect, useState } from "react";
import { cartAction } from "../Store/cart-Slice";
import { useDispatch } from "react-redux";
import ToTopButton from "../Components/ToTopButton";

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { database } from "../Firebase"; 
import { ref, onValue } from "firebase/database";

const Woman = (props) => {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState([]); 
  const [snackBar, setSnackBar] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    const dbRef = ref(database, "clothes"); 

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data).filter(
          (x) => x.type === props.children
        );
        setListItem(filteredData);
      } else {
        setListItem([]);
      }
    });

    window.scrollTo({ top: 0, left: 0 });

    return () => unsubscribe();
  }, [props.children]);

  const handleOpenSnackBar = () => {
    setSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
      </IconButton>
    </Fragment>
  );

  return (
    <div className="woman">
      <div className="woman_product">
        {listItem.map((x) => (
          <div key={x.id} className="woman_product_item">
            <img src={x.imgurl} alt="" />
            <div className="woman_product_item_details">
              <span className="woman_product_item_details_title">{x.name}</span>
              <span className="woman_product_item_details_price">£{x.price}</span>
            </div>
            <div className="woman_product_item_cart">
              <span
                onClick={() => {
                  dispatch(
                    cartAction.addItem({
                      id: x.id,
                      name: x.name,
                      img: x.imgurl,
                      price: x.price,
                      qty: 1
                    })
                  );
                  handleOpenSnackBar();
                }}
              >
                <i className="fa-solid fa-cart-arrow-down" />
                {t("add_to_cart")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ToTopButton />
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={t("added_to_cart")}
        action={action}
      />
    </div>
  );
};

export default Woman;
