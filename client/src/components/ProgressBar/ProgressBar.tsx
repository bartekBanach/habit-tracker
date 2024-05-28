interface ProgressBarProps {
  value: number;
  maxValue: number;
  color: string;
  label?: string;
}
const ProgressBar = ({ value, maxValue, color, label }: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4 border overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ width: `${percentage}%`, backgroundColor: `${color}` }}
      />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-black font-semibold">{label}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
