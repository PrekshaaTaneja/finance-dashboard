import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model";
import Transaction from "../models/transaction.model";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    await User.deleteMany();
    await Transaction.deleteMany();

    const password = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@finance.com",
      password,
      role: "admin",
    });

    await Transaction.insertMany([
      {
        amount: 50000,
        type: "income",
        category: "salary",
        date: new Date(),
        notes: "Monthly salary",
        createdBy: admin._id,
      },
      {
        amount: 10000,
        type: "expense",
        category: "rent",
        date: new Date(),
        notes: "House rent",
        createdBy: admin._id,
      },
    ]);

    console.log("✅ Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seed();