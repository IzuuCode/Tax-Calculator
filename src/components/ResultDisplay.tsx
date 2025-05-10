interface ResultDisplayProps {
  title: string;
  value: string;
  prefix?: string;
}

const ResultDisplay = ({ title, value, prefix = 'Rs.' }: ResultDisplayProps) => {
  return (
    <div className="bg-blue-600 text-white p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-4">{title}</h2>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold">{prefix} {value}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;