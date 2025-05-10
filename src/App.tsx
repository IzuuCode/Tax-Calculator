import { useState, useEffect } from 'react';
import { Calculator, Language } from './types';
import TabNavigation from './components/TabNavigation';
import HeaderControls from './components/HeaderControls';
import LoanCalculator from './calculators/LoanCalculator';
import TaxCalculator from './calculators/TaxCalculator';
import FixedDepositCalculator from './calculators/FixedDepositCalculator';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<Calculator>('loan');
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang as Language) || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-200">
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <HeaderControls
            language={language}
            isDarkMode={isDarkMode}
            onLanguageChange={setLanguage}
            onThemeChange={setIsDarkMode}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <TabNavigation 
          activeTab={activeCalculator} 
          onTabChange={setActiveCalculator}
          language={language}
        />
        
        <div className="w-full mt-6">
          {activeCalculator === 'loan' && <LoanCalculator language={language} />}
          {activeCalculator === 'tax' && <TaxCalculator language={language} />}
          {activeCalculator === 'fd' && <FixedDepositCalculator language={language} />}
        </div>
      </div>
    </div>
  );
}

export default App;