"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiExternalLink } from "react-icons/fi";


interface Report {
  id: string;
  date: string;
  location: string;
  status: "complete" | "pending" | "failed";
}

interface Profile {
  name: string;
  location: string;
  contact: string;
  imagePath?: string;
  reports?: Report[];
}

const profileData: Profile = {
  name: "Rajesh Kumar",
  location: "Punjab, India",
  contact: "rajesh.kumar@example.com",
  reports: [
    {
      id: "1",
      date: "2023-06-15",
      location: "North Field",
      status: "complete"
    },
    {
      id: "2",
      date: "2023-07-28",
      location: "South Field",
      status: "complete"
    },
    {
      id: "3",
      date: "2023-08-10",
      location: "East Field",
      status: "pending"
    }
  ]
};


const ReportCard = ({ id, title, date, location, status }: { 
  id: string; 
  title: string; 
  date: string; 
  location: string; 
  status: "complete" | "pending" | "failed"; 
}) => {
  const router = useRouter();
  
  const statusColors = {
    complete: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  
  const statusText = {
    complete: "Complete",
    pending: "Pending",
    failed: "Failed"
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-foreground">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status]}`}>
          {statusText[status]}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Date: {date}</p>
        <p className="text-sm text-muted-foreground">Location: {location}</p>
      </div>
      <div className="mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs flex items-center justify-center gap-1"
          onClick={() => router.push(`/results?report=${id}`)}
        >
          View Details <FiExternalLink size={14} />
        </Button>
      </div>
    </motion.div>
  );
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("reports");
  const router = useRouter();
  const userData: Profile = profileData;

  const handleLogout = () => {
    router.push("/");
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 bg-background text-foreground">
        <div className="flex flex-col md:flex-row gap-6">

          <motion.div 
            className="w-full md:w-1/3"
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
          >
            <div className="p-6 rounded-lg shadow-md bg-card">
              <div className="flex flex-col items-center text-center">
                {/* User Avatar - Simple Version */}
                <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mb-4">
                  {userData.name.charAt(0)}
                </div>
                
                <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.location}</p>
                <p className="text-muted-foreground">{userData.contact}</p>
                
                <div className="flex space-x-2 mt-4">
                  <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
                      <FiLogOut size={16} /> Logout
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <FiSettings size={16} /> Settings
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div 
                  className="p-4 rounded-lg bg-accent/10 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-bold text-foreground">{userData.reports?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Predictions</p>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-lg bg-accent/10 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-bold text-foreground">{userData.reports?.filter(report => report.status === 'complete').length || 0}</p>
                  <p className="text-sm text-muted-foreground">Successful</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Tabs Section */}
          <motion.div 
            className="w-full md:w-2/3"
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            transition={{ delay: 0.1 }}
          >
            {/* Custom Tab UI */}
            <div className="w-full mb-4">
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "reports" ? 
                    "text-primary border-b-2 border-primary" : 
                    "text-muted-foreground hover:text-foreground"}`}
                >
                  Prediction Reports
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "saved" ? 
                    "text-primary border-b-2 border-primary" : 
                    "text-muted-foreground hover:text-foreground"}`}
                >
                  Saved Crops
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="rounded-lg border shadow-sm p-6 bg-card">
              {activeTab === "reports" && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Your Prediction Reports</h2>
                  {userData.reports && userData.reports.length > 0 ? (
                    <div className="space-y-4">
                      {userData.reports.map((report) => (
                        <ReportCard
                          key={report.id}
                          id={report.id}
                          title={`Prediction Report - ${new Date(report.date).toLocaleDateString()}`}
                          date={new Date(report.date).toLocaleDateString()}
                          location={report.location}
                          status={report.status}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No prediction reports yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => router.push("/")}
                      >
                        Make Your First Prediction
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === "saved" && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Saved Crops</h2>
                  <div className="text-center py-8">
                    <FiUser className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mt-4">You haven't saved any crops yet.</p>
                    <p className="text-muted-foreground text-sm">Crops you save from recommendations will appear here.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => router.push("/")}
                    >
                      Get Recommendations
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 