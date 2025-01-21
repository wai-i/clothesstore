import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../img/dancing.gif';
import Backdrop from "./Backdrop";
import Signin from './Signin';
import ModifyPwd from "./ModifyPwd";
import Cart from "./Cart";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import { authAction } from "../Store/auth-Slice";
import Confirm from "./Confirm";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'; 


const Header =() => {
    const phoneOn = ["block", "header_phoneicon_img fa-solid fa-xmark"];
    const phoneOff = ["none", "header_phoneicon_img fa-solid fa-bars"];
    const [phoneList, setPhoneList] = useState(phoneOff);
    const [phoneListAc, setPhoneListAc] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [showModifyPwd, setShowModifyPwd] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showConfirm, setShowConfirm] =useState(false);
    const [showModifyPwdSuccess, setShowModifyPwdSuccess] = useState(false);
    const [phoneWindow, setPhoneWindow] = useState(false);
    const userName = useSelector(state => state.auth.name);
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation('common');
    
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(cartAction.refreshAllItem());},[dispatch]);
    const state = useSelector(state => state.cart);
    useEffect(()=>{dispatch(authAction.loadLogin());},[dispatch]);
    const isLogin = useSelector(state => state.auth.isLogin);
    const navigate = useNavigate();

    const cartItem = useRef(0);


    const headerClickHandler = () => {
        if (phoneList[0] === "none"){
            setPhoneList(phoneOn);
        }else{
            setPhoneList(phoneOff);
            setPhoneListAc(false);
        }
    }
    const closeAllPhone = () => {
        setPhoneList(phoneOff);
        setPhoneListAc(false);
    }


    cartItem.current = 0;
    state.forEach (x => {
        cartItem.current += x.qty;
    });

    const handleWindowResize = () => {
        if (window.innerWidth <= 600){
            setPhoneWindow(true);
        }else if (window.innerWidth > 600){
            setPhoneWindow(false);
        }
        
    }
    useEffect(() => {
        handleWindowResize();
    },[]);

    window.addEventListener('resize', handleWindowResize);


    return(
        <Fragment>
            <div className="header">
                <div className="header_top">
                    <div className="header_phoneicon"> 
                        <i className={phoneList[1]} onClick={headerClickHandler}></i>
                    </div>
                    <div className="header_logo">
                        <Link to="/">
                            <img className="header_img" src={logo} alt="" onClick={closeAllPhone}/>
                        </Link >
                        <Link className="header_tittle" to="/">VF</Link >
                    </div>
                    <div className="header_userinfo">
                        <LanguageSwitcher />
                        {!isLogin && <span className="header_userinfo_login" onClick={() => setShowSignin(true)}>{t('login')}</span >}
                        {!isLogin && <Link className="header_userinfo_reg" to="signup">{t('register')}</Link >}
                        
                        {isLogin && <div className="header_userinfo_welcome">
                            <span>{t('welcome')} {userName} </span>
                            <i className="fa-solid fa-chevron-down"></i>
                            <div className="header_userinfo_welcome_list">
                                <Link to="order">{t('order')}</Link>
                                <span onClick={() => setShowModifyPwd(true)}>{t('chagePwd')}</span>
                                <span onClick={() => setShowConfirm(true)}>{t('logout')}</span>
                            </div>
                        </div>}
                        <div className="header_userinfo_cart" onClick={() => phoneWindow? closeAllPhone() || navigate("checkout") : (showCart? setShowCart(false) : setShowCart(true))}>
                            <i className="header_userinfo_cart_icon fa-solid fa-cart-shopping"></i>
                            {cartItem && <div className="header_userinfo_cart_no">{cartItem.current}</div>}
                            {showCart &&  
                            <Backdrop close={() => setShowCart(false)} transpanent={0}>
                                <Cart close={() => setShowCart(false)}/> 
                            </Backdrop>    
                            }
                        </div>
                    </div>
                </div>
                <div className="header_bottom">
                <div className="header_bottom_newitem">
                    <div className="header_bottom_newitem_title">
                        <span>{t('newItems')}</span>
                    </div>
                    <div className="header_bottom_newitem_cat">
                        <Link to="coats">{t('coat')}</Link>
                        <Link to="blazers">{t('blazer_or_outerwear')}</Link>
                        <Link to="down">{t('down_jacket')}</Link>
                        <Link to="t-shirts">{t('short_sleeve_and_tank_top')}</Link>
                        <Link to="shirts">{t('casual_shirts')}</Link>
                        <Link to="long">{t('long_or_three_quarter_sleeve_tshirt')}</Link>
                    </div>
                </div>
                <Link to="man">{t('men')}</Link>
                <Link to="woman">{t('women')}</Link>
                <Link to="child">{t('kids')}</Link>
                </div>
                <div className="header_phonelist" style={{display: phoneList[0]}}>
                     <ul className="header_phonelist_ul">
                        {isLogin && <li onClick={() => setPhoneListAc(true)}>{t('my_account')}</li>}
                        {phoneListAc && <Link className="header_phonelist_ul_ac" 
                        to="order" onClick={closeAllPhone}>{t('order')}</Link>}
                        {phoneListAc && <li className="header_phonelist_ul_ac" 
                        onClick={() => {closeAllPhone();setShowModifyPwd(true)}}>{t('change_password')}</li>}
                        {phoneListAc && <li className="header_phonelist_ul_ac" 
                        onClick={() => {closeAllPhone();setShowConfirm(true)}}>{t('logout')}</li>}
                        {!isLogin && <li onClick={() => {setShowSignin(true); setPhoneList(phoneOff)}}>{t('login')}</li>}
                        {!isLogin && <Link to="signup" onClick={closeAllPhone}>{t('register')}</Link >}
                        <Link to="man" onClick={closeAllPhone}>{t('men')}</Link>
                        <Link to="woman" onClick={closeAllPhone}>{t('women')}</Link>
                        <Link to="child" onClick={closeAllPhone}>{t('kids')}</Link>
                     </ul>
                </div>
            </div>
            <div className="dummy"></div>
            {showSignin &&  
            <Backdrop close={() => setShowSignin(false)}  transpanent={0.6}>
                <Signin close={() => setShowSignin(false)} />
            </Backdrop>}
            {showModifyPwd &&  
            <Backdrop close={() => setShowModifyPwd(false)}  transpanent={0.6}>
                <ModifyPwd close={() => setShowModifyPwd(false)} success={()=> {setShowModifyPwd(false);setShowModifyPwdSuccess(true)}}/>
            </Backdrop>}
            {showModifyPwdSuccess &&  
            <Backdrop close={() => setShowModifyPwdSuccess(false)}  transpanent={0.6}>
                <Confirm close={() => setShowModifyPwdSuccess(false)} confirm={() => {dispatch(authAction.logout());navigate("/")}} isOnlyConfirm="true"> 
                修改密碼成功 請重新登入</Confirm>
            </Backdrop>}
            {showConfirm &&  
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} confirm={() => {dispatch(authAction.logout());navigate("/")}} >確認登出?</Confirm>
            </Backdrop>}
        </Fragment>
    );
}

export default Header;