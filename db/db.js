import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://hassanasif302672:eHknhOYxT9xsCpFy@cluster0.mdaenp9.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   
    console.log(`MongoDB connected: ${conn.connection.host} at ${conn.connection.port}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
