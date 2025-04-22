"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sprout, Sun, Cloud, CloudSun, Droplets, BookOpen, Laptop, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { FiArrowDown } from "react-icons/fi";
import { MdOutlineWaterDrop, MdOutlineWbSunny, MdOutlineAgriculture } from "react-icons/md";
import { RiPlantLine, RiLeafLine } from "react-icons/ri";

// Sample data for demo purposes
const sampleCrops = [
  {
    id: "1",
    name: "Rice",
    howToGrow: "Requires flooded fields and warm climate. Plant in spring for best results.",
    subsidy: "Government provides 20% subsidy on seeds and fertilizers.",
    imagePath: "/images/crops/rice.jpg",
  },
  {
    id: "2",
    name: "Wheat",
    howToGrow: "Grows well in well-drained soil with moderate temperature. Winter wheat is recommended.",
    subsidy: "Direct benefit transfer of ₹5000/acre available.",
    imagePath: "/images/crops/wheat.jpg",
  },
  {
    id: "3",
    name: "Corn",
    howToGrow: "Plant in spring when soil warms. Needs full sun and regular watering.",
    subsidy: "10% subsidy on irrigation equipment for corn farmers.",
    imagePath: "/images/crops/corn.jpg",
  }
];

const testimonials = [
  {
    id: "1",
    quote: "CropPredict helped me increase my yield by 30% by suggesting the right crops for my soil conditions.",
    author: "Rajesh Kumar",
    location: "Punjab, India",
    imagePath: "/images/testimonials/farmer1.jpg",
  },
  {
    id: "2",
    quote: "I was skeptical at first, but the recommendations were spot on. My farm has never been more productive.",
    author: "Anita Desai",
    location: "Maharashtra, India",
    imagePath: "/images/testimonials/farmer2.jpg",
  },
  {
    id: "3",
    quote: "The weather predictions combined with crop suggestions have helped me plan better and reduce losses.",
    author: "Sanjay Patel",
    location: "Gujarat, India",
    imagePath: "/images/testimonials/farmer3.jpg",
  }
];

const communityPosts = [
  {
    id: "1",
    username: "SoilMaster",
    region: "Karnataka",
    content: "Just harvested my first crop of organic tomatoes using the techniques suggested here. The yield was amazing!",
    timestamp: "2 days ago",
    imagePath: "/images/community/tomatoes.jpg",
  },
  {
    id: "2",
    username: "GreenThumb",
    region: "Kerala",
    content: "The monsoon prediction was accurate. Prepared my fields early as suggested and saved my entire crop from flooding.",
    timestamp: "1 week ago",
    imagePath: "/images/community/monsoon.jpg",
  }
];

const blogData = [
  {
    id: "1",
    title: "Modern Farming Techniques for Higher Yield",
    excerpt: "Learn how technology is transforming traditional farming practices...",
    author: "Dr. Singh",
    date: "April 10, 2023",
    readTime: "5 min read",
    category: "Technology",
    imagePath: "/images/blogs/modern-farming.jpg",
  }
];

interface CropCardProps {
  name: string;
  howToGrow: string;
  subsidy: string;
  imagePath: string;
  index: number;
}

// Utility function to get placeholder images
const getPlaceholderImage = (seed: string) => {
  // Hash the seed to get a consistent number
  let seedHash = 0;
  for (let i = 0; i < seed.length; i++) {
    seedHash = ((seedHash << 5) - seedHash) + seed.charCodeAt(i);
    seedHash = seedHash & seedHash; // Convert to 32bit integer
  }
  
  // Make sure we have a positive number
  seedHash = Math.abs(seedHash);
  
  // Get dimensions - vary slightly based on seed
  const width = 600 + (seedHash % 200);
  const height = 400 + (seedHash % 150);
  
  // Use Lorem Picsum
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
};

