import { Calculator, TabNavigationProps, TabProps } from '../types';

const translations = {
  en: {
    loan: 'LOAN CAL',
    tax: 'TAX CAL',
    fd: 'FD CAL'
  },
  si: {
    loan: 'ණය ගණකය',
    tax: 'බදු ගණකය',
    fd: 'ස්ථාවර තැන්පතු ගණකය'
  }
};

const Tab = ({ id, label, isActive, onClick }: TabProps) => {
  return (
    <button
      className={`px-4 py-3 font-medium transition-colors relative
      ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'}`}
      onClick={() => onClick(id)}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 transition-all"></div>
      )}
    </button>
  );
};

const TabNavigation = ({ activeTab, onTabChange, language }: TabNavigationProps) => {
  const tabs = [
    { id: 'loan' as Calculator, label: translations[language].loan },
    { id: 'tax' as Calculator, label: translations[language].tax },
    { id: 'fd' as Calculator, label: translations[language].fd },
  ];

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={onTabChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;