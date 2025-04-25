"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiPlantLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { MdMyLocation, MdLocationOn } from "react-icons/md";
import { FaFlask } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { BiSolidLandscape } from "react-icons/bi";

interface SoilData {
  soilTypes: string[];
  primarySoilType: string;
  explanation: string;
  characteristics: {
    pH: string;
    texture: string;
    drainage: string;
  };
}

// Simple toast component
const toast = ({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) => {
  console.log(`${title}: ${description}`);
};

const PredictionForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [soilType, setSoilType] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [currentCrop, setCurrentCrop] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [soilReport, setSoilReport] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSoil, setIsFetchingSoil] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const router = useRouter();

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");
    setSoilData(null);
    setSoilType("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDistrict(e.target.value);
    setSoilData(null);
    setSoilType("");
  };

  const handleSoilReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSoilReport(e.target.files[0]);
    }
  };

  const fetchSoilData = async () => {
    setIsFetchingSoil(true);
    try {
      const response = await fetch("/api/soil-prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedState,
          selectedDistrict,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch soil data");
      }

      setSoilData(data.soil);
      setSoilType(data.soil.primarySoilType);

      toast({
        title: "Success",
        description: "Soil data fetched successfully",
        status: "success",
      });
    } catch (error) {
      console.error("Error fetching soil data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch soil data. Please try again.",
        status: "error",
      });
    } finally {
      setIsFetchingSoil(false);
    }
  };

  const prefillLocationData = async () => {
    setIsLoading(true);
    setLocationError(false);

    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Get region/state info from OpenStreetMap API
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const regionResponse = await fetch(nominatimUrl);
        const regionData = await regionResponse.json();

        // Extract state and district from the response
        const state =
          regionData.address?.state || regionData.address?.region || "";
        const district =
          regionData.address?.county || regionData.address?.city || "";

        // Get soil information from OpenEpi API
        const soilUrl = `https://api.openepi.io/soil/type?lat=${lat}&lon=${lon}`;
        const soilResponse = await fetch(soilUrl);
        const soilData = await soilResponse.json();

        const soilType = soilData.properties?.most_probable_soil_type || "";

        // Set form values
        if (state && indianStates.includes(state)) {
          setSelectedState(state);
        }

        setSelectedDistrict(district);
        setSoilType(soilType);

        // Show success message and form
        toast({
          title: "Location Found",
          description: `Found ${state}, ${district}`,
          status: "success",
        });

        setShowForm(true);
      } catch (error) {
        console.error("Error getting location:", error);
        setLocationError(true);
        toast({
          title: "Location Error",
          description:
            "Could not fetch your location. Please enter details manually.",
          status: "error",
        });
        setShowForm(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setLocationError(true);
      toast({
        title: "Not Supported",
        description:
          "Geolocation is not supported by your browser. Please enter details manually.",
        status: "error",
      });
      setIsLoading(false);
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!soilType || !selectedState || !waterSource || !farmArea) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        status: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/crop-prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soilType,
          selectedState,
          selectedDistrict,
          waterSource,
          currentCrop,
          farmArea,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get crop recommendations");
      }

      const recommendedCrops = data.crops;

      localStorage.setItem("cropPredictions", JSON.stringify(recommendedCrops));
      localStorage.setItem(
        "farmData",
        JSON.stringify({
          soilType,
          region: selectedState,
          district: selectedDistrict,
          waterSource,
          currentCrop,
          farmArea,
        })
      );

      router.push("/results");
    } catch (error) {
      console.error("Error getting crop recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get crop recommendations. Please try again.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800/30"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Let's Find Your Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We'll use your location to provide accurate crop recommendations
            </p>
          </div>
          <button
            onClick={prefillLocationData}
            disabled={isLoading}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <MdMyLocation className="h-6 w-6" />
              </motion.div>
            ) : (
              <MdLocationOn className="h-6 w-6" />
            )}
            <span className="text-lg font-medium">
              {isLoading ? "Detecting Location..." : "Detect My Location"}
            </span>
          </button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Location Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Your Location
                  </h3>
                </div>
                {locationError && (
                  <button
                    type="button"
                    onClick={prefillLocationData}
                    className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
                  >
                    <MdMyLocation className="h-4 w-4" />
                    Try Again
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Region/State Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Region/State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    value={selectedState}
                    onChange={handleStateChange}
                    required
                  >
                    <option value="">Select your region</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    placeholder="Enter district name"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!selectedState}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Soil Analysis Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <BiSolidLandscape className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Soil Analysis
                  </h3>
                </div>
              </div>

              <div className="p-6">
                {selectedState && selectedDistrict ? (
                  <>
                    {!soilData ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        <button
                          type="button"
                          onClick={fetchSoilData}
                          disabled={isFetchingSoil}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isFetchingSoil ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <FaFlask className="h-5 w-5" />
                            </motion.div>
                          ) : (
                            <FaFlask className="h-5 w-5" />
                          )}
                          <span>
                            {isFetchingSoil
                              ? "Analyzing Soil..."
                              : "Analyze Soil Type"}
                          </span>
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                          Click to analyze soil type based on your location
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* First Row - Main Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Primary Soil Type Card */}
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800/30">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                                <BiSolidLandscape className="h-6 w-6 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                  Primary Soil Type
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Most prevalent in your area
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-xl font-bold text-green-700 dark:text-green-300">
                                {soilData.primarySoilType}
                              </p>
                            </div>
                          </div>

                          {/* pH Level Card */}
                          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                                <FaFlask className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                  Soil pH Level
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Acidity/alkalinity balance
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                                {soilData.characteristics.pH}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Second Row - Additional Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                          <div className="space-y-6">
                            {/* Soil Types Section */}
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Found Soil Types
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {soilData.soilTypes.map((type, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Characteristics Section */}
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Soil Characteristics
                              </h4>
                              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {soilData.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reanalyze Button */}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={fetchSoilData}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                          >
                            <FaFlask className="h-4 w-4" />
                            Reanalyze Soil
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    Please select your location to analyze soil type
                  </div>
                )}
              </div>
            </div>

            {/* Rest of the form fields */}
            <div className="space-y-4">
              {/* Soil Report Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Soil Report (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    onChange={handleSoilReportChange}
                    accept=".pdf"
                    className="w-full p-2 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-green-50 file:text-green-700 dark:file:bg-green-900/30 dark:file:text-green-400 hover:file:bg-green-100 dark:hover:file:bg-green-900/50 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Upload soil test report (PDF only)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Water Source Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Water Source <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    value={waterSource}
                    onChange={(e) => setWaterSource(e.target.value)}
                    required
                  >
                    <option value="">Select water source</option>
                    <option value="Canal Irrigation">Canal Irrigation</option>
                    <option value="Well/Tube Well">Well/Tube Well</option>
                    <option value="Rainfed Only">Rainfed Only</option>
                    <option value="Pond/Tank">Pond/Tank</option>
                    <option value="River">River</option>
                  </select>
                </div>

                {/* Current Crop Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Crop (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentCrop}
                    onChange={(e) => setCurrentCrop(e.target.value)}
                    placeholder="E.g., Wheat, Rice, Cotton"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                {/* Farm Area Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Area of Farm (in acres){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={farmArea}
                    onChange={(e) => setFarmArea(e.target.value)}
                    placeholder="Enter area"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !soilData}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-loader-2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  Get Crop Recommendations
                  <RiPlantLine className="ml-1 h-5 w-5" />
                </>
              )}
            </button>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PredictionForm;
