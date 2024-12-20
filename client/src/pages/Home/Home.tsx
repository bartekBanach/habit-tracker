import heroImage from '../../assets/heroSectionImg.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="bg-white text-black py-14 px-14 ">
      <div className="container mx-auto  flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col md:w-1/2 mb-8 md:mb-0 items-start gap-7">
          <h1 className="text-4xl md:text-5xl font-bold">
            Track Your Habits, Achieve Your Goals
          </h1>

          <p className="text-xl md:text-2xl font-normal text-gray-400">
            Our app helps you set up timers, track your progress, and achieve
            your goals with ease. Stay motivated and organized with a
            personalized habit tracker.
          </p>
          <Link
            className={`px-5 py-2 rounded-md shadow-md bg-primary text-white font-semibold`}
            to={'/register'}
          >
            Join now!
          </Link>
        </div>

        <div className="w-full md:w-3/4 lg:w-1/2 flex justify-end">
          <img
            src={heroImage}
            alt="Habit Tracker App"
            className={`w-full h-auto`}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
