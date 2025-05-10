import { Language, HeaderControlsProps } from '../types';
import { Sun, Moon } from 'lucide-react';

const HeaderControls = ({ 
  language, 
  isDarkMode, 
  onLanguageChange, 
  onThemeChange 
}: HeaderControlsProps) => {
  return (
    <div className="flex items-center gap-4 py-3">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="en">English</option>
        <option value="si">සිංහල</option>
      </select>
      
      <button
        onClick={() => onThemeChange(!isDarkMode)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default HeaderControls