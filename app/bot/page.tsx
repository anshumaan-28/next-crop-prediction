"use client";

import { motion } from "framer-motion";
import { Bot, Construction, BrainCircuit, Clock, MessageCircle, Sparkles, Database } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function FarmBotPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full inline-flex items-center justify-center shadow-md"
            >
              <Bot className="h-16 w-16 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600"
            >
              Farm Bot
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Your intelligent farming assistant powered by AI
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-2 mb-10"
            >
              <div className="px-4 py-2 bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-500 rounded-full flex items-center gap-2 text-sm border border-amber-200 dark:border-amber-900/50 shadow-sm">
                <Construction className="h-4 w-4" />
                <span>Under Development</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8 text-center mb-12"
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground">Get personalized crop recommendations and farming techniques optimized for your specific conditions.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Assistance</h3>
                <p className="text-sm text-muted-foreground">Ask questions, get guidance, and troubleshoot farming issues anytime with our AI assistant.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
              >
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">We're working hard to bring you the future of farming. Stay tuned for our launch!</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span>What Farm Bot Can Do</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Soil Analysis</h4>
                      <p className="text-xs text-muted-foreground">Upload soil reports and get instant interpretations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Pest Identification</h4>
                      <p className="text-xs text-muted-foreground">Upload images to identify pests and get control measures</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Crop Schedule</h4>
                      <p className="text-xs text-muted-foreground">Get personalized planting and harvesting schedules</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Market Insights</h4>
                      <p className="text-xs text-muted-foreground">Get price trends and demand forecasts for your crops</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground mb-6">
                Want to be notified when Farm Bot launches? Sign up for updates.
              </p>
              
              <Link 
                href="/"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Join the Waitlist
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 