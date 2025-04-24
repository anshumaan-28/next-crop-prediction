"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTag,
  FiArrowLeft,
  FiDownload,
  FiLoader,
  FiTrendingUp,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";
import {
  RiPlantLine,
  RiDropLine,
  RiSeedlingLine,
  RiCoinLine,
  RiScales2Line,
} from "react-icons/ri";
import { ChevronRight } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import CropReportPDF from "../components/CropReportPDF";

interface Subsidies {
  msp: string;
  additionalInput: string;
  effectivePrice: string;
  inputScheme: string;
  majorScheme: string;
  otherSubsidies: string;
}

interface CropRecommendation {
  name: string;
  type: "Best Growth" | "Maximum Profit" | "Balanced Approach";
  description: string;
  care: string;
  yield: string;
  subsidies: Subsidies;
}

interface FarmData {
  soilType: string;
  region: string;
  district: string;
  waterSource: string;
  farmArea: string;
}

// Utility function to get placeholder images
const getPlaceholderImage = (seed: string) => {
  // Hash the seed to get a consistent number
  let seedHash = 0;
  for (let i = 0; i < seed.length; i++) {
    seedHash = (seedHash << 5) - seedHash + seed.charCodeAt(i);
    seedHash = seedHash & seedHash; // Convert to 32bit integer
  }

  // Make sure we have a positive number
  seedHash = Math.abs(seedHash);

  // Get dimensions - vary slightly based on seed
  const width = 600 + (seedHash % 200);
  const height = 400 + (seedHash % 150);

  // Use Lorem Picsum
  return `https://picsum.photos/seed/${encodeURIComponent(
    seed
  )}/${width}/${height}`;
};

