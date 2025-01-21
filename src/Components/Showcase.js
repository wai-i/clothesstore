import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Showcase = () => {
    const { t } = useTranslation('common');

    return(
        <div className="showcase">
            <div className="showcase_subtitle">
                <p>{t('winter_cozy')}</p>
            </div>
            <div className="showcase_top">
                <div className="showcase_item">
                    <Link to="coats"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_7.jpg"  alt="大衣" /></Link>
                    <Link to="coats"><h1>{t('coat')}</h1></Link>
                    <Link to="coats"><p>{t('coat_description')}</p></Link>
                </div>
                <div className="showcase_item">
                    <Link to="blazers"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_5.jpg" alt="西裝 / 外套" /></Link>
                    <Link to="blazers"><h1>{t('blazer_or_outerwear')}</h1></Link>
                    <Link to="blazers"><p>{t('blazer_or_outerwear_description')}</p> </Link>
                </div>
                <div className="showcase_item">
                    <Link to="down"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_2.jpg" alt="羽絨" /></Link>
                    <Link to="down"><h1>{t('down_jacket')}</h1></Link>
                    <Link to="down"><p>{t('down_jacket_description')}</p></Link>
                </div>
            </div>
            <div className="showcase_subtitle">
                <p>{t('simple_casual')}</p>
            </div>
            <div className="showcase_bottom">
            <div className="showcase_item">
                    <Link to="t-shirts"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_top_8.jpg"  alt="短袖T卹 / 背心" /></Link>
                    <Link to="t-shirts"><h1>{t('short_sleeve_and_tank_top')}</h1></Link>
                    <Link to="t-shirts"><p>{t('short_sleeve_and_tank_top_description')}</p></Link>
                </div>
                <div className="showcase_item">
                    <Link to="shirts"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/men/m_top_5.jpg" alt="休閒恤衫" /></Link>
                    <Link to="shirts"><h1>{t('casual_shirts')}</h1></Link>
                    <Link to="shirts"><p>{t('casual_shirts_description')}</p> </Link>
                </div>
                <div className="showcase_item">
                    <Link to="long"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/men/m_top_7.jpg" alt="長袖 / 7分袖T卹" /></Link>
                    <Link to="long"><h1>{t('long_or_three_quarter_sleeve_tshirt')}</h1></Link>
                    <Link to="long"><p>{t('long_or_three_quarter_sleeve_tshirt_description')}</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Showcase;