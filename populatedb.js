#! /usr/bin/env node

console.log(
  'This script populates some test messages to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require('./models/message');

const messages = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createMessages();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function messageCreate(index, title, text) {
  const message = new Message({
    title: title,
    timestamp: new Date().toLocaleString('en-US'),
    text: text,
  });
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${title}`);
}

async function createMessages() {
  console.log('Adding message');
  await Promise.all([
    messageCreate(0, 'Welcome!', 'This is a great club!', 'Michael'),
    messageCreate(1, 'Thank you!', 'Appreciate it!', 'Hulk'),
    messageCreate(2, 'Hello!', 'Nice to see you!', 'Thor'),
    messageCreate(3, 'Good day!', 'How are you?', 'Loki'),
    messageCreate(
      4,
      'Have a great weekend!',
      'Enjoy your time!',
      'Black Widow'
    ),
    messageCreate(5, 'Greetings!', 'All the best!', 'Captain America'),
    messageCreate(6, 'Happy holidays!', 'Peace and joy!', 'Iron Man'),
    messageCreate(7, 'Hello world!', 'A friendly greeting!', 'Hawkeye'),
    messageCreate(8, 'Welcome back!', 'Glad to have you back!', 'Vision'),
    messageCreate(9, 'Goodbye!', 'See you soon!', 'Black Panther'),
  ]);
}
