import React, { useEffect, useState } from "react";
import useInput from "../Hook/useInput";
import Backdrop from "../Components/Backdrop";
import Confirm from "../Components/Confirm";
import { useNavigate } from "react-router-dom";
import sha256 from "js-sha256";
import { useTranslation } from "react-i18next";
import { database } from "../Firebase"; // Firebase instance
import { ref, push, set, get } from "firebase/database"; // Firebase methods

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const isNotEmpty = (value) => value.trim() !== "";
const isEmailFormat = (value) => emailRule.test(value);
const isPwdFormat = (value) => value.length >= 8;

const Signup = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const {
    value: lastNameValue,
    isValid: lastNameValueIsValid,
    hasError: lastNameValueError,
    onChangeValue: onChangeLastName,
    onBlurValue: onBlurLastName,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: firstNameValue,
    isValid: firstNameValueIsValid,
    hasError: firstNameValueError,
    onChangeValue: onChangeFirstName,
    onBlurValue: onBlurFirstName,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailValueIsValid,
    hasError: emailValueError,
    onChangeValue: onChangeEmail,
    onBlurValue: onBlurEmail,
    reset: resetEmail,
  } = useInput(isEmailFormat);

  const {
    value: pwdValue,
    isValid: pwdValueIsValid,
    hasError: pwdValueError,
    onChangeValue: onChangePwd,
    onBlurValue: onBlurPwd,
    reset: resetPwd,
  } = useInput(isPwdFormat);

  const {
    value: confirmPwdValue,
    isValid: confirmPwdValueIsValid,
    hasError: confirmPwdValueError,
    onChangeValue: onChangeConfirmPwd,
    onBlurValue: onBlurConfirmPwd,
    reset: resetConfirmPwd,
  } = useInput((value) => value === pwdValue);

  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const dbRef = ref(database, "users");
      const snapshot = await get(dbRef);
      const users = snapshot.val() || {};

      const isDuplicate = Object.values(users).some(
        (user) => user.email === emailValue
      );

      if (isDuplicate) {
        setIsEmailDuplicate(true);
        return;
      }

      const maxUid = Math.max(0, ...Object.values(users).map((user) => user.uid || 0));
      const newUid = maxUid + 1;
      const newUserRef = push(dbRef);
      const hashPwdValue = sha256(pwdValue);
      const newUserData = {
        email: emailValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        pwd: hashPwdValue,
        uid: newUid, 
        orders: {}, 
      };

      await set(newUserRef, newUserData);

      resetLastName();
      resetFirstName();
      resetEmail();
      resetPwd();
      resetConfirmPwd();

      setShowConfirm(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (emailValueIsValid) {
      setIsEmailDuplicate(false); 
    }
  }, [emailValue, emailValueIsValid]);

  return (
    <div className="signup">
      <div className="signup_title">
        <h1>{t("create_account")}</h1>
      </div>
      <form className="signup_form" onSubmit={submitForm}>
        <div className="signup_form_name">
          <div className="signup_form_lastname">
            <input
              placeholder={
                lastNameValueError
                  ? t("please_enter_last_name")
                  : t("last_name")
              }
              className={lastNameValueError ? "input-error" : ""}
              onChange={onChangeLastName}
              onBlur={onBlurLastName}
              value={lastNameValue}
            />
          </div>
          <div className="signup_form_firstname">
            <input
              placeholder={
                firstNameValueError
                  ? t("please_enter_first_name")
                  : t("first_name")
              }
              className={firstNameValueError ? "input-error" : ""}
              onChange={onChangeFirstName}
              onBlur={onBlurFirstName}
              value={firstNameValue}
            />
          </div>
        </div>
        <div className="signup_form_email">
          <input
            placeholder={
              emailValueError
                ? t("please_enter_valid_email")
                : t("email_address")
            }
            className={emailValueError ? "input-error" : ""}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            value={emailValue}
          />
          {isEmailDuplicate && (
            <div className="signup_form_email_error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {t("email_already_in_use")}
            </div>
          )}
        </div>
        <div className="signup_form_pwd">
          <input
            type="password"
            placeholder={
              pwdValueError
                ? t("please_enter_password_8_or_more")
                : t("password")
            }
            className={pwdValueError ? "input-error" : ""}
            onChange={onChangePwd}
            onBlur={onBlurPwd}
            value={pwdValue}
          />
        </div>
        <div className="signup_form_confirmpwd">
          <input
            type="password"
            placeholder={
              confirmPwdValueError
                ? t("two_password_not_same")
                : t("confirm_password")
            }
            className={confirmPwdValueError ? "input-error" : ""}
            onChange={onChangeConfirmPwd}
            onBlur={onBlurConfirmPwd}
            value={confirmPwdValue}
          />
        </div>
        <div className="signup_form_submit">
          <button
            type="submit"
            disabled={
              !lastNameValueIsValid ||
              !firstNameValueIsValid ||
              !emailValueIsValid ||
              !pwdValueIsValid ||
              !confirmPwdValueIsValid ||
              isEmailDuplicate
            }
          >
            {t("register")}
          </button>
        </div>
      </form>
      {showConfirm && (
        <Backdrop
          close={() => {
            setShowConfirm(false);
            navigate("/");
          }}
          transpanent={0.6}
        >
          <Confirm
            close={() => {
              setShowConfirm(false);
              navigate("/");
            }}
            isOnlyConfirm="true"
            confirm={() => navigate("/")}
          >
            {t("register_success_login")}
          </Confirm>
        </Backdrop>
      )}
    </div>
  );
};

export default Signup;
