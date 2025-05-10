import { useState } from 'react';
import { FixedDepositFormData } from '../types';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ResultDisplay from '../components/ResultDisplay';
import { calculateFixedDeposit } from '../utils/calculatorUtils';

const FixedDepositCalculator = () => {
  const [formData, setFormData] = useState<FixedDepositFormData>({
    principalAmount: '',
    interestRate: '',
    tenure: '',
  });
  
  const [maturityAmount, setMaturityAmount] = useState<string>('0.00');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    if (!formData.principalAmount || !formData.interestRate || !formData.tenure) {
      return;
    }

    const maturity = calculateFixedDeposit(
      parseFloat(formData.principalAmount),
      parseFloat(formData.interestRate),
      parseFloat(formData.tenure)
    );

    setMaturityAmount(maturity.toFixed(2));
  };

  const handleReset = () => {
    setFormData({
      principalAmount: '',
      interestRate: '',
      tenure: '',
    });
    setMaturityAmount('0.00');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Fixed Deposit Calculator</h1>
        
        <form>
          <FormInput
            label="Principal Amount (Rs.)"
            id="principalAmount"
            value={formData.principalAmount}
            placeholder="Enter Principal Amount"
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
          
          <FormInput
            label="Tenure (Months)"
            id="tenure"
            value={formData.tenure}
            placeholder="Enter Tenure in Months"
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
        title="Maturity Amount"
        value={maturityAmount}
      />
    </div>
  );
};

export default FixedDepositCalculator;