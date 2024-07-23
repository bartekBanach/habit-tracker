import { useState } from 'react';
import { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay((prev) => !prev);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleChange = (color: ColorResult) => {
    onColorChange(color.hex);
  };

  return (
    <div className="relative inline-block">
      <div
        className="p-1 bg-white rounded shadow-sm cursor-pointer border border-gray-300 w-fit"
        onClick={handleClick}
      >
        <div className="w-9 h-4 rounded" style={{ backgroundColor: color }} />
      </div>
      {display && (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
