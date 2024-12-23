import mongoose from "mongoose";
import "dotenv/config";

class ConnectDb {
  async execute() {
    const mongoUrl = process.env.DATABASE_URL as string;

    try {
      await mongoose.connect(mongoUrl).then((data: any) => {
        console.log(`Database is connected with ${data.connection.host}`)
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

export default new ConnectDb();
