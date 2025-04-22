"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiCalendar, FiClock, FiMapPin, FiCompass, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { WiDaySunny, WiCloudy, WiDayCloudy, WiRain, WiSnow, WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import { MdOutlineStars } from "react-icons/md";

// Define blog interface
interface Blog {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imagePath: string;
}

// Sample blog data (in a real app, this would come from a database or API)
const blogs: Blog[] = [
  {
    id: "1",
    title: "How to Use Crop Rotation for Better Harvests",
    excerpt: "Crop rotation helps maintain soil health and boost your farm's productivity. Learn which crops to rotate every season.",
    author: "AgriExpert Team",
    date: "June 10, 2024",
    readTime: "5 min read",
    category: "Farming",
    imagePath: "/images/blog-crop-rotation.jpg"
  },
  {
    id: "2",
    title: "Drip Irrigation: Modern Water Saving Tech",
    excerpt: "Save water, time, and increase your yields! The basics of setting up drip irrigation for both small and large farms.",
    author: "FarmTech Today",
    date: "April 21, 2024",
    readTime: "4 min read",
    category: "Technology",
    imagePath: "/images/blog-drip-irrigation.jpg"
  },
  {
    id: "3",
    title: "Organic Farming Benefits and Myths",
    excerpt: "Discover why more people are turning to organic farming, what's really required, and how to get started with minimal investment.",
    author: "Krishi Advisor",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Organic",
    imagePath: "/images/blog-organic-farming.jpg"
  },
];