// Components
const CropCard = ({ name, howToGrow, subsidy, imagePath, index }: CropCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Generate a seed based on the crop name
    const seed = `crop-${name.toLowerCase().replace(/\s+/g, '-')}`;
    setImageUrl(getPlaceholderImage(seed));
  }, [name]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700 relative">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={`${name} crop`} 
            className="w-full h-full object-cover"
            onError={() => setImageUrl(getPlaceholderImage(`crop-${name.toLowerCase().replace(/\s+/g, '-')}-error`))}
          />
        )}
        {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400 dark:text-gray-500">Loading crop image...</p>
        </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{howToGrow}</p>
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
          <div className="flex items-start">
            <RiPlantLine className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <span className="font-bold">Subsidy:</span> {subsidy}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
  imagePath: string;
}

const Testimonial = ({ quote, author, location, imagePath }: TestimonialProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Get a random image of a farmer
    setImageUrl(getPlaceholderImage(`farmer-${location.split(',')[0].toLowerCase()}-${location.split(',')[1].toLowerCase()}`));
  }, [location]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <div className="mb-6">
        <svg className="h-8 w-8 text-green-500 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4h-10zM9.773 18.813c0.125-1.516 1.313-2.688 2.781-2.688 1.547 0 2.813 1.25 2.813 2.797 0 1.516-1.266 2.766-2.813 2.766-0.063 0-0.125 0-0.188-0.016 0.953 0.953 2.297 1.547 3.797 1.547v1.313c-2.438 0-4.594-1.172-5.969-2.969-0.906-0.906-0.422-2.797 0.422-2.75v0zM17.5 18.813c0.125-1.516 1.313-2.688 2.781-2.688 1.547 0 2.813 1.25 2.813 2.797 0 1.516-1.266 2.766-2.813 2.766-0.063 0-0.125 0-0.188-0.016 0.953 0.953 2.297 1.547 3.797 1.547v1.313c-2.438 0-4.594-1.172-5.969-2.969-0.906-0.906-0.422-2.75 0.422-2.75v0z"></path>
        </svg>
        <p className="text-gray-600 dark:text-gray-300 italic text-lg">{quote}</p>
      </div>
      <div className="mt-auto flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mr-4">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={author} 
              className="w-full h-full object-cover"
              onError={() => setImageUrl(getPlaceholderImage(`farmer-${location.split(',')[0].toLowerCase()}-${location.split(',')[1].toLowerCase()}-error`))}
            />
          ) : (
          <div className="h-full w-full flex items-center justify-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">Loading...</p>
          </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>
    </div>
  );
};

interface BlogCardProps {
  blog: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    imagePath: string;
  };
  showVideo?: boolean;
}

