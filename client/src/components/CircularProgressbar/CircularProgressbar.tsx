interface CircularProgressbarProps {
  angle: number;
  text: string;
  color: string;
}

const CircularProgressbar = ({
  angle,
  text,
  color,
}: CircularProgressbarProps) => {
  return (
    <div className=" relative w-56 h-56 m-4 flex justify-center items-center">
      <div className="shadow-md absolute w-56 h-56 bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
        <div
          className={`absolute w-1/2 h-full top-0 left-0 origin-right ${
            angle === 0 ? 'hidden' : 'block'
          }`}
          style={{
            transform: angle > 180 ? 'rotate(180deg)' : `rotate(${angle}deg)`,
            backgroundColor: color,
          }}
        ></div>
        <div
          className={`absolute w-1/2 h-full top-0 left-0 origin-right ${
            angle === 0 ? 'hidden' : 'block'
          }`}
          style={{
            transform: `rotate(${angle}deg)`,
            backgroundColor: color,
          }}
        ></div>
        <div
          className="absolute w-1/2 h-full top-0 left-0 origin-right"
          style={{
            display: angle > 180 ? 'none' : 'block',
            backgroundColor: '#ddd',
          }}
        ></div>
        <div className="absolute w-52 h-52 bg-white rounded-full"></div>
      </div>
      <div className="border border-gray-200 rounded-md shadow-md  p-2 absolute z-10 text-2xl font-semibold flex justify-center items-center">
        {text}
      </div>
    </div>
  );
};

export default CircularProgressbar;
