import { useState } from 'react';
import { ColorResult } from 'react-color';
import styles from './ColorPicker.module.css';
import { BlockPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}
const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  console.log('COLOR', color);
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
    <div>
      <div className={styles.swatch} onClick={handleClick}>
        <div className={styles.color} style={{ backgroundColor: color }} />
      </div>
      {display ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <BlockPicker color={color} onChange={handleChange} triangle={'top'} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
