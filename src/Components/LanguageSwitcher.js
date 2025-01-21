import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleSwitchLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      {currentLang === 'zh' ? (
        <button className="langSwitch" onClick={() => handleSwitchLang('en')}>Eng</button>
      ) : (
        <button className="langSwitch" onClick={() => handleSwitchLang('zh')}>繁</button>
      )}
    </div>
  );
}

export default LanguageSwitcher;
