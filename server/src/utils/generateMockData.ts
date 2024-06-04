import mongoose from 'mongoose';
import WorkSession from '../models/workSession';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);

const generateData = () => {
  const habits = [
    '663652ab11fa22b22aca7433',
    '663a2567b3d56fcdfb9092cb',
    '665b860593ebf50fab2087fa',
    '665b86be93ebf50fab20880f',
    '665b87c593ebf50fab20881a',
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