// Crop card component
const CropCard = ({
  crop,
  index,
}: {
  crop: CropRecommendation;
  index: number;
}) => {
  const [showSubsidyDetails, setShowSubsidyDetails] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate a seed based on the crop name and type
    const seed = `crop-${crop.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${crop.type.toLowerCase().replace(/\s+/g, "-")}`;
    setImageUrl(getPlaceholderImage(seed));
  }, [crop.name, crop.type]);

  // Determine icon and color based on crop type
  const getCropTypeInfo = () => {
    switch (crop.type) {
      case "Best Growth":
        return {
          icon: <RiSeedlingLine className="h-5 w-5" />,
          color: "from-green-600 to-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/10",
          borderColor: "border-green-200 dark:border-green-900/30",
        };
      case "Maximum Profit":
        return {
          icon: <FiTrendingUp className="h-5 w-5" />,
          color: "from-blue-600 to-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/10",
          borderColor: "border-blue-200 dark:border-blue-900/30",
        };
      case "Balanced Approach":
        return {
          icon: <RiScales2Line className="h-5 w-5" />,
          color: "from-purple-600 to-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/10",
          borderColor: "border-purple-200 dark:border-purple-900/30",
        };
      default:
        return {
          icon: <RiSeedlingLine className="h-5 w-5" />,
          color: "from-primary to-primary/70",
          bgColor: "bg-primary/5",
          borderColor: "border-primary/20",
        };
    }
  };

  const typeInfo = getCropTypeInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover-lift hover-glow"
    >
      <div className="flex flex-col">
        {/* Header with crop type badge */}
        <div
          className={`px-6 py-4 ${typeInfo.bgColor} border-b ${typeInfo.borderColor}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-foreground">{crop.name}</h3>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r ${typeInfo.color}`}
            >
              {typeInfo.icon}
              <span>{crop.type}</span>
            </div>
          </div>
        </div>

        {/* Crop Image */}
        <div className="w-full h-48 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${crop.name} crop`}
              className="w-full h-full object-cover"
              onError={() =>
                setImageUrl(
                  getPlaceholderImage(
                    `crop-${crop.name.toLowerCase().replace(/\s+/g, "-")}-error`
                  )
                )
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <p className="text-muted-foreground">Loading crop image...</p>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            {crop.description}
          </p>

          <div className="space-y-4">
            {/* Care Instructions */}
            <div className="bg-background p-4 rounded-lg border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <FiCheckCircle className="h-3.5 w-3.5" /> Care Instructions
              </h4>
              <p className="text-sm">{crop.care}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Yield Information */}
              <div className="bg-background p-4 rounded-lg border border-border">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <FiAward className="h-3.5 w-3.5" /> Potential Yield
                </h4>
                <p className="text-sm font-medium">{crop.yield}</p>
              </div>

              {/* Subsidy Overview */}
              <div
                className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/10 cursor-pointer hover:border-primary/20 transition-all duration-200"
                onClick={() => setShowSubsidyDetails(!showSubsidyDetails)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-0 flex items-center gap-1.5">
                    <RiCoinLine className="h-3.5 w-3.5" /> Subsidy Information
                  </h4>
                  <motion.div
                    animate={{ rotate: showSubsidyDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary/60" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: showSubsidyDetails ? "auto" : 0,
                    opacity: showSubsidyDetails ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-2 border-t border-primary/10">
                    <div className="bg-white dark:bg-black/20 rounded-lg overflow-hidden text-xs">
                      <table className="w-full">
                        <thead className="bg-primary/10">
                          <tr>
                            <th className="px-3 py-2 text-left text-primary/80 font-medium">
                              Aspect
                            </th>
                            <th className="px-3 py-2 text-left text-primary/80 font-medium">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          <tr>
                            <td className="px-3 py-2 font-medium">MSP</td>
                            <td className="px-3 py-2">{crop.subsidies.msp}</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium">
                              Additional Input
                            </td>
                            <td className="px-3 py-2">
                              {crop.subsidies.additionalInput}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium">
                              Effective Price
                            </td>
                            <td className="px-3 py-2">
                              {crop.subsidies.effectivePrice}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium">
                              Input Scheme
                            </td>
                            <td className="px-3 py-2">
                              {crop.subsidies.inputScheme}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium">
                              Major Scheme
                            </td>
                            <td className="px-3 py-2">
                              {crop.subsidies.majorScheme}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium">
                              Other Subsidies
                            </td>
                            <td className="px-3 py-2">
                              {crop.subsidies.otherSubsidies}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>

                {!showSubsidyDetails && (
                  <p className="text-sm font-medium mt-2 text-primary/80">
                    Click to view detailed subsidy information
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Results() {
  const router = useRouter();
  const [cropRecommendations, setCropRecommendations] = useState<
    CropRecommendation[]
  >([]);
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    // Client-side only code
    if (typeof window !== "undefined") {
      try {
        // Get stored crop predictions
        const storedPredictions = localStorage.getItem("cropPredictions");
        const storedFarmData = localStorage.getItem("farmData");

        if (storedPredictions) {
          setCropRecommendations(JSON.parse(storedPredictions));
        }

        if (storedFarmData) {
          setFarmData(JSON.parse(storedFarmData));
        }

        // If no data is available in localStorage, use sample data
        if (!storedPredictions || !storedFarmData) {
          // Sample data for demonstration
          setCropRecommendations([
            {
              name: "Rice",
              type: "Best Growth",
              description:
                "Rice is well-suited for regions with high rainfall and can thrive in the local soil conditions. Its adaptability to your specific soil type makes it an ideal choice for maximum yield.",
              care: "Requires flooded fields during early growth. Maintain water level of 2-5cm above soil. Apply balanced fertilizers and monitor for pests regularly.",
              yield: "3-5 tons per acre",
              subsidies: {
                msp: "Rs 2,040 per quintal",
                additionalInput: "Rs 800 per quintal (state subsidy)",
                effectivePrice: "Rs 2,840 per quintal",
                inputScheme:
                  "Krishak Unnati Yojna (Rs 917 per quintal in 2023-24)",
                majorScheme: "PM-KISAN (Rs 6,000 per year direct transfer)",
                otherSubsidies:
                  "50% subsidy on certified seeds, Rs 7,500 per hectare for micro-irrigation",
              },
            },
            {
              name: "Cotton",
              type: "Maximum Profit",
              description:
                "Cotton offers the highest profit potential in your region due to strong market demand and favorable price forecasts. Well-suited for your farm's soil conditions and water availability.",
              care: "Plant with 90-120 cm row spacing. Regular weeding is essential. Apply appropriate pest management protocols, especially for bollworms.",
              yield: "15-20 quintals per acre",
              subsidies: {
                msp: "Rs 6,620 per quintal for medium staple",
                additionalInput:
                  "Rs.1,500 per acre for integrated pest management",
                effectivePrice: "Rs 7,000-8,000 per quintal (market price)",
                inputScheme:
                  "National Food Security Mission - Commercial Crops",
                majorScheme: "Technology Mission on Cotton (TMC)",
                otherSubsidies:
                  "90% subsidy on drip irrigation, 50% subsidy on sprinkler systems",
              },
            },
            {
              name: "Soybean",
              type: "Balanced Approach",
              description:
                "Soybean provides an excellent balance between ease of cultivation and market returns. It improves soil fertility through nitrogen fixation while providing reliable income.",
              care: "Plant with 45 cm row spacing. Requires moderate water. Performs well with minimal irrigation and is relatively drought-tolerant once established.",
              yield: "12-18 quintals per acre",
              subsidies: {
                msp: "Rs 4,300 per quintal",
                additionalInput:
                  "Rs 500 per quintal quality bonus in some areas",
                effectivePrice: "Rs 4,800-5,200 per quintal",
                inputScheme:
                  "National Mission for Oilseed and Oil Palm (NMOOP)",
                majorScheme: "Rashtriya Krishi Vikas Yojana (RKVY)",
                otherSubsidies:
                  "75% subsidy on seed cost, subsidized farm machinery through custom hiring centers",
              },
            },
          ]);

          setFarmData({
            soilType: "Clay Loam",
            region: "Punjab",
            district: "Ludhiana",
            waterSource: "Canal Irrigation",
            farmArea: "5",
          });
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        // Simulate API loading delay for smoother UI
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, []);

  // Handle going back to edit the form
  const handleEditDetails = () => {
    router.push("/");
  };

  // Handle downloading the report
  const handleDownloadReport = async () => {
    setDownloadStarted(true);

    try {
      // Ensure we have the required data
      if (!farmData || !cropRecommendations.length) {
        throw new Error("Missing required data for PDF generation");
      }

      // Add a small delay to ensure React state updates are processed
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Generate the PDF blob
      const blob = await pdf(
        <CropReportPDF
          farmData={farmData}
          cropRecommendations={cropRecommendations}
        />
      ).toBlob();

      if (!blob) {
        throw new Error("Failed to generate PDF blob");
      }

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a link and trigger download
      const a = document.createElement("a");
      a.href = url;
      const timestamp = new Date().toISOString().split("T")[0];
      a.download = `crop_recommendations_${farmData.region}_${timestamp}.pdf`;

      // Append to body, click, and cleanup
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Failed to generate PDF report. Please try again. If the issue persists, try refreshing the page."
      );
    } finally {
      setDownloadStarted(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-background">
        <div className="container mx-auto px-4">
          {!farmData ? (
            // No form data submitted
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-foreground mb-4"
              >
                No Data Submitted
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-6"
              >
                Please go back to Home and fill out the form to get crop
                recommendations.
              </motion.p>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button
                  onClick={() => router.push("/")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Go to Home
                </Button>
              </motion.div>
            </motion.div>
          ) : loading ? (
            // Loading state
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="inline-block"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                >
                  <FiLoader className="h-12 w-12 text-primary" />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mt-4"
              >
                Analyzing your farm data...
              </motion.p>
            </div>
          ) : (
            // Results display
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto"
                >
                  <motion.h1
                    className="text-3xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Your Crop Recommendations
                  </motion.h1>
                  <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Based on your inputs for {farmData.region}
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-card to-background p-8 rounded-xl shadow-lg mb-10 border border-border/50 hover:border-border/80 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-1 bg-primary rounded-full"></div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Farm Details
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        variants={fadeInUpVariants}
                        className="bg-card/50 p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <RiPlantLine className="h-5 w-5 text-primary/70" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Soil Composition
                          </p>
                        </div>
                        <p className="font-semibold text-foreground text-lg">
                          {farmData.soilType}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          * Based on geographical data analysis
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUpVariants}
                        className="bg-card/50 p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <FiTag className="h-5 w-5 text-primary/70" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Location
                          </p>
                        </div>
                        <p className="font-semibold text-foreground text-lg">
                          {farmData.region}
                          {farmData.district ? `, ${farmData.district}` : ""}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUpVariants}
                        className="bg-card/50 p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <RiDropLine className="h-5 w-5 text-primary/70" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Water Source
                          </p>
                        </div>
                        <p className="font-semibold text-foreground text-lg">
                          {farmData.waterSource}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUpVariants}
                        className="bg-card/50 p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <FiTag className="h-5 w-5 text-primary/70" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Farm Size
                          </p>
                        </div>
                        <p className="font-semibold text-foreground text-lg">
                          {farmData.farmArea} acres
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="max-w-5xl mx-auto mt-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-1 bg-primary rounded-full"></div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Crop Recommendations
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Based on your farm details, we recommend the following crops
                    categorized by growing potential, profit potential, and a
                    balanced approach:
                  </p>

                  <div className="flex flex-col space-y-6">
                    {cropRecommendations.map((crop, index) => (
                      <CropCard key={index} crop={crop} index={index} />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto mt-12 mb-8 flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      onClick={handleEditDetails}
                      variant="outline"
                      className="w-full sm:w-auto flex items-center gap-2"
                    >
                      <FiArrowLeft className="h-4 w-4" /> Edit Details
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      onClick={handleDownloadReport}
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                      disabled={downloadStarted}
                    >
                      {downloadStarted ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                          >
                            <FiLoader className="h-4 w-4" />
                          </motion.div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <FiDownload className="h-4 w-4" /> Download Report
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="max-w-4xl mx-auto mt-16 p-6 border border-border rounded-lg bg-muted/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <RiPlantLine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Crop Rotation Advisory
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        For best results, consider rotating these crops
                        seasonally. Proper crop rotation can improve soil
                        health, reduce pest problems, and increase yields over
                        time. Consult with your local agricultural extension
                        office for a customized crop rotation plan.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
