import mongoose from 'mongoose';
import WorkSession from '../models/workSession';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);

const generateData = () => {
  const habits = [
    '663652ab11fa22b22aca7433',
    '663a1ee36e5fe01263d5e21d',
    '663a2567b3d56fcdfb9092cb',
    '663a35d3b3d56fcdfb909306',
    '663a8be5b3d56fcdfb909368',
  ];
  const dataItems = [];
  for (let i = 0; i < 500; i++) {
    const data = {
      habit: faker.helpers.arrayElement(habits),
      timeDuration: faker.number.int({ min: 3600000, max: 21600000 }),
      finishedAt: faker.date.past(),
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