// Blog card component
const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">[Blog Image]</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{blog.category}</span>
          <span className="text-xs text-muted-foreground">{blog.readTime}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-foreground">{blog.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">By {blog.author}</p>
          <p className="text-xs text-muted-foreground">{blog.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Learn() {
  // Current weather data
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    location: "New Delhi, India",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    feelsLike: 30,
    uvIndex: 8,
    precipitation: 0,
    visibility: 10
  });

  // 5-day forecast data
  const [forecast, setForecast] = useState([
    { day: "Today", high: 30, low: 24, condition: "Sunny", icon: <WiDaySunny className="h-8 w-8 text-amber-500" /> },
    { day: "Tomorrow", high: 29, low: 23, condition: "Partly Cloudy", icon: <WiDayCloudy className="h-8 w-8 text-blue-400" /> },
    { day: "Wednesday", high: 27, low: 22, condition: "Cloudy", icon: <WiCloudy className="h-8 w-8 text-slate-500" /> },
    { day: "Thursday", high: 26, low: 21, condition: "Rain", icon: <WiRain className="h-8 w-8 text-indigo-500" /> },
    { day: "Friday", high: 28, low: 22, condition: "Sunny", icon: <WiDaySunny className="h-8 w-8 text-amber-500" /> }
  ]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      }));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <WiDaySunny className="h-20 w-20 text-amber-500" />;
      case "cloudy":
        return <WiCloudy className="h-20 w-20 text-slate-500" />;
      case "partly cloudy":
        return <WiDayCloudy className="h-20 w-20 text-blue-400" />;
      case "rain":
        return <WiRain className="h-20 w-20 text-indigo-500" />;
      case "snow":
        return <WiSnow className="h-20 w-20 text-sky-300" />;
      default:
        return <WiDayCloudy className="h-20 w-20 text-blue-500" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { type: "tween", duration: 0.2 }
    }
  };

  // Get time of day for dynamic styling
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();

  // Dynamic background gradients based on time of day
  const timeGradients = {
    morning: 'from-amber-100 to-blue-200 dark:from-amber-900/30 dark:to-blue-900/50',
    afternoon: 'from-blue-200 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/50',
    evening: 'from-orange-200 to-purple-200 dark:from-orange-900/30 dark:to-purple-900/50',
    night: 'from-indigo-300 to-blue-400 dark:from-indigo-900/30 dark:to-blue-900/50'
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-1 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="container mx-auto px-4 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Decorative elements */}
            <div className="absolute top-40 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40 dark:opacity-20 -z-10"></div>
            <div className="absolute top-96 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-40 dark:opacity-20 -z-10"></div>
            
            {/* Page Title */}
            <motion.div 
              className="flex items-center gap-3 mb-10"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"></div>
                <div className="relative bg-background rounded-full p-2">
                  <MdOutlineStars className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Weather <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Information</span>
              </h1>
            </motion.div>
            
            {/* Current Weather Section */}
            <motion.div
              variants={itemVariants}
              className={`mb-12 p-6 rounded-2xl bg-gradient-to-br ${timeGradients[timeOfDay]} border border-border/50`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-start">
                  {getWeatherIcon(weather.condition)}
                  <div className="flex items-center gap-2 mt-2">
                    <FiClock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{weather.time}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FiCalendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{weather.date}</p>
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <FiMapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">{weather.location}</h3>
                  </div>
                  <p className="text-xl font-medium text-muted-foreground mb-3">{weather.condition}</p>
                  <div className="flex items-center justify-center md:justify-start">
                    <p className="text-6xl font-black text-foreground tracking-tight">{weather.temperature}°</p>
                    <div className="ml-4 text-sm space-y-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <WiThermometer className="h-5 w-5 text-orange-500" />
                        <p>Feels like: <span className="font-medium">{weather.feelsLike}°C</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-6 mt-6 lg:mt-0 lg:ml-auto">
                  <motion.div 
                    className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-2xl border border-border/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-xl">
                      <WiHumidity className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Humidity</p>
                      <p className="text-xl font-bold text-foreground">{weather.humidity}%</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-2xl border border-border/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2.5 rounded-xl">
                      <WiStrongWind className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Wind</p>
                      <p className="text-xl font-bold text-foreground">{weather.windSpeed} km/h</p>
                      <div className="flex items-center">
                        <FiCompass className="h-3 w-3 mr-1" />
                        <span className="text-xs text-muted-foreground">{weather.windDirection}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* 5-Day Forecast */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-foreground">5-Day Forecast</h2>
                <FiArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {forecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    whileHover={{ scale: 1.03 }}
                    className="bg-card border border-border rounded-lg p-4 text-center"
                  >
                    <p className="font-medium text-foreground mb-1">{day.day}</p>
                    <div className="flex justify-center my-2">
                      {day.icon}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                    <div className="flex justify-between text-sm mt-3">
                      <span className="font-semibold text-foreground">{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Weather Alerts/Tips */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Weather Alerts & Farming Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-0.5 bg-yellow-500/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-6 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-2xl h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-xl">
                        <WiThermometer className="h-5 w-5 text-yellow-600" />
                      </div>
                      <h3 className="font-bold text-foreground">High Temperature Alert</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      With temperatures reaching <span className="font-semibold text-foreground">{weather.temperature}°C</span>, ensure adequate irrigation for crops, 
                      especially during mid-day. Consider providing shade for sensitive crops.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-0.5 bg-blue-500/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-6 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-2xl h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl">
                        <WiHumidity className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-foreground">Water Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Humidity is at <span className="font-semibold text-foreground">{weather.humidity}%</span>. Monitor soil moisture levels and adjust irrigation accordingly.
                      Early morning or evening watering is recommended to minimize evaporation.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-0.5 bg-green-500/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-6 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-2xl h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                        <FiSun className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-bold text-foreground">Optimal Planting</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current weather conditions are favorable for planting summer crops. Take advantage of the sunny days ahead to prepare your fields.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Educational Blog Posts */}
            <motion.div
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-8 border-t border-border pt-10">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"></div>
                  <div className="relative bg-background rounded-full p-2">
                    <FiBookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Educational Blog Posts</h2>
              </div>
              <div className="relative">
                <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 dark:opacity-20 -z-10"></div>
                <div className="absolute bottom-0 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-50 dark:opacity-20 -z-10"></div>
                <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full md:w-64 px-4 py-2 border rounded-md bg-card focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
} 