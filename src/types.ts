export type Calculator = 'loan' | 'tax' | 'fd';
export type Language = 'en' | 'si';

export interface TabProps {
  id: Calculator;
  label: string;
  isActive: boolean;
  onClick: (id: Calculator) => void;
}

export interface TabNavigationProps {
  activeTab: Calculator;
  onTabChange: (tab: Calculator) => void;
  language: Language;
}

export interface LoanFormData {
  loanAmount: string;
  loanTerm: string;
  interestRate: string;
}

export interface TaxFormData {
  salary: string;
  calculationMode: 'brackets' | 'flat';
  flatRate?: string;
}

export interface TaxBracket {
  id: string;
  minAmount: string;
  maxAmount: string;
  rate: string;
}

export interface FixedDepositFormData {
  principalAmount: string;
  interestRate: string;
  tenure: string;
}

export interface HeaderControlsProps {
  language: Language;
  isDarkMode: boolean;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (isDark: boolean) => void;
}

export interface CalculatorProps {
  language: Language;
}