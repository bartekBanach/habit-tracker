interface ProgressBarProps {
  value: number;
  maxValue: number;
  color: string;
  label?: string;
}
const ProgressBar = ({ value, maxValue, color, label }: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 borde overflow-hidden">
      <div
        className="h-4 text-xs text-center text-black font-semibold rounded-full "
        style={{ width: `${percentage}%`, backgroundColor: `${color}` }}
      >
        {label}
      </div>
    </div>
  );
};

export default ProgressBar;
