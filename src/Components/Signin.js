import React, { useEffect, useState } from "react";
import useInput from "../Hook/useInput";
import { authAction } from "../Store/auth-Slice";
import { useDispatch, useSelector } from "react-redux";
import sha256 from 'js-sha256';
import { useTranslation } from 'react-i18next';
import { database } from "../Firebase"; // 檔案路徑應正確對應 Firebase.js
import { ref, onValue } from "firebase/database";

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const isEmailFormat = (value) => emailRule.test(value);
const isPwdFormat= (value) => value.length >=8 ;


const Signin = (props) => {
    const { t } = useTranslation('common');
    const {
        value: emailValue,
        isValid: emailValueIsValid,
        hasError: emailValueError,
        onChangeValue: onChangeEmail,
        onBlurValue: onBlurEmail,
        reset: resetEmail
    } = useInput(isEmailFormat);

    const {
        value: pwdValue,
        isValid: pwdValueIsValid,
        hasError: pwdValueError,
        onChangeValue: onChangePwd,
        onBlurValue: onBlurPwd,
        reset: resetPwd
    } = useInput(isPwdFormat);

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);
    const [isError, setIsError] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
    
        if (!emailValueIsValid) {
          return;
        }

        const dbRef = ref(database, "users"); 
        const hashPwdValue = sha256(pwdValue);
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const filteredEntries = Object.entries(data).filter(
                ([key, value]) => value.email === emailValue && value.pwd === hashPwdValue
              );
              if (filteredEntries.length > 0) {
                const [matchedKey, matchedData] = filteredEntries[0];
                dispatch(authAction.login({id: matchedKey, email: matchedData.email, name: matchedData.firstName, token: matchedKey}));        
                props.close();
             }else{
                resetEmail();
                resetPwd();
                setIsError(true);
             }
          }});
          return () => unsubscribe();
    }

    return(
            <div className="signin" onClick={(e) => e.stopPropagation()}>
                <div className="signin_close">
                    <i className="signin_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
                </div>
                <form className="signin_form" onSubmit={submitForm}>
                    {isError && <div className="signin_form_error"><i className="fa-solid fa-circle-exclamation"></i>{t('email_or_password_incorrect')}</div>}
                    <div className="signin_email">
                        <input placeholder={emailValueError? t('enter_valid_email') : t('email_address')}
                            className={emailValueError? "input-error" : ""}
                            onChange={onChangeEmail}
                            onBlur={onBlurEmail}
                            value={emailValue}
                        />
                    </div>
                    <div className="signin_pwd">
                        <input type="password" placeholder={pwdValueError? t('enter_password_8_or_more') : t('password')}
                            className={pwdValueError? "input-error" : ""}
                            onChange={onChangePwd}
                            onBlur={onBlurPwd}
                            value={pwdValue}                  
                        />
                    </div>
                    <div className="signin_form_submit">
                            <button type="submit" disabled={!emailValueIsValid || !pwdValueIsValid }>{t('login')}</button>
                    </div>
                </form>
            </div>
    )
}

export default Signin;