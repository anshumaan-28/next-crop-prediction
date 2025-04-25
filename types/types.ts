export interface Subsidies {
  msp: string;
  additionalInput: string;
  effectivePrice: string;
  inputScheme: string;
  majorScheme: string;
  otherSubsidies: string;
}

export interface CropRecommendation {
  name: string;
  type: "Best Growth" | "Maximum Profit" | "Balanced Approach";
  description: string;
  care: string;
  yield: string;
  subsidies: Subsidies;
}

export interface FarmData {
  soilType: string;
  region: string;
  district: string;
  waterSource: string;
  farmArea: string;
}
