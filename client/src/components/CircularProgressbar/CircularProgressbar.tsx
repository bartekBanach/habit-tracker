import styles from './CircularProgressbar.module.css';

interface CircularProgressbarProps {
  angle: number;
  text: string;
}
const CircularProgressbar = ({ angle, text }: CircularProgressbarProps) => {
  console.log('angle', angle);
  return (
    <div className={`${styles.mainContainer} ${styles.center}`}>
      <div className={`${styles.circleContainer} ${styles.center}`}>
        <div
          className={styles.semicircle}
          style={{
            transform: angle > 180 ? 'rotate(180deg)' : `rotate(${angle}deg)`,
            display: angle === 0 ? 'none' : 'block',
          }}
        ></div>
        <div
          className={styles.semicircle}
          style={{
            transform: `rotate(${angle}deg)`,
            display: angle === 0 ? 'none' : 'block',
          }}
        ></div>
        <div
          className={styles.semicircle}
          style={{ display: angle > 180 ? 'none' : 'block' }}
        ></div>
        <div className={styles.outmostCircle}></div>
      </div>
      <div className={`${styles.textContainer} ${styles.center}`}>
        <div className={`${styles.text} ${styles.center}`}>{text}</div>
      </div>
    </div>
  );
};

export default CircularProgressbar;
