const mongoose = require('mongoose');

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/d2ovj9', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }
};
