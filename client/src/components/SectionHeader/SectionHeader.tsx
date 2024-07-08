import { ReactNode } from 'react';

interface SectionHeaderProps {
  text: string;
  children: ReactNode;
}
const SectionHeader = ({ text, children }: SectionHeaderProps) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center p-4 bg-gray-200">
      <h2 className="text-xl text-center font-semibold">{text}</h2>
      {children}
    </div>
  );
};

export default SectionHeader;
