import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import getDatabase from "@/lib/db";
import User from "@/models/user"; // Assuming you've defined a User model

export async function POST(req) {
  await getDatabase();
  console.log("formdata", req);
  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid credentials", status: 401 });
    }

    // Successful login
    return NextResponse.json({
      message: "Login successful",
      status: 200,
      user: {
        id: user._id,
        email: user.email,
        // Add any other user details you want to return
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
