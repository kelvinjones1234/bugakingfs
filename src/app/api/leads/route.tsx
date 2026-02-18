import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Make sure this is your LATEST Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqBBrr-aC2KaswvYKIHlYxREyaYvQICgBrKrjO2Jyiu8ECwOXPuaKfGk74cEMglitnfQ/exec";

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        // text/plain bypasses strict Google CORS/preflight checks
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(body),
      redirect: 'follow' // Crucial: Google Apps Script redirects initially
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status: ${response.status}`);
    }

    return NextResponse.json({ success: true, message: "Lead saved." });

  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process lead." },
      { status: 500 }
    );
  }
}