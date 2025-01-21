import React, { useState } from "react";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import Backdrop from "./Backdrop";
import Confirm from "./Confirm";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Cart = (props) => {
    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    
    let total = 0;
    state.map( x => total = total + x.price * x.qty)
    const listItem = state.map( (x, index) =>{
        return(
            <div key={x.name} className="cart_item">
                <img src={x.img} />
                <div className="cart_item_details">
                    <div className="cart_item_details_left">
                        <span className="cart_item_details_left_title">{x.name}</span>
                        <div className="cart_item_details_left_qty">
                            <span>qty: {x.qty}</span>
                            <i className="cart_item_details_left_qty_icon fa-solid fa-plus" onClick={() => dispatch(cartAction.increaseItem(index))}></i>
                            <i className="cart_item_details_left_qty_icon fa-solid fa-minus" onClick={() => dispatch(cartAction.decreaseItem(index))}></i>
                        </div>
                    </div>
                    <div className="cart_item_details_right">
                    <span>£{parseFloat((x.price * x.qty).toFixed(1))}</span>
                    </div>
                    
                </div>
            </div>
        )
    })
    
    let cartEmpty = state.length === 0 ? true : false;
    return(
        <div className="cart" onClick={(e) => e.stopPropagation()}>
            {cartEmpty && <div className="cart_alert">{t('cart_is_empty')}</div>}
            {listItem}
            {!cartEmpty && 
            <div className="cart_buttom">
                <div className="cart_buttom_clear">
                    <span onClick={() => setShowConfirm(true)}>{t('clear_cart')}</span>
                </div>
                <div className="cart_buttom_right" onClick={() => setShowCheckOut(true)}>
                    <div className="cart_buttom_right_checkout">
                        <i className="fa-solid fa-sack-dollar"></i>
                    </div>
                    <div><span>£{parseFloat((total).toFixed(1))}</span></div>
                </div>
            </div>
            }
            {showConfirm &&  
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} confirm={() => dispatch(cartAction.deleteAllItem())} >{t('confirm_clear_cart')}</Confirm>
            </Backdrop> }
            {showCheckOut &&  
            <Backdrop close={() => setShowCheckOut(false)} transpanent={0.6}>
                <Confirm close={() => setShowCheckOut(false)} confirm={() => {props.close();navigate("checkout")}} >{t('confirm_checkout')}</Confirm>
            </Backdrop> }

        </div>
    )
}

export default Cart;