const BlogCard = ({ blog, showVideo = false }: BlogCardProps) => {
  const { title, excerpt, author, date, readTime, category, imagePath } = blog;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Get a random image related to the blog category and title
    const query = showVideo ? "farming,video" : `${category.toLowerCase()},${title.split(' ')[0].toLowerCase()},farming`;
    setImageUrl(getPlaceholderImage(query));
  }, [title, category, showVideo, imagePath]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {showVideo ? (
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt="Farming video thumbnail" 
                className="w-full h-full object-cover"
                onError={() => setImageUrl(getPlaceholderImage('farming,tutorial-error'))}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                <div className="w-16 h-16 bg-green-600/90 rounded-full flex items-center justify-center mb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                  />
                </div>
                <p className="text-sm mt-2 font-medium">Watch our latest farming tips</p>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Loading video thumbnail...</p>
          </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={() => setImageUrl(getPlaceholderImage('farming,agriculture-error'))}
            />
          ) : (
          <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Loading blog image...</p>
          </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">{category}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime}
          </span>
        </div>
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{excerpt}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">By {author}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
};

interface PostCardProps {
  username: string;
  region: string;
  content: string;
  timestamp: string;
  imagePath?: string;
  index: number;
}

const PostCard = ({ username, region, content, timestamp, imagePath, index }: PostCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (imagePath) {
      // Get keywords from the content
      const keywords = content.split(' ').slice(0, 3).join(',');
      setImageUrl(getPlaceholderImage(`farming-${region.toLowerCase()}-${keywords}`));
    }
  }, [content, region, imagePath]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start mb-4">
        <div className="h-12 w-12 rounded-full bg-green-50 dark:bg-green-900/30 overflow-hidden mr-4 flex items-center justify-center border border-green-100 dark:border-green-800/30">
          <div className="text-green-700 dark:text-green-400 font-bold text-lg">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">{username}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{region} • {timestamp}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{content}</p>
      {imagePath && (
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl relative overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Farm post" 
              className="w-full h-full object-cover"
              onError={() => setImageUrl(getPlaceholderImage('farming-field-error'))}
            />
          ) : (
          <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Loading image...</p>
          </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

// PredictionForm simplified for demo
const PredictionForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [soilType, setSoilType] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [currentCrop, setCurrentCrop] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [soilReport, setSoilReport] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Lakshadweep", "Puducherry"
  ];

  // Sample districts for each state (add actual districts for your application)
  const districtsByState: {[key: string]: string[]} = {
    "Punjab": ["Amritsar", "Bathinda", "Firozpur", "Jalandhar", "Ludhiana", "Patiala"],
    "Haryana": ["Ambala", "Faridabad", "Gurgaon", "Hisar", "Karnal", "Panipat"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Lucknow", "Kanpur", "Varanasi", "Gorakhpur"],
    // Add more states and their districts
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSoilReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSoilReport(e.target.files[0]);
    }
  };

  const prefillLocationData = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          try {
            // Get region/state info from OpenStreetMap API
            const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
            const regionResponse = await fetch(nominatimUrl);
            const regionData = await regionResponse.json();
            
            // Extract state and district from the response
            const state = regionData.address?.state || regionData.address?.region || '';
            const district = regionData.address?.county || regionData.address?.city || '';
            
            // Get soil information from OpenEpi API
            const soilUrl = `https://api.openepi.io/soil/type?lat=${lat}&lon=${lon}`;
            const soilResponse = await fetch(soilUrl);
            const soilData = await soilResponse.json();
            
            const soilType = soilData.properties?.most_probable_soil_type || '';
            
            // Set form values
            if (state && indianStates.includes(state)) {
              setSelectedState(state);
            }
            
            setSelectedDistrict(district);
            setSoilType(soilType);
            
            // Show success message
            toast({
              title: "Location data filled",
              description: `Found ${state}, ${district} with ${soilType} soil`,
              status: "success"
            });
          } catch (error) {
            console.error("Error fetching location data:", error);
            toast({
              title: "Error",
              description: "Could not fetch location data. Please fill manually.",
              status: "error"
            });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Please allow location access or fill details manually.",
            status: "error"
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        status: "error"
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!soilType || !selectedState || !waterSource || !farmArea) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        status: "error"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call our API endpoint instead of directly calling Gemini
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
          farmArea
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to get crop recommendations");
      }
      
      const recommendedCrops = data.crops;
      
      // Store results in localStorage to access on results page
      localStorage.setItem('cropPredictions', JSON.stringify(recommendedCrops));
      localStorage.setItem('farmData', JSON.stringify({
        soilType,
        region: selectedState,
        district: selectedDistrict,
        waterSource,
        currentCrop,
        farmArea
      }));
      
      // Navigate to results page
      router.push('/results');
    } catch (error) {
      console.error("Error getting crop recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get crop recommendations. Please try again.",
        status: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple toast component
  const toast = ({ title, description, status }: { title: string; description: string; status: string }) => {
    console.log(`${title}: ${description}`);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Soil Type Field */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Soil Type <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            placeholder="E.g., Sandy loam, Black soil, Red soil" 
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
          />
        </div>
        
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
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          {/* District Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              District
            </label>
            <input 
              type="text" 
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder="Enter district name" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!selectedState}
            />
          </div>
          
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
              Area of Farm (in acres) <span className="text-red-500">*</span>
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
      
      {/* Prefill Button */}
      <div className="flex items-center gap-2">
        <button 
          type="button" 
          onClick={prefillLocationData}
          disabled={isLoading}
          className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
        >
          <motion.div
            animate={isLoading ? { rotate: 360 } : {}}
            transition={{ repeat: isLoading ? Infinity : 0, duration: 1 }}
            className="w-4 h-4"
          >
            {isLoading ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            )}
          </motion.div>
          {isLoading ? "Prefilling location data..." : "Use my location to prefill data"}
        </button>
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2">
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
    </form>
  );
};

