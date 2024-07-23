import SectionHeader from '../SectionHeader/SectionHeader';
import { ReactNode } from 'react';

interface SectionContainerProps {
  headerText: string;
  headerChildren: ReactNode;
  children: ReactNode;
}

const SectionContainer = ({
  children,
  headerText,
  headerChildren,
}: SectionContainerProps) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden shadow-md  flex-grow flex flex-col">
      <SectionHeader text={headerText}>{headerChildren}</SectionHeader>
      {children}
    </div>
  );
};

export default SectionContainer;
