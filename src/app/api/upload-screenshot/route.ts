// src/app/api/upload-screenshot/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const collectiveStrength = formData.get("collectiveStrength") as string;
    const age = formData.get("age") as string;
    const paymentStatus = formData.get("paymentStatus") as string;
    const screenshot = formData.get("screenshot") as File;
    const timestamp = formData.get("timestamp") as string;

    // Validate required fields
    if (!name || !phoneNumber || !collectiveStrength || !age || !paymentStatus || !screenshot || !timestamp) {
      console.error("Missing required fields:", { name, phoneNumber, collectiveStrength, age, paymentStatus, hasScreenshot: !!screenshot, timestamp });
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const bytes = await screenshot.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const screenshotBase64 = buffer.toString("base64");

    console.log("Preparing data for Google Sheets...", { name, phoneNumber, collectiveStrength, age, paymentStatus, timestamp });
    
    const payload = {
      name,
      phoneNumber,
      collectiveStrength,
      age,
      paymentStatus,
      filename: screenshot.name || "screenshot.jpg",
      screenshotBase64,
      timestamp
    };

    console.log("Sending data to Google Sheets...");
    const response = await fetch("https://script.google.com/macros/s/AKfycbxS6q2HCKFD-Jtd58jIELZYI7kG_vuHAB2Ms8zR3JLStG17WFE-XNtCg69FoQ8sdAerWQ/exec", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Google Sheets response:", result);

    if (!result.success) {
      console.error("Google Sheets processing error:", result.error);
      throw new Error(result.error || "Failed to save to Google Sheets");
    }

    return NextResponse.json({ 
      message: "Registration completed successfully!",
      data: { name, phoneNumber } // Return some data for confirmation
    }, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Registration failed. Please try again." 
    }, { status: 500 });
  }
}