interface WeatherDay {
  day: string;
  temp: number;
  condition: string;
  icon: React.ReactNode;
}

export default function Home() {
  // Sample crops to display as demo on the home page
  const demoCrops = sampleCrops.slice(0, 3);
  const sampleBlog = blogData[0]; // show first blog as sample
  const featuredPosts = communityPosts.slice(0, 2); // Get 2 featured community posts
  
  // Weather forecast data
  const weatherForecast: WeatherDay[] = [
    { day: "Today", temp: 28, condition: "Sunny", icon: <MdOutlineWbSunny className="h-8 w-8 text-yellow-500" /> },
    { day: "Tomorrow", temp: 26, condition: "Partly Cloudy", icon: <CloudSun className="h-8 w-8 text-blue-400" /> },
    { day: "Wednesday", temp: 24, condition: "Cloudy", icon: <Cloud className="h-8 w-8 text-gray-500" /> },
    { day: "Thursday", temp: 27, condition: "Sunny", icon: <MdOutlineWbSunny className="h-8 w-8 text-yellow-500" /> },
    { day: "Friday", temp: 30, condition: "Sunny", icon: <MdOutlineWbSunny className="h-8 w-8 text-yellow-500" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="absolute opacity-10 inset-0">
            <div className="absolute inset-0 bg-[url('/images/crop-pattern.png')] bg-repeat opacity-20"></div>
          </div>
          <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                >
                  Smart <span className="text-green-300">Crop Selection</span> for Better Harvest
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg md:text-xl opacity-90 mb-8"
                >
                  Use AI-powered recommendations to maximize your yield and profit based on soil conditions, location, and climate data.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    className="bg-white text-green-700 hover:bg-green-100 h-12 px-8 rounded-full shadow-lg font-semibold"
                    onClick={() => {
                      const formSection = document.getElementById('prediction-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Started
                    <FiArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href="/about">
                    <Button 
                      variant="outline"
                      className="border-white text-white hover:bg-white/20 h-12 px-8 rounded-full"
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:block relative w-1/3"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                      <RiPlantLine className="h-8 w-8 text-green-300 mb-2" />
                      <p className="text-sm font-medium">Optimal Growth</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                      <MdOutlineWaterDrop className="h-8 w-8 text-blue-300 mb-2" />
                      <p className="text-sm font-medium">Water Usage</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                      <MdOutlineWbSunny className="h-8 w-8 text-yellow-300 mb-2" />
                      <p className="text-sm font-medium">Climate Data</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                      <MdOutlineAgriculture className="h-8 w-8 text-orange-300 mb-2" />
                      <p className="text-sm font-medium">Farming Tips</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">How CropPredict Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our AI-powered platform analyzes multiple factors to recommend the best crops for your farm.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <RiLeafLine className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Soil Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">We analyze your soil type and quality to determine which crops will thrive.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <MdOutlineWbSunny className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Climate Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">We match crops to your region's climate patterns for optimal growing conditions.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                  <MdOutlineAgriculture className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Market Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">We identify crops with highest profit potential based on current market trends.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form and Demo Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900" id="prediction-form">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Form Column */}
              <div className="w-full lg:w-5/12 order-2 lg:order-1">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                      <h2 className="text-2xl font-bold text-white">Get Your Personalized Crop Recommendations</h2>
                      <p className="text-green-100 mt-2">Fill in your farm details below for AI-powered suggestions</p>
                    </div>
                    <div className="p-6">
                      <PredictionForm />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Demo Column */}
              <div className="w-full lg:w-7/12 order-1 lg:order-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Example Recommendations</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Here are some sample recommendations. Provide your details to get personalized crop suggestions.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {demoCrops.map((crop, index) => (
                        <CropCard
                          key={crop.id}
                          name={crop.name}
                          howToGrow={crop.howToGrow}
                          subsidy={crop.subsidy}
                          imagePath={crop.imagePath}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mini Weather Forecast */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Weather Forecast</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Weather conditions affect crop growth. Check the 5-day forecast below.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      {weatherForecast.map((day, index) => (
                        <motion.div 
                          key={day.day}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex flex-col items-center"
                        >
                          <p className="font-medium text-gray-900 dark:text-gray-100">{day.day}</p>
                          {day.icon}
                          <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2">{day.temp}°C</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{day.condition}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4">
                      <Link href="/learn">
                        <Button variant="outline" className="flex items-center gap-1 text-green-600 dark:text-green-400 h-9 rounded-md px-4 text-sm">
                          View detailed forecast <ChevronRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn Feature Section - Improved UI/UX */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learn & Grow</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Expand your farming knowledge with our expert resources</p>
              </div>
              <Link href="/learn" className="mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center gap-1">
                  Browse All Resources <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl overflow-hidden shadow-sm border border-green-100 dark:border-green-800/30 group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={getPlaceholderImage('farming-video-tutorial')}
                    alt="Video tutorials" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">Video Tutorials</h3>
                    <p className="text-white/80 text-sm">Learn farming techniques through step-by-step videos</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">Featured</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">12 videos</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Modern Farming Techniques</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Learn how technology is transforming traditional farming practices for higher yields.</p>
                  <Link href="/learn/videos" className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center hover:underline">
                    Watch Now <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl overflow-hidden shadow-sm border border-orange-100 dark:border-orange-800/30 group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={getPlaceholderImage('farming-blog-article')}
                    alt="Expert articles" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Expert Articles</h3>
                    <p className="text-white/80 text-sm">In-depth guides and research from agricultural specialists</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full">New</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">24 articles</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Sustainable Farming Practices</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Discover eco-friendly methods to improve soil health and crop resilience.</p>
                  <Link href="/learn/articles" className="text-orange-600 dark:text-orange-400 text-sm font-medium flex items-center hover:underline">
                    Read More <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden shadow-sm border border-blue-100 dark:border-blue-800/30 group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={getPlaceholderImage('farming-interactive-course')}
                    alt="Interactive courses" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Laptop className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Interactive Courses</h3>
                    <p className="text-white/80 text-sm">Self-paced learning modules for farmers of all experience levels</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">Popular</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">8 courses</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Mastering Crop Rotation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Learn strategic planning for maximizing soil nutrients and preventing pests.</p>
                  <Link href="/learn/courses" className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:underline">
                    Start Learning <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-sm border border-green-200 dark:border-green-800/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Join Our Next Live Webinar</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    "Innovative Irrigation Techniques for Water Conservation" with Dr. Patel from the Agricultural Research Institute
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>June 15, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>2:00 PM - 3:30 PM IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    Register Now
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                What Farmers Say About Us
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Join thousands of farmers who have transformed their agriculture practices with CropPredict
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Testimonial
                    quote={testimonial.quote}
                    author={testimonial.author}
                    location={testimonial.location}
                    imagePath={testimonial.imagePath}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Video Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Watch Success Stories
                  </h3>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-0 pb-[56.25%] relative bg-gray-100 dark:bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-600/90 rounded-full flex items-center justify-center mx-auto mb-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                          />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">Success stories from farmers across India</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">(Click to play)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Farming?</h2>
              <p className="text-lg opacity-90 mb-8">
                Get personalized crop recommendations based on your farm's unique conditions
              </p>
              <Button 
                className="bg-white text-green-700 hover:bg-green-100 h-12 px-8 rounded-full shadow-lg font-semibold"
                onClick={() => {
                  const formSection = document.getElementById('prediction-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
