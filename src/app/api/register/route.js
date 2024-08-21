import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import getDatabase from "@/lib/db";
// import User from "@/models/user"; // Assuming you've defined a User model
import User from "../../../models/user";

export async function POST(req) {
  await getDatabase();
  try {
    const { email, password } = await req.json();
    console.log("working");

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("working1");

    // Save the user to the database
    await newUser.save();
    console.log("working2");

    // Successful registration
    return NextResponse.json({
      message: "User registered successfully",
      status: 201,
      user: {
        id: newUser._id,
        email: newUser.email,
        // Add any other user details you want to return
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
