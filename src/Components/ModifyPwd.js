import React, { useState } from "react";
import useInput from "../Hook/useInput";
import { authAction } from "../Store/auth-Slice";
import { useDispatch, useSelector } from "react-redux";
import sha256 from "js-sha256";
import { useTranslation } from "react-i18next";
import { ref, get, update } from "firebase/database";
import { database } from "../Firebase";

const isPwdFormat = (value) => value.length >= 8;

const ModifyPwd = (props) => {
  const { t } = useTranslation("common");

  const {
    value: oldPwdValue,
    isValid: oldPwdValueIsValid,
    hasError: oldPwdValueError,
    onChangeValue: onChangeOldPwd,
    onBlurValue: onBlurOldPwd,
    reset: resetOldPwd,
  } = useInput(isPwdFormat);

  const {
    value: pwdValue,
    isValid: pwdValueIsValid,
    hasError: pwdValueError,
    onChangeValue: onChangePwd,
    onBlurValue: onBlurPwd,
    reset: resetPwd,
  } = useInput((value) => value.length >= 8 && value !== oldPwdValue);

  const {
    value: confirmPwdValue,
    isValid: confirmPwdValueIsValid,
    hasError: confirmPwdValueError,
    onChangeValue: onChangeConfirmPwd,
    onBlurValue: onBlurConfirmPwd,
    reset: resetConfirmPwd,
  } = useInput((value) => value === pwdValue);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [oldPwdCorrect, setOldPwdCorrect] = useState(true);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const userRef = ref(database, `users/${token}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const hashOldPwdValue = sha256(oldPwdValue);
        const hashPwdValue = sha256(pwdValue);

        if (userData.pwd !== hashOldPwdValue) {
          setOldPwdCorrect(false);
          return;
        }

        await update(userRef, { pwd: hashPwdValue });

        dispatch(authAction.login({ ...userData, pwd: hashPwdValue }));
        props.success();
      } else {
        console.error("User data not found.");
        setOldPwdCorrect(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setOldPwdCorrect(false);
    }
  };

  return (
    <div className="modifypwd" onClick={(e) => e.stopPropagation()}>
      <div className="modifypwd_close">
        <i
          className="modifypwd_close_icon fa-solid fa-xmark"
          onClick={() => props.close()}
        ></i>
      </div>
      <form className="modifypwd_form" onSubmit={submitForm}>
        {!oldPwdCorrect && (
          <div className="modifypwd_form_error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {t("password_incorrect")}
          </div>
        )}
        <div className="modifypwd_pwd">
          <input
            type="password"
            placeholder={
              oldPwdValueError
                ? t("enter_password_8_or_more")
                : t("enter_old_password")
            }
            className={oldPwdValueError ? "input-error" : ""}
            onChange={onChangeOldPwd}
            onBlur={onBlurOldPwd}
            value={oldPwdValue}
          />
        </div>
        <div className="modifypwd_pwd">
          <input
            type="password"
            placeholder={
              pwdValueError
                ? t("enter_password_8_or_more")
                : t("enter_new_password")
            }
            className={pwdValueError ? "input-error" : ""}
            onChange={onChangePwd}
            onBlur={onBlurPwd}
            value={pwdValue}
          />
        </div>
        <div className="modifypwd_pwd">
          <input
            type="password"
            placeholder={
              confirmPwdValueError
                ? t("enter_password_8_or_more")
                : t("enter_confirm_password")
            }
            className={confirmPwdValueError ? "input-error" : ""}
            onChange={onChangeConfirmPwd}
            onBlur={onBlurConfirmPwd}
            value={confirmPwdValue}
          />
        </div>
        <div className="modifypwd_form_submit">
          <button
            type="submit"
            disabled={
              !oldPwdValueIsValid || !pwdValueIsValid || !confirmPwdValueIsValid
            }
          >
            {t("change_password")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyPwd;
