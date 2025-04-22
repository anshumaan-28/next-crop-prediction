"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, CodeIcon, Award, Leaf, Sun, Laptop, Globe } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaMediumM, FaPinterest } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500"
          >
            About Crop Prediction
          </motion.h1>
          
          {/* Section 1 - What It Does */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-16 bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 relative h-64 w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                    <Leaf className="h-12 w-12" />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
                  What It Does
                </h2>
                <p className="text-card-foreground text-lg">
                  This app helps you pick the right crops for your land based on your location, soil, water, and more.
                </p>
                <p className="text-card-foreground mt-4">
                  Instead of relying on tradition or guesswork, our system uses agricultural science and local data to recommend crops that are likely to give you the best yield and economic returns.
                </p>
                <p className="text-card-foreground mt-4">
                  We also provide information about government subsidies available for different crops, helping you maximize your financial support.
                </p>
              </div>
            </div>
          </motion.section>
          
          {/* Section 2 - How It Works */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16 bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">1</span>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">You Enter Your Details</h3>
                <p className="text-card-foreground">
                  Provide information about your farm location, current crop, water availability, and soil conditions.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">2</span>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">We Process Your Data</h3>
                <p className="text-card-foreground">
                  Our system analyzes your input along with climate patterns, soil maps, and crop requirements.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">3</span>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">You Get Recommendations</h3>
                <p className="text-card-foreground">
                  We show you three crop recommendations with growing instructions and subsidy information.
                </p>
              </motion.div>
            </div>
          </motion.section>
          
          {/* Section 3 - Research Support */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-16 bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
              Research Support
            </h2>
            
            <p className="text-card-foreground mb-6">
              Our crop recommendation system is built on research from leading agricultural institutions and universities. The methods used have been tested and validated in various farming regions.
            </p>
            
            <div className="bg-muted/50 dark:bg-muted/20 p-6 rounded-xl border border-border/50">
              <h3 className="font-semibold mb-4 text-foreground">Research References</h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex gap-3 p-3 rounded-lg hover:bg-background transition-colors duration-200"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0">
                    <BookOpen className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Crop Selection Based on Soil Analysis: A Study from ICAR</p>
                    <p className="text-sm text-muted-foreground">Indian Council of Agricultural Research, 2022</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex gap-3 p-3 rounded-lg hover:bg-background transition-colors duration-200"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0">
                    <BookOpen className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Agricultural Prediction Models for Climate-Resilient Farming</p>
                    <p className="text-sm text-muted-foreground">Punjab Agricultural University, 2021</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex gap-3 p-3 rounded-lg hover:bg-background transition-colors duration-200"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0">
                    <BookOpen className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Water Optimization for Different Crop Varieties</p>
                    <p className="text-sm text-muted-foreground">National Institute of Agricultural Extension Management, 2023</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
            
          {/* Section 4 - Creator Profile - Made more modern, sleek, clean, and monotone */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
              Created With Passion
            </h2>
            
            <div className="flex justify-center">
              <motion.div 
                className="relative overflow-hidden bg-background dark:bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 max-w-md"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/10" />
                
                <div className="flex flex-col items-center relative z-10">
                  <motion.div 
                    className="w-20 h-20 mb-6 rounded-full bg-foreground/5 flex items-center justify-center text-foreground text-xl font-medium ring-1 ring-border"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    AS
                  </motion.div>
                  
                  <h3 className="text-2xl font-medium text-foreground mb-2">Anshumaan Sharma</h3>
                  <p className="text-muted-foreground mb-6 text-center text-sm">
                    Developer & Designer creating intuitive solutions for agricultural challenges
                  </p>
                  
                  <div className="flex gap-3 mb-8 flex-wrap justify-center">
                    <motion.a 
                      href="https://github.com/anshumaan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="GitHub"
                    >
                      <FaGithub size={15} />
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com/anshumaan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="X (Twitter)"
                    >
                      <FaTwitter size={15} />
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com/in/anshumaan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="LinkedIn"
                    >
                      <FaLinkedin size={15} />
                    </motion.a>
                    <motion.a 
                      href="https://instagram.com/anshumaan.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="Instagram"
                    >
                      <FaInstagram size={15} />
                    </motion.a>
                    <motion.a 
                      href="https://medium.com/@anshumaan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="Medium"
                    >
                      <FaMediumM size={15} />
                    </motion.a>
                    <motion.a 
                      href="https://pinterest.com/anshumaanme" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
                      whileHover={{ y: -2, borderColor: 'currentColor' }}
                      title="Pinterest"
                    >
                      <FaPinterest size={15} />
                    </motion.a>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 w-full mb-8">
                    <div className="p-3 rounded-lg border border-border flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground">Full Stack</span>
                    </div>
                    <div className="p-3 rounded-lg border border-border flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground">UI/UX</span>
                    </div>
                    <div className="p-3 rounded-lg border border-border flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground">AgriTech</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-border mb-8" />
                  
                  <p className="text-sm text-center text-muted-foreground italic mb-8">
                    "My goal is to empower farmers with technology that's both accessible and effective."
                  </p>
                  
                  <div className="flex flex-col w-full gap-3 mb-8">
                    <motion.a 
                      href="https://anshumaan.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors text-center"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Visit Portfolio
                    </motion.a>
                    
                    <a 
                      href="mailto:mail@anshumaan.me"
                      className="text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      mail@anshumaan.me
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 