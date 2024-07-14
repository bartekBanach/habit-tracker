import { ReactNode } from 'react';

interface SectionHeaderProps {
  text: string;
  children: ReactNode;
}
const SectionHeader = ({ text, children }: SectionHeaderProps) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center p-4 bg-gray-200 w-full">
      <h2 className="text-2xl text-center font-semibold">{text}</h2>
      {children}
    </div>
  );
};

export default SectionHeader;
