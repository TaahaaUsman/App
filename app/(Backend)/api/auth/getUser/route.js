import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getServerSession } from "next-auth";
import db from "@/app/(Backend)/database/lib/db";
import User from "@/app/(Backend)/database/models/userModel/userSchema";
import { verifyToken } from "@/app/(Backend)/utils/jwt";
import { authOptions } from "@/app/(Backend)/database/lib/authOptions";

export async function GET() {
  try {
    await db(); // Connect to DB

    const header = await headers();
    const cookie = await cookies();
    // Step 1: Get token from Authorization header or cookie
    const headerToken = header.get("authorization")?.replace("Bearer ", "");
    const cookieToken = cookie.get("token")?.value;
    const token = headerToken || cookieToken;

    // ✅ Case 1: Custom JWT (Mobile or Web with Bearer token)
    if (token) {
      try {
        const decoded = verifyToken(token); // e.g., { id: userId }
        const user = await User.findById(decoded.id).select("-password -__v");

        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(user, { status: 200 });
      } catch (err) {
        console.error("JWT verify failed:", err);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }

    // ✅ Case 2: NextAuth session (Web only)
    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email }).select(
        "-password -__v"
      );

      if (user) return NextResponse.json(user, { status: 200 });
    }

    // ❌ Case 3: No valid auth found
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (err) {
    console.error("getUser error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
