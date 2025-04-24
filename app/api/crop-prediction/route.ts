import { NextResponse } from "next/server";

// The prompt for the Gemini API
const createPrompt = (
  soilType: string,
  selectedState: string,
  selectedDistrict: string | undefined,
  waterSource: string,
  currentCrop: string | undefined,
  farmArea: string
) => {
  return `You are an agricultural expert. Based on the following information, recommend THREE specific crops as follows:

  1. FIRST CROP: The crop that grows BEST in these conditions (focus on agricultural suitability)
  2. SECOND CROP: The crop that will generate MAXIMUM PROFIT for the farmer (focus on market value and demand)
  3. THIRD CROP: A crop that offers a BALANCED approach between growth suitability and profit potential
  
  Farm Details:
  Soil Type: ${soilType}
  State/Region: ${selectedState}
  District: ${selectedDistrict || "Not specified"}
  Water Source: ${waterSource}
  Current Crop: ${currentCrop || "Not specified"}
  Farm Area: ${farmArea} acres
  
  For each recommended crop, provide:
  1. The crop name
  2. Why it's suitable for these conditions
  3. Special care instructions
  4. Potential yield per acre
  5. Comprehensive subsidy and pricing information specific to ${selectedState}, including:
     - MSP (Minimum Support Price) - Include the exact amount in Rupees
     - Additional Input Assistance - Include the exact amount in Rupees
     - Effective Price to Farmers - Include the exact amount in Rupees
     - Input Assistance Scheme - Include the scheme name AND the monetary benefit amount
     - Major Subsidy Scheme - Include the scheme name AND the monetary benefit amount
     - Other Subsidies - List all with specific monetary values where applicable
  
  IMPORTANT: For ALL subsidy information, ALWAYS include the actual monetary amounts in Rupees alongside any descriptive text. Be as specific as possible with the actual subsidy values. If exact amounts aren't available for a specific region, provide the most accurate estimate based on national figures.
  
  Format the response as a JSON array of 3 objects with the following structure:
  [
    {
      "name": "Crop Name",
      "type": "Best Growth",
      "description": "Why this crop is suitable...",
      "care": "Special care instructions...",
      "yield": "X-Y tons per acre",
      "subsidies": {
        "msp": "Rs X per quintal (include exact amount)",
        "additionalInput": "Rs X per quintal/acre (include exact amount)",
        "effectivePrice": "Rs X per quintal (include exact amount)",
        "inputScheme": "Scheme name with Rs X benefit (include exact amount)",
        "majorScheme": "Scheme name with Rs X benefit (include exact amount)",
        "otherSubsidies": "Detail each subsidy with exact amounts"
      }
    },
    {
      "name": "Crop Name",
      "type": "Maximum Profit",
      "description": "Why this crop is suitable...",
      "care": "Special care instructions...",
      "yield": "X-Y tons per acre",
      "subsidies": {
        "msp": "Rs X per quintal (include exact amount)",
        "additionalInput": "Rs X per quintal/acre (include exact amount)",
        "effectivePrice": "Rs X per quintal (include exact amount)",
        "inputScheme": "Scheme name with Rs X benefit (include exact amount)",
        "majorScheme": "Scheme name with Rs X benefit (include exact amount)",
        "otherSubsidies": "Detail each subsidy with exact amounts"
      }
    },
    {
      "name": "Crop Name",
      "type": "Balanced Approach",
      "description": "Why this crop is suitable...",
      "care": "Special care instructions...",
      "yield": "X-Y tons per acre",
      "subsidies": {
        "msp": "Rs X per quintal (include exact amount)",
        "additionalInput": "Rs X per quintal/acre (include exact amount)",
        "effectivePrice": "Rs X per quintal (include exact amount)",
        "inputScheme": "Scheme name with Rs X benefit (include exact amount)",
        "majorScheme": "Scheme name with Rs X benefit (include exact amount)",
        "otherSubsidies": "Detail each subsidy with exact amounts"
      }
    }
  ]
  `;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      soilType,
      selectedState,
      selectedDistrict,
      waterSource,
      currentCrop,
      farmArea,
    } = body;

    // Validate required fields
    if (!soilType || !selectedState || !waterSource || !farmArea) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the prompt for Gemini
    const prompt = createPrompt(
      soilType,
      selectedState,
      selectedDistrict,
      waterSource,
      currentCrop,
      farmArea
    );

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
        { error: "Failed to fetch crop recommendations" },
        { status: response.status }
      );
    }

    // Extract text from Gemini response
    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse JSON from text - extract the JSON part
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    const recommendedCrops = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return NextResponse.json({ crops: recommendedCrops });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
