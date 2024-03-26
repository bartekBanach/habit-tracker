import { useState } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import { v4 as uuidv4 } from 'uuid';

interface Timer {
  id: string;
  title: string;
  duration: Duration;
}
function App() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (
      !formData.get('title') ||
      !formData.get('hours') ||
      !formData.get('minutes')
    )
      return;
    setTimers((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: (formData.get('title') ?? 'Unknown') as string,
        duration: {
          hours: parseInt((formData.get('hours') ?? '0') as string),
          minutes: parseInt((formData.get('minutes') ?? '0') as string),
          seconds: 0,
        },
      },
    ]);
    e.target.reset();
  };

  function calculateEndTime(hours: number, minutes: number) {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);
    return endTime;
  }

  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 1);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input required name="title" type="text" placeholder="title"></input>
        <input required name="hours" type="number" placeholder="hours"></input>
        <input
          required
          name="minutes"
          type="number"
          placeholder="minutes"
        ></input>
        <button type="submit">New timer</button>
      </form>

      {timers.map((item) => (
        <Timer key={item.id} title={item.title} duration={item.duration} />
      ))}
      <Timer title="coding" duration={{ hours: 1, minutes: 0, seconds: 0 }} />
    </>
  );
}

export default App;
