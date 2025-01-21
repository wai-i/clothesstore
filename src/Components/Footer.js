import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer =() => {
    const { t } = useTranslation("common");
    return(
        <div className="footer">
            <div className="footer_top">
                <div className="footer_top-about">
                <Link to="#">{t('about_us')}</Link>
                <Link to="#">{t('contact_us')}</Link>
                <Link to="#">{t('refund_and_return_policy')}</Link>
                </div>
                <div className="footer_top-social">
                    <span className="footer_top-social-followus">{t('follow_us')}</span>
                    <div className="footer_top-social-icon">
                        <Link className="fa-brands fa-twitter" to="#" ></Link>
                        <Link className="fa-brands fa-instagram" to="#"></Link>
                        <Link className="fa-brands fa-youtube" to="#"></Link>
                    </div>
                </div>
                <div className="footer_top-payment">
                    <span>{t('payment_methods')}</span>
                    <div className="footer_top-payment-icon">
                        <Link className="fa-brands fa-cc-visa" to="#"></Link>
                        <Link className="fa-brands fa-cc-mastercard" to="#"></Link>
                        <Link className="fa-brands fa-cc-paypal " to="#"></Link>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="footer_bottom-left">
                    <Link to="#"><span className="spanblock">{t('privacy_policy')}</span></Link>
                    <Link to="#"><span className="spanblock">{t('customeer_enquiry')}</span></Link>
                </div>
                <div className="footer_bottom-right">
                    <span>Product images © GU and Uniqlo. All rights reserved. This website is for educational purposes only.</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;