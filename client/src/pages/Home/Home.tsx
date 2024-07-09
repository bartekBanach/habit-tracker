import { Link } from 'react-router-dom';
import heroImage from '../../assets/heroSection.jpg';
import { ImStatsBars } from 'react-icons/im';
import { GiStairsGoal } from 'react-icons/gi';
import { IoIosTimer } from 'react-icons/io';

const Home = () => {
  return (
    <div className="">
      <section className=" bg-gray-100 text-black py-14 px-10 ">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6">
              Track Your Habits, Achieve Your Goals
            </h1>
            <p className="text-lg mb-6">
              Our app helps you set up timers, track your progress, and achieve
              your goals with ease. Stay motivated and organized with a
              personalized habit tracker.
            </p>
            <ul className="flex flex-col gap-5 mb-8">
              <li className="bg-white p-4 rounded-md shadow-md flex items-center justify-between text-lg">
                <p>Set up timers for your habits</p>
                <IoIosTimer className="text-gray-500 text-2xl" />
              </li>
              <li className="bg-white p-4 rounded-md shadow-md flex items-center justify-between text-lg">
                <p>Monitor your daily, weekly, and monthly progress</p>
                <ImStatsBars className="text-gray-500 text-2xl" />
              </li>
              <li className="bg-white p-4 rounded-md shadow-md flex items-center justify-between text-lg">
                <p>Set achievable goals and milestones</p>
                <GiStairsGoal className="text-gray-500 text-2xl" />
              </li>
            </ul>
            <Link
              to="/register"
              className="self-center md:self-start inline-block bg-blue-500 border border-gray300 shadow-md text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-400"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Habit Tracker App"
              className="w-full lg:w-9/12 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
