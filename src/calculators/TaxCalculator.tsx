import { useState } from 'react';
import { TaxFormData, TaxBracket } from '../types';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ResultDisplay from '../components/ResultDisplay';
import RadioGroup from '../components/RadioGroup';
import { calculateTax } from '../utils/calculatorUtils';
import { Plus } from 'lucide-react';

const TaxCalculator = () => {
  const [formData, setFormData] = useState<TaxFormData>({
    salary: '',
    calculationMode: 'brackets',
    flatRate: '',
  });
  
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
  const [totalTax, setTotalTax] = useState<string>('0.00');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleModeChange = (mode: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      calculationMode: mode as 'brackets' | 'flat' 
    }));
  };

  const handleAddBracket = () => {
    const newBracket: TaxBracket = {
      id: Date.now().toString(),
      minAmount: '',
      maxAmount: '',
      rate: '',
    };
    setTaxBrackets([...taxBrackets, newBracket]);
  };

  const handleBracketChange = (id: string, field: keyof TaxBracket, value: string) => {
    setTaxBrackets(
      taxBrackets.map((bracket) =>
        bracket.id === id ? { ...bracket, [field]: value } : bracket
      )
    );
  };

  const handleCalculate = () => {
    if (!formData.salary) return;

    let calculatedTax = 0;
    
    if (formData.calculationMode === 'brackets' && taxBrackets.length > 0) {
      calculatedTax = calculateTax(
        parseFloat(formData.salary),
        taxBrackets
      );
    } else if (formData.calculationMode === 'flat' && formData.flatRate) {
      const rate = parseFloat(formData.flatRate) / 100;
      calculatedTax = parseFloat(formData.salary) * rate;
    }

    setTotalTax(calculatedTax.toFixed(2));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tax Calculator</h1>
        
        <form>
          <FormInput
            label="Enter Total Salary:"
            id="salary"
            value={formData.salary}
            placeholder="Enter salary amount"
            onChange={handleInputChange}
            type="number"
          />
          
          <RadioGroup
            label="Choose Calculation Mode:"
            name="calculationMode"
            options={[
              { value: 'brackets', label: 'Use Brackets' },
              { value: 'flat', label: 'Flat Rate' }
            ]}
            value={formData.calculationMode}
            onChange={handleModeChange}
          />
          
          {formData.calculationMode === 'brackets' ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Tax Brackets:</h3>
                </div>
                
                {taxBrackets.map((bracket) => (
                  <div key={bracket.id} className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Min Amount"
                      value={bracket.minAmount}
                      onChange={(e) => handleBracketChange(bracket.id, 'minAmount', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Max Amount"
                      value={bracket.maxAmount}
                      onChange={(e) => handleBracketChange(bracket.id, 'maxAmount', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Rate %"
                      value={bracket.rate}
                      onChange={(e) => handleBracketChange(bracket.id, 'rate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddBracket}
                  className="w-full mt-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center justify-center transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Add Another Bracket
                </button>
              </div>
            </>
          ) : (
            <FormInput
              label="Flat Tax Rate (%):"
              id="flatRate"
              value={formData.flatRate || ''}
              placeholder="Enter flat tax rate"
              onChange={handleInputChange}
              type="number"
            />
          )}
          
          <Button 
            onClick={handleCalculate} 
            className="w-full"
          >
            Calculate Tax
          </Button>
        </form>
      </div>
      
      <ResultDisplay 
        title="Total Tax:"
        value={totalTax}
      />
    </div>
  );
};

export default TaxCalculator;