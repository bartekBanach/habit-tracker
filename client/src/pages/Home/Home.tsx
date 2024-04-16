import { useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer';
import { v4 as uuidv4 } from 'uuid';
import styles from './Home.module.css';
import HabitForm from '../../features/habits/HabitForm';
import HabitsList from '../../features/habits/HabitsList/HabitsList';
import { useGetHabitsQuery } from '../../features/habits/HabitsApiSlice';

const Home = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const {
    data: habits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHabitsQuery({});

  useEffect(() => {
    setTimers(JSON.parse(localStorage.getItem('timers') ?? '[]') as Timer[]);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (
      !formData.get('title') ||
      !formData.get('hours') ||
      !formData.get('minutes')
    )
      return;

    const newTimer = {
      id: uuidv4(),
      title: (formData.get('title') ?? 'Unknown') as string,
      duration: {
        hours: parseInt((formData.get('hours') ?? '0') as string),
        minutes: parseInt((formData.get('minutes') ?? '0') as string),
        seconds: 0,
      },
    };
    setTimers((prev) => [...prev, newTimer]);
    localStorage.setItem('timers', JSON.stringify([...timers, newTimer]));
    e.target.reset();
  };
  console.log(habits);

  if (habits)
    return (
      <div className={styles.container}>
        <aside>
          <HabitsList habits={habits} />
          <HabitForm />
        </aside>
        <main>
          <form onSubmit={handleSubmit}>
            <select name="category">
              {habits.map((item: Habit) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              required
              name="title"
              type="text"
              placeholder="title"
            ></input>
            <input
              required
              name="hours"
              type="number"
              placeholder="hours"
            ></input>
            <input
              required
              name="minutes"
              type="number"
              placeholder="minutes"
            ></input>
            <button type="submit">New timer</button>
          </form>

          {timers.map((item) => (
            <Timer
              key={item.id}
              id={item.id}
              title={item.title}
              duration={item.duration}
            />
          ))}
          <Timer
            title="coding"
            id={'zz8182128921'}
            duration={{ hours: 1, minutes: 0, seconds: 0 }}
          />
        </main>
      </div>
    );
};

export default Home;
