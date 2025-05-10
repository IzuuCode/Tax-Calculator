import { TaxBracket } from '../types';

/**
 * Calculate loan EMI (Equated Monthly Installment)
 * 
 * Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 * Where:
 * - P is the loan amount
 * - R is the interest rate per month (annual rate divided by 12 and then by 100)
 * - N is the number of monthly installments
 */
export const calculateLoanEMI = (
  loanAmount: number,
  loanTerm: number,
  annualInterestRate: number
): number => {
  // Convert annual interest rate to monthly rate and decimal form
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  
  // If interest rate is 0, simply divide loan amount by term
  if (monthlyInterestRate === 0) {
    return loanAmount / loanTerm;
  }
  
  // EMI calculation formula
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanTerm)) /
    (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
  
  return emi;
};

/**
 * Calculate tax based on income and tax brackets
 */
export const calculateTax = (
  income: number,
  brackets: TaxBracket[]
): number => {
  let totalTax = 0;
  
  // Sort brackets by minimum amount
  const sortedBrackets = [...brackets]
    .filter(bracket => 
      bracket.minAmount !== '' && 
      bracket.rate !== '' && 
      !isNaN(parseFloat(bracket.minAmount)) && 
      !isNaN(parseFloat(bracket.rate))
    )
    .sort((a, b) => parseFloat(a.minAmount) - parseFloat(b.minAmount));
  
  // Calculate tax for each bracket
  for (let i = 0; i < sortedBrackets.length; i++) {
    const bracket = sortedBrackets[i];
    const min = parseFloat(bracket.minAmount);
    const rate = parseFloat(bracket.rate) / 100;
    
    let max = income;
    if (bracket.maxAmount && bracket.maxAmount !== '') {
      max = Math.min(parseFloat(bracket.maxAmount), income);
    } else if (i < sortedBrackets.length - 1) {
      max = Math.min(parseFloat(sortedBrackets[i + 1].minAmount), income);
    }
    
    if (income >= min) {
      const taxableAmount = max - min;
      totalTax += taxableAmount > 0 ? taxableAmount * rate : 0;
    }
  }
  
  return totalTax;
};

/**
 * Calculate fixed deposit maturity amount
 * 
 * Formula: A = P(1 + r/n)^(nt)
 * Where:
 * - A is the maturity amount
 * - P is the principal amount
 * - r is the annual interest rate (in decimal)
 * - n is the number of times interest is compounded per year
 * - t is the time in years
 */
export const calculateFixedDeposit = (
  principalAmount: number,
  annualInterestRate: number,
  tenureMonths: number
): number => {
  // Convert annual interest rate to decimal
  const rate = annualInterestRate / 100;
  
  // Convert tenure from months to years
  const tenureYears = tenureMonths / 12;
  
  // Assuming quarterly compounding (4 times a year) by default
  const compoundingFrequency = 4;
  
  // Calculate maturity amount
  const maturityAmount =
    principalAmount *
    Math.pow(
      1 + rate / compoundingFrequency,
      compoundingFrequency * tenureYears
    );
  
  return maturityAmount;
};