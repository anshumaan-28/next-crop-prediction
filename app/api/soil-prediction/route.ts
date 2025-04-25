import { NextResponse } from "next/server";

// The prompt for the Gemini API
const createPrompt = (selectedState: string, selectedDistrict: string) => {
  return `You are a soil analysis expert. Based on the following location in India, tell me the predominant soil types found in this area. Consider geographical and agricultural data to provide accurate information.

Location Details:
State: ${selectedState}
District: ${selectedDistrict}

Please provide:
1. The primary soil type(s) found in this region
2. A brief explanation of why these soil types are present in this area
3. The soil characteristics (pH, texture, drainage)

Format the response as a JSON object with the following structure:
{
  "soilTypes": ["Type 1", "Type 2"],
  "primarySoilType": "The most predominant soil type",
  "explanation": "Explanation of why these soil types are present",
  "characteristics": {
    "pH": "pH range",
    "texture": "Soil texture description",
    "drainage": "Drainage characteristics"
  }
}

Ensure all information is specific to the given location and based on agricultural data.`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { selectedState, selectedDistrict } = body;

    // Validate required fields
    if (!selectedState || !selectedDistrict) {
      return NextResponse.json(
        { error: "State and district are required" },
        { status: 400 }
      );
    }

    // Create the prompt for Gemini
    const prompt = createPrompt(selectedState, selectedDistrict);

    // Call Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    // Check for API errors
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: "Failed to fetch soil prediction" },
        { status: response.status }
      );
    }

    // Extract text from Gemini response
    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse JSON from text - extract the JSON part
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    const soilPrediction = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!soilPrediction) {
      return NextResponse.json(
        { error: "Failed to parse soil prediction data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ soil: soilPrediction });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
