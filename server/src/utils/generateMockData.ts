import mongoose from 'mongoose';
import WorkSession from '../models/workSession';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);

const generateData = () => {
  const habits = ['674a31f7067208849ff496a5', '674a31ff067208849ff496aa', '674a34f8067208849ff49704'];
  const dataItems = [];
  for (let i = 0; i < 500; i++) {
    const data = {
      habit: faker.helpers.arrayElement(habits),
      timeDuration: faker.number.int({ min: 3600000, max: 21600000 }),
      finishedAt: faker.date.past(),
      user: '674336beef9a2c7461fb110f',
    };
    dataItems.push(data);
  }
  return dataItems;
};

const insertData = async () => {
  try {
    const data = generateData();
    await WorkSession.insertMany(data);
    console.log('Data inserted successfully.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

insertData();
