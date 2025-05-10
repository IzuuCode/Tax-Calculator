import { useState } from 'react';
import { LoanFormData } from '../types';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ResultDisplay from '../components/ResultDisplay';
import { calculateLoanEMI } from '../utils/calculatorUtils';

const LoanCalculator = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
  });
  
  const [monthlyInstallment, setMonthlyInstallment] = useState<string>('0.00');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    if (!formData.loanAmount || !formData.loanTerm || !formData.interestRate) {
      return;
    }

    const emi = calculateLoanEMI(
      parseFloat(formData.loanAmount),
      parseFloat(formData.loanTerm),
      parseFloat(formData.interestRate)
    );

    setMonthlyInstallment(emi.toFixed(2));
  };

  const handleReset = () => {
    setFormData({
      loanAmount: '',
      loanTerm: '',
      interestRate: '',
    });
    setMonthlyInstallment('0.00');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Calculator</h1>
        
        <form>
          <FormInput
            label="Loan Amount (Rs.)"
            id="loanAmount"
            value={formData.loanAmount}
            placeholder="Enter Loan Amount"
            onChange={handleInputChange}
            type="number"
          />
          
          <FormInput
            label="Loan Term (Months)"
            id="loanTerm"
            value={formData.loanTerm}
            placeholder="Enter Loan Term"
            onChange={handleInputChange}
            type="number"
          />
          
          <FormInput
            label="Interest Rate (%)"
            id="interestRate"
            value={formData.interestRate}
            placeholder="Enter Interest Rate"
            onChange={handleInputChange}
            type="number"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleCalculate}>Calculate</Button>
            <Button variant="secondary" onClick={handleReset}>Reset</Button>
          </div>
        </form>
      </div>
      
      <ResultDisplay 
        title="Your Monthly Installment"
        value={monthlyInstallment}
      />
    </div>
  );
};

export default LoanCalculator;