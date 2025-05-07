import React from "react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "reactflow/dist/style.css";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Info,
  AlertCircle,
  TrendingUp,
  BarChart4,
  Menu,
  X,
  ExternalLink,
  Activity,
  Target,
  BookOpen,
  Lightbulb,
  GitMerge,
  Search,
  ChevronRight,
  Circle,
  MoveRight,
  ArrowRight,
  Building,
  Users,
  Gauge,
  Clock,
  Calendar,
  Scale,
  HeartPulse,
  Utensils,
  Bike,
  Smartphone,
  Briefcase,
  Home,
  ChefHat,
  Dumbbell,
  Bus,
  ShoppingCart,
  Tv,
  LampDesk,
  School,
  Baby,
  Plane,
  Wifi,
  Cloud,
  Leaf,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom components
const StatCard = ({ title, value, change, icon, color }) => (
  <motion.div
    whileHover={{ 
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 15
    }}
    className={`p-6 rounded-2xl bg-gradient-to-br ${color} shadow-md backdrop-blur-sm border border-white/10 overflow-hidden relative group`}
  >
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Content */}
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-xs font-medium tracking-wider text-white/80 uppercase">{title}</p>
        <p className="text-3xl font-bold mt-2 text-white">{value}</p>
      </div>
      <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
        {React.cloneElement(icon, { className: "w-6 h-6 text-white" })}
      </div>
    </div>
    
    {/* Change indicator */}
    <div className="relative z-10 mt-4 flex items-center">
      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
        change.startsWith('+') 
          ? 'bg-emerald-500/20 text-emerald-100' 
          : 'bg-rose-500/20 text-rose-100'
      }`}>
        {change}
      </span>
      <span className="ml-2 text-xs text-white/60">since 2000</span>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5"></div>
    <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-white/5"></div>
  </motion.div>
);

const FactorCard = ({ title, items, icon, color }) => (
  <motion.div
    whileHover={{ 
      y: -4,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)"
    }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className="group bg-white p-6 rounded-2xl shadow-xs border border-gray-100 hover:border-gray-200 relative overflow-hidden transition-all duration-300"
  >
    {/* Subtle background pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Header */}
    <div className="flex items-center mb-5 relative z-10">
      <div className={`p-3 rounded-xl mr-4 ${color} shadow-xs backdrop-blur-sm border border-white/20`}>
        {React.cloneElement(icon, { className: "w-5 h-5 text-white" })}
      </div>
      <h3 className="font-bold text-lg text-gray-900 tracking-tight">{title}</h3>
    </div>
    
    {/* Items list */}
    <ul className="space-y-3 relative z-10">
      {items.map((item, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-start"
        >
          <span className="flex-shrink-0 mt-1 mr-3">
            <svg className={`w-2 h-2 ${color.replace('bg-', 'text-')}`} viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
          </span>
          <span className="text-gray-700 leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
    
    {/* Hover accent */}
    <div className={`absolute bottom-0 left-0 h-1 w-full ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
  </motion.div>
);

const TabButton = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const FeedbackLoopCard = ({ loop }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-4 p-4 rounded-xl border-l-4 shadow-sm"
    style={{ borderLeftColor: loop.color, backgroundColor: `${loop.color}10` }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: loop.color }}
      >
        <span className="text-white text-xs font-bold">
          {loop.type === "reinforcing" ? "R" : "B"}
        </span>
      </div>
      <h4 className="font-medium text-gray-800">{loop.name}</h4>
    </div>
    <p className="text-sm text-gray-600 mb-3">{loop.description}</p>
    <div className="flex flex-wrap gap-2 text-xs">
      {loop.path.map((nodeId, index, array) => {
        const node = cldData.nodes.find((n) => n.id === nodeId);
        const isLast = index === array.length - 1;
        return (
          <div key={index} className="flex items-center">
            <span className="bg-white px-2 py-1 rounded-md shadow-xs border">
              {node?.label}
            </span>
            {!isLast && (
              <ChevronRight size={14} className="mx-1 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  </motion.div>
);

const LeveragePointCard = ({ point, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-semibold text-lg text-gray-800">{point.title}</h3>
      <div className="flex flex-col items-end gap-1">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            point.impact === "High"
              ? "bg-green-100 text-green-800"
              : point.impact === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Impact: {point.impact}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            point.difficulty === "High"
              ? "bg-red-100 text-red-800"
              : point.difficulty === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          Difficulty: {point.difficulty}
        </span>
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-4">{point.description}</p>
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
        Timeframe: {point.timeframe}
      </span>
      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800">
        Priority: {index + 1}
      </span>
    </div>
  </motion.div>
);

// Data
const cldData = {
  nodes: [
    { id: "obesity", label: "Obesity Rates", x: 400, y: 200 },
    { id: "workHours", label: "Long Work Hours", x: 200, y: 100 },
    { id: "processedFood", label: "Processed Food Consumption", x: 600, y: 100 },
    { id: "physicalActivity", label: "Physical Activity", x: 100, y: 300 },
    { id: "stress", label: "Stress Levels", x: 300, y: 150 },
    { id: "urbanization", label: "Urbanization", x: 100, y: 200 },
    { id: "screenTime", label: "Screen Time", x: 300, y: 350 },
    { id: "socialNorms", label: "Social Norms", x: 500, y: 300 },
    { id: "foodMarketing", label: "Food Marketing", x: 650, y: 200 },
    { id: "Healthydiet", label: "Healthy Diet", x: 700, y: 150 },
    { id: "medicalCosts", label: "Healthcare Costs", x: 500, y: 400 },
    { id: "Diabetes", label: "Diabetes", x: 80, y: 400 },
    { id: "Sugarlevel", label: "Sugar Level", x: 200, y: 450 },
    { id: "Hypertension", label: "Hyper Tension", x: 600, y: 400 },
  ],
  connections: [
    { from: "workHours", to: "physicalActivity", type: "negative" },
    { from: "workHours", to: "stress", type: "positive" },
    { from: "stress", to: "processedFood", type: "positive" },
    { from: "processedFood", to: "obesity", type: "positive" },
    { from: "physicalActivity", to: "obesity", type: "negative" },
    { from: "physicalActivity", to: "Diabetes", type: "negative" },
    { from: "obesity", to: "medicalCosts", type: "positive" },
    { from: "obesity", to: "Diabetes", type: "positive" },
    { from: "Sugarlevel", to: "Diabetes", type: "positive" },
    { from: "urbanization", to: "workHours", type: "positive" },
    { from: "urbanization", to: "physicalActivity", type: "negative" },
    { from: "screenTime", to: "physicalActivity", type: "negative" },
    { from: "foodMarketing", to: "processedFood", type: "positive" },
    { from: "socialNorms", to: "physicalActivity", type: "negative" },
    { from: "socialNorms", to: "processedFood", type: "positive" },
    { from: "urbanization", to: "screenTime", type: "positive" },
    { from: "stress", to: "screenTime", type: "positive" },
    { from: "medicalCosts", to: "Hypertension", type: "positive" },
    { from: "Healthydiet", to: "processedFood", type: "negative" },
  ],
};



const ChartCard = ({ title, data, dataKey, stroke, xLabel, yLabel }) => (
  <div className="bg-white shadow-md rounded-xl p-4 w-full md:w-[48%] mb-6">
    <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: xLabel, position: 'bottom', offset: 0 }} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const feedbackLoops = [
  {
    id: "stressLoop",
    name: "Stress-Consumption Cycle",
    type: "reinforcing",
    description:
      "High stress leads to comfort eating of processed foods, which contributes to obesity, creating health concerns that further elevate stress.",
    path: ["stress", "processedFood", "obesity", "stress"],
    color: "#e74c3c",
  },
  {
    id: "urbanLoop",
    name: "Urbanization Trap",
    type: "reinforcing",
    description:
      "Urbanization increases work hours and screen time while reducing opportunities for physical activity, accelerating obesity rates.",
    path: ["urbanization", "workHours", "physicalActivity", "obesity"],
    color: "#3498db",
  },
  {
    id: "screenTimeLoop",
    name: "Sedentary Lifestyle Loop",
    type: "reinforcing",
    description:
      "Increased screen time reduces physical activity, leading to weight gain, which can further discourage exercise.",
    path: ["screenTime", "physicalActivity", "obesity"],
    color: "#9b59b6",
  },
  {
    id: "awarenessLoop",
    name: "Health Awareness Loop",
    type: "balancing",
    description:
      "Rising obesity rates and health costs can eventually trigger greater health consciousness and behavior change.",
    path: ["obesity", "medicalCosts", "physicalActivity"],
    color: "#2ecc71",
  },
];

const obesityTrendData = [
  { year: 2000, value: 11.4 },
  { year: 2005, value: 14.8 },
  { year: 2010, value: 19.7 },
  { year: 2015, value: 24.1 },
  { year: 2020, value: 28.6 },
  { year: 2025, value: 32.9 },
];

const diabetesTrendData = [
  { year: 2000, value: 5.9 },
  { year: 2005, value: 7.1 },
  { year: 2010, value: 9.2 },
  { year: 2015, value: 11.6 },
  { year: 2020, value: 14.4 },
  { year: 2025, value: 17.3 },
];

const hypertensionTrendData = [
  { year: 2000, value: 14.2 },
  { year: 2005, value: 16.9 },
  { year: 2010, value: 20.5 },
  { year: 2015, value: 25.3 },
  { year: 2020, value: 31.7 },
  { year: 2025, value: 36.4 },
];


const leveragePoints = [
  {
    title: "Transform Food Environment",
    description:
      "Restructure urban spaces to promote availability of fresh, healthy foods while reducing visibility and convenience of ultra-processed options.",
    impact: "High",
    difficulty: "Medium",
    timeframe: "Long-term",
  },
  {
    title: "Redefine Work Culture",
    description:
      "Implement policies that prioritize work-life balance, exercise breaks, and stress management within corporate environments.",
    impact: "High",
    difficulty: "Medium",
    timeframe: "Medium-term",
  },
  {
    title: "Community Exercise Infrastructure",
    description:
      "Develop and maintain accessible public spaces for physical activity that are culturally appropriate and community-centered.",
    impact: "Medium",
    difficulty: "Medium",
    timeframe: "Medium-term",
  },
  {
    title: "Tech-Enabled Health Solutions",
    description:
      "Leverage India's tech expertise to create digital health tools that promote balanced lifestyles appropriate for modern urban living.",
    impact: "Medium",
    difficulty: "Low",
    timeframe: "Short-term",
  },
  {
    title: "Traditional Dietary Knowledge",
    description:
      "Revitalize traditional Indian dietary wisdom while adapting it to contemporary lifestyles and accessibility needs.",
    impact: "High",
    difficulty: "Low",
    timeframe: "Medium-term",
  },
];

const systemArchetypes = [
  {
    name: "Shifting the Burden",
    description:
      "The healthcare system focuses on treating symptoms of lifestyle diseases rather than addressing root causes in social structures and food systems.",
    example:
      "Medications for managing diabetes and hypertension are more readily prescribed and promoted than fundamental lifestyle and environmental changes.",
  },
  {
    name: "Success to the Successful",
    description:
      "Those with resources and knowledge about health maintain advantage, while lower-middle class families face increasing health challenges with fewer resources.",
    example:
      "Premium organic food markets and exclusive fitness centers cater to upper-middle class, while affordable health options decrease for others.",
  },
  {
    name: "Fixes that Fail",
    description:
      "Quick-fix diets and fitness trends provide temporary results but often lead to rebound effects when they prove unsustainable.",
    example:
      "Crash diets and extreme exercise regimens that aren't culturally compatible with Indian lifestyles leading to yo-yo weight patterns.",
  },
  {
    name: "Tragedy of the Commons",
    description:
      "Individual food companies maximize profits through highly processed foods, collectively degrading public health as a shared resource.",
    example:
      "Multiple food corporations marketing convenient processed foods leads to normalized poor eating habits across communities.",
  },
];

const flowsData = [
  {
    id: 1,
    name: "Caloric Intake Flow",
    description: "Represents the rate at which calories are consumed through diet, influenced by availability of fast food, lack of awareness, and lifestyle habits."
  },
  {
    id: 2,
    name: "Physical Activity Flow",
    description: "The rate at which calories are burned due to exercise or physical activity. This is influenced by time availability, sedentary work, and motivation."
  },
  {
    id: 3,
    name: "Health Awareness Campaigns",
    description: "Flow of awareness and education that potentially influences both caloric intake and physical activity levels."
  },
  {
    id: 4,
    name: "Medical Intervention Flow",
    description: "Represents the flow of individuals receiving treatment or medication for obesity-related diseases like diabetes or hypertension."
  }
];

const stocksData = [
  {
    id: 1,
    name: "Obese Population",
    description: "Number of individuals classified as obese based on BMI > 30. This stock is influenced by caloric intake, physical inactivity, and socio-economic factors.",
  },
  {
    id: 2,
    name: "Diabetic Population",
    description: "Individuals diagnosed with Type 2 diabetes. Closely linked to obesity, poor diet, and lack of physical activity.",

  },
  {
    id: 3,
    name: "Normal Population",
    description: "Portion of the population not affected by obesity, diabetes, or hypertension. Represents a healthy or unaffected group.",
 
  },
  {
    id: 4,
    name: "Population with Hypertension",
    description: "People diagnosed with high blood pressure, often co-occurring with obesity and diabetes.",
  }
];





export default function HealthSystemsAnalysis() {

  const [activeSfdSection, setActiveSfdSection] = useState("main");
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [activeCldSection, setActiveCldSection] = useState("main");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const renderOverview = () => (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          Rising Fitness Trends Alongside Increasing Disease Rates
        </h2>
        <p className="mb-6 text-blue-100 text-lg">
          While fitness trends and health awareness are increasing in urban
          India, rates of obesity, diabetes, and hypertension continue to rise
          at alarming rates, particularly among the middle class.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <StatCard
            title="Obesity"
            value="28.6%"
            change="+17.2%"
            icon={<TrendingUp size={24} />}
            color="from-red-500 to-red-600"
          />
          <StatCard
            title="Diabetes"
            value="14.4%"
            change="+8.5%"
            icon={<Activity size={24} />}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Hypertension"
            value="31.7%"
            change="+17.5%"
            icon={<HeartPulse size={24} />}
            color="from-orange-500 to-orange-600"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Key <span className="text-blue-600">Systemic</span> Factors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FactorCard
            title="Structural Challenges"
            items={[
              "Rapid urbanization changing lifestyle patterns",
              "Long work hours in competitive job markets",
              "Limited urban infrastructure for physical activity",
              "Rising availability of ultra-processed foods",
              "Tech-centric lifestyle increasing sedentary behavior",
            ]}
            icon={<Building size={20} className="text-blue-600" />}
            color="bg-blue-100"
          />
          <FactorCard
            title="Cultural Factors"
            items={[
              "Shift from traditional to Westernized diets",
              "Food-centric social gatherings and celebrations",
              "Rising disposable income changing consumption patterns",
              "Status associated with certain convenience foods",
              "Disconnect between fitness trends and daily habits",
            ]}
            icon={<Users size={20} className="text-purple-600" />}
            color="bg-purple-100"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Our Systems Approach</h2>
        <p className="mb-6 text-gray-300 text-lg">
          We apply systems thinking to understand the complex interrelationships
          driving lifestyle disease rates in middle-class India, identifying
          key leverage points for effective interventions.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("cld")}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
          >
            <GitMerge size={18} />
            <span>Explore Causal Loop Diagram</span>
            <ArrowRight className="ml-1" size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("analysis")}
            className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 font-medium"
          >
            <Search size={18} />
            <span>Deep Dive Analysis</span>
          </motion.button>
        </div>
      </motion.section>
    </div>
  );

  const RenderSFD = () => (
    <div className="space-y-8">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Stock and Flow Diagram</h2>
      <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
        <button
          onClick={() => setActiveSfdSection("main")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSfdSection === "main"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Main Diagram
        </button>
        <button
          onClick={() => setActiveSfdSection("flows")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSfdSection === "flows"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Flow Details
        </button>
      </div>
    </div>

    {/* Main Diagram Section */}
    {activeSfdSection === "main" && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 relative shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Stock and Flow Diagram (SFD)</h3>

        <div className="relative h-[700px] w-full border rounded-lg bg-gray-50 overflow-auto">
          <img src="/StockandFlow.png" alt="Stock and Flow Diagram" className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  )}


    {/* Flow Details Section */}
    {activeSfdSection === "flows" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Key Flows in the System</h3>
          <p className="mb-6 text-sm text-gray-600">
            Flows represent the movement of resources through stocks, indicating how stocks change over time.
          </p>

          <div className="space-y-4">
            {flowsData.map((flow) => (
              <div key={flow.id} className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium">{flow.name}</h4>
                <p className="text-sm text-gray-700">{flow.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Understanding Stocks</h3>
          <p className="text-sm mb-6 text-gray-600">
            Stocks represent accumulations of resources, and changes in stocks are driven by flows.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {stocksData.map((stock) => (
              <motion.div
                key={stock.id}
                whileHover={{ y: -5 }}
                className="p-4 bg-green-50 rounded-lg"
              >
                <h4 className="font-medium mb-2 text-green-800">{stock.name}</h4>
                <ul className="text-sm list-disc pl-5 space-y-2 text-green-700">
                  <li>{stock.description}</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </div>
  );
  
  const RenderBOT = () => {
    const obesityData = [
      { year: 2010, rate: 15 }, { year: 2012, rate: 18 }, { year: 2014, rate: 21 },
      { year: 2016, rate: 24 }, { year: 2018, rate: 27 }, { year: 2020, rate: 30 },
    ];
  
    const diabetesData = [
      { year: 2010, rate: 6 }, { year: 2012, rate: 7 }, { year: 2014, rate: 8 },
      { year: 2016, rate: 9 }, { year: 2018, rate: 10 }, { year: 2020, rate: 11 },
    ];
  
    const activityData = [
      { year: 2010, minutes: 60 }, { year: 2012, minutes: 55 }, { year: 2014, minutes: 50 },
      { year: 2016, minutes: 42 }, { year: 2018, minutes: 35 }, { year: 2020, minutes: 30 },
    ];
  
    const healthyFoodData = [
      { year: 2010, percent: 70 }, { year: 2012, percent: 65 }, { year: 2014, percent: 60 },
      { year: 2016, percent: 55 }, { year: 2018, percent: 50 }, { year: 2020, percent: 45 },
    ];
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    Behavior Over Time Graphs
  </h2>

  {/* Charts Section */}
  <div className="flex flex-wrap justify-between gap-4 mb-6">
    <ChartCard
      title="1. Obesity Rate Over Time (%)"
      data={obesityData}
      dataKey="rate"
      stroke="#EF4444"
    />
    <ChartCard
      title="2. Diabetes Prevalence Over Time (%)"
      data={diabetesData}
      dataKey="rate"
      stroke="#6366F1"
    />
  </div>

  <div className="flex flex-wrap justify-between gap-4 mb-6">
    <ChartCard
      title="3. Daily Physical Activity (Minutes)"
      data={activityData}
      dataKey="minutes"
      stroke="#10B981"
    />
    <ChartCard
      title="4. Healthy Food Consumption (%)"
      data={healthyFoodData}
      dataKey="percent"
      stroke="#F59E0B"
    />
  </div>

  {/* Key Insights Section */}
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mt-6">
    <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
      Key Insights from the Behavior Over Time Graphs
    </h3>
    <ul className="list-disc pl-6 text-gray-600 space-y-3 text-sm">
      <li>
        <span className="font-medium text-red-500">Obesity rates:</span> A significant increase over the past decade, driven by sedentary lifestyles, processed foods, and insufficient health awareness.
      </li>
      <li>
        <span className="font-medium text-indigo-500">Diabetes prevalence:</span> Rising steadily due to increasing sugar consumption, stress, and a lack of effective preventive measures.
      </li>
      <li>
        <span className="font-medium text-teal-500">Physical activity:</span> Consistent decline in activity levels, primarily due to increased screen time and decreased outdoor movement.
      </li>
      <li>
        <span className="font-medium text-yellow-500">Healthy food consumption:</span> Declining due to the growing preference for processed and fast food over nutritious alternatives.
      </li>
    </ul>
  </div>
</div>

    );
  };

  const renderCausalLoopDiagram = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Causal Loop Diagram</h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setActiveCldSection("main")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCldSection === "main"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Main Diagram
          </button>
          <button
            onClick={() => setActiveCldSection("loops")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCldSection === "loops"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Feedback Loops
          </button>
        </div>
      </div>

      {activeCldSection === "main" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 relative shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Full System Diagram</h3>
            <div className="h-[500px] relative border rounded-lg bg-gray-50 overflow-auto">
              <svg
                width="800"
                height="500"
                viewBox="0 0 800 500"
                className="mx-auto"
              >
                <defs>
                  <marker
                    id="arrow-positive"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#2ecc71" />
                  </marker>
                  <marker
                    id="arrow-negative"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#e74c3c" />
                  </marker>
                </defs>

                {/* Connections */}
                {cldData.connections.map((connection, index) => {
                  const fromNode = cldData.nodes.find(
                    (node) => node.id === connection.from
                  );
                  const toNode = cldData.nodes.find(
                    (node) => node.id === connection.to
                  );

                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={`connection-${index}`}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={
                          connection.type === "positive" ? "#2ecc71" : "#e74c3c"
                        }
                        strokeWidth="2"
                        markerEnd={
                          connection.type === "positive"
                            ? "url(#arrow-positive)"
                            : "url(#arrow-negative)"
                        }
                      />
                      {connection.type === "positive" ? (
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 - 5}
                          fill="#2ecc71"
                          fontSize="12"
                          textAnchor="middle"
                        >
                          +
                        </text>
                      ) : (
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 - 5}
                          fill="#e74c3c"
                          fontSize="12"
                          textAnchor="middle"
                        >
                          −
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {cldData.nodes.map((node) => (
                  <g
                    key={node.id}
                    onMouseEnter={() => setShowTooltip(node.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={25}
                      fill={
                        node.id === "obesity"
                          ? "#ffeaa7"
                          : node.id === "physicalActivity"
                          ? "#d0f0c0"
                          : "#f0f0f0"
                      }
                      stroke="#333"
                      strokeWidth="1"
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {node.label.split(" ").map((word, i) => (
                        <tspan
                          key={i}
                          x={node.x}
                          dy={i === 0 ? "-0.2em" : "1em"}
                          fontSize="10"
                        >
                          {word}
                        </tspan>
                      ))}
                    </text>

                    {showTooltip === node.id && (
                      <foreignObject
                        x={node.x + 30}
                        y={node.y - 40}
                        width="200"
                        height="100"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white p-3 rounded-lg shadow-md text-xs border border-gray-200"
                        >
                          <p className="font-bold">{node.label}</p>
                          <p className="text-gray-600 mt-1">
                            {node.id === "obesity"
                              ? "Central measure of health outcomes in the system"
                              : node.id === "workHours"
                              ? "Increasing with competitive job markets"
                              : node.id === "processedFood"
                              ? "Linked to convenience and modern lifestyles"
                              : node.id === "physicalActivity"
                              ? "Decreasing despite awareness"
                              : node.id === "stress"
                              ? "Major driver of unhealthy behaviors"
                              : node.id === "urbanization"
                              ? "Fundamental structural change"
                              : node.id === "screenTime"
                              ? "Growing with tech adoption"
                              : node.id === "socialNorms"
                              ? "Powerful cultural influence"
                              : node.id === "foodMarketing"
                              ? "Commercial driver of consumption"
                              : "Rising with disease prevalence"}
                          </p>
                        </motion.div>
                      </foreignObject>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Connection Types
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 border rounded-lg bg-green-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ArrowUpCircle size={20} className="text-green-600" />
                  </div>
                  <h4 className="font-medium">Positive Connections (+)</h4>
                </div>
                <p className="text-sm text-gray-700">
                  When one variable increases, the connected variable also
                  increases (or if one decreases, the other decreases). Example:
                  As urbanization increases, work hours increase.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 border rounded-lg bg-red-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <ArrowDownCircle size={20} className="text-red-600" />
                  </div>
                  <h4 className="font-medium">Negative Connections (−)</h4>
                </div>
                <p className="text-sm text-gray-700">
                  When one variable increases, the connected variable decreases
                  (or if one decreases, the other increases). Example: As
                  physical activity increases, obesity rates decrease.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {activeCldSection === "loops" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Key Feedback Loops in the System
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Feedback loops drive system behavior. Reinforcing loops (R)
              amplify change in a particular direction, while balancing loops
              (B) counteract change to maintain stability.
            </p>

            <div className="space-y-4">
              {feedbackLoops.map((loop) => (
                <FeedbackLoopCard key={loop.id} loop={loop} />
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Impact of Feedback Loops
            </h3>
            <p className="text-sm mb-6 text-gray-600">
              Understanding these feedback dynamics helps explain why simple
              interventions often fail to produce lasting change in complex
              health systems.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 bg-red-50 rounded-lg"
              >
                <h4 className="font-medium mb-2 text-red-800">
                  Reinforcing Loop Challenges
                </h4>
                <ul className="text-sm list-disc pl-5 space-y-2 text-red-700">
                  <li>
                    Create "vicious cycles" that accelerate negative outcomes
                  </li>
                  <li>
                    Often require multiple intervention points to break
                    effectively
                  </li>
                  <li>Can overwhelm individual willpower and motivation</li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 bg-green-50 rounded-lg"
              >
                <h4 className="font-medium mb-2 text-green-800">
                  Balancing Loop Opportunities
                </h4>
                <ul className="text-sm list-disc pl-5 space-y-2 text-green-700">
                  <li>Represent natural correction mechanisms in the system</li>
                  <li>Can be strengthened through targeted interventions</li>
                  <li>Often have delayed effects that require patience</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderDiseasePatternAnalysis = () => (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Event-Pattern-Structure Analysis
        </h2>

        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="border-l-4 border-red-400 pl-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Events (Visible Symptoms)</h3>
            </div>
            <p className="text-sm mb-4 text-gray-600">
              The most visible manifestations of the problem that receive
              immediate attention:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Rising obesity rates among middle-aged professionals</li>
              <li>
                Increasing diagnoses of type 2 diabetes in younger age groups
              </li>
              <li>Growing hypertension prevalence across urban middle class</li>
              <li>Rising healthcare costs for lifestyle disease management</li>
              <li>
                Coexistence of fitness trends alongside worsening health metrics
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="border-l-4 border-yellow-400 pl-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <BarChart4 size={20} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Patterns (Trends Over Time)</h3>
            </div>
            <p className="text-sm mb-4 text-gray-600">
              The underlying trends that have developed over years or decades:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Circle size={12} className="text-red-500" />
                  Obesity Trends
                </h4>
                <svg width="100%" height="120" viewBox="0 0 300 120">
                  <line
                    x1="40"
                    y1="100"
                    x2="260"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />

                  {obesityTrendData.map((item, index) => (
                    <text
                      key={`x-${index}`}
                      x={40 + (index * 220) / (obesityTrendData.length - 1)}
                      y="115"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {item.year}
                    </text>
                  ))}

                  <text x="35" y="100" textAnchor="end" fontSize="10">
                    0%
                  </text>
                  <text x="35" y="60" textAnchor="end" fontSize="10">
                    20%
                  </text>
                  <text x="35" y="20" textAnchor="end" fontSize="10">
                    40%
                  </text>

                  <path
                    d={obesityTrendData
                      .map((item, index) => {
                        const x =
                          40 + (index * 220) / (obesityTrendData.length - 1);
                        const y = 100 - item.value * 2;
                        return (index === 0 ? "M" : "L") + x + "," + y;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#e74c3c"
                    strokeWidth="2"
                  />

                  {obesityTrendData.map((item, index) => (
                    <circle
                      key={`point-${index}`}
                      cx={40 + (index * 220) / (obesityTrendData.length - 1)}
                      cy={100 - item.value * 2}
                      r="3"
                      fill="#e74c3c"
                    />
                  ))}
                </svg>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Circle size={12} className="text-blue-500" />
                  Diabetes Trends
                </h4>
                <svg width="100%" height="120" viewBox="0 0 300 120">
                  <line
                    x1="40"
                    y1="100"
                    x2="260"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />

                  {diabetesTrendData.map((item, index) => (
                    <text
                      key={`x-${index}`}
                      x={40 + (index * 220) / (diabetesTrendData.length - 1)}
                      y="115"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {item.year}
                    </text>
                  ))}

                  <text x="35" y="100" textAnchor="end" fontSize="10">
                    0%
                  </text>
                  <text x="35" y="60" textAnchor="end" fontSize="10">
                    20%
                  </text>
                  <text x="35" y="20" textAnchor="end" fontSize="10">
                    40%
                  </text>

                  <path
                    d={diabetesTrendData
                      .map((item, index) => {
                        const x =
                          40 + (index * 220) / (diabetesTrendData.length - 1);
                        const y = 100 - item.value * 2;
                        return (index === 0 ? "M" : "L") + x + "," + y;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#3498db"
                    strokeWidth="2"
                  />

                  {diabetesTrendData.map((item, index) => (
                    <circle
                      key={`point-${index}`}
                      cx={40 + (index * 220) / (diabetesTrendData.length - 1)}
                      cy={100 - item.value * 2}
                      r="3"
                      fill="#3498db"
                    />
                  ))}
                </svg>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Circle size={12} className="text-purple-500" />
                  Hypertension Trends
                </h4>
                <svg width="100%" height="120" viewBox="0 0 300 120">
                  <line
                    x1="40"
                    y1="100"
                    x2="260"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="100"
                    stroke="#333"
                    strokeWidth="1"
                  />

                  {hypertensionTrendData.map((item, index) => (
                    <text
                      key={`x-${index}`}
                      x={
                        40 + (index * 220) / (hypertensionTrendData.length - 1)
                      }
                      y="115"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {item.year}
                    </text>
                  ))}

                  <text x="35" y="100" textAnchor="end" fontSize="10">
                    0%
                  </text>
                  <text x="35" y="60" textAnchor="end" fontSize="10">
                    20%
                  </text>
                  <text x="35" y="20" textAnchor="end" fontSize="10">
                    40%
                  </text>

                  <path
                    d={hypertensionTrendData
                      .map((item, index) => {
                        const x =
                          40 +
                          (index * 220) / (hypertensionTrendData.length - 1);
                        const y = 100 - item.value * 2;
                        return (index === 0 ? "M" : "L") + x + "," + y;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#9b59b6"
                    strokeWidth="2"
                  />

                  {hypertensionTrendData.map((item, index) => (
                    <circle
                      key={`point-${index}`}
                      cx={
                        40 + (index * 220) / (hypertensionTrendData.length - 1)
                      }
                      cy={100 - item.value * 2}
                      r="3"
                      fill="#9b59b6"
                    />
                  ))}
                </svg>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Shift from traditional diets to ultra-processed food consumption
              </li>
              <li>
                Decreasing physical activity despite rising gym memberships
              </li>
              <li>Increasing screen time and sedentary work patterns</li>
              <li>
                Growing work hours and commute times reducing leisure activity
              </li>
              <li>
                Rising stress levels correlated with modern urban lifestyles
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="border-l-4 border-blue-400 pl-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <GitMerge size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Structures (Root Causes)</h3>
            </div>
            <p className="text-sm mb-4 text-gray-600">
              The underlying systems, beliefs, and structures driving the
              patterns:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-blue-50 p-4 rounded-lg"
              >
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-600" />
                  Economic Structures
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li>
                    Food industry profit models prioritizing processed foods
                  </li>
                  <li>
                    Corporate work culture valuing time commitment over
                    wellbeing
                  </li>
                  <li>
                    Urban planning centered around vehicles rather than
                    walkability
                  </li>
                  <li>
                    Healthcare system focused on treatment over prevention
                  </li>
                  <li>
                    Economic incentives misaligned with public health outcomes
                  </li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-blue-50 p-4 rounded-lg"
              >
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  Social & Cultural Structures
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li>Status association with certain consumption patterns</li>
                  <li>Westernization of dietary preferences and aspirations</li>
                  <li>
                    Collective beliefs about success requiring personal
                    sacrifice
                  </li>
                  <li>
                    Disconnect between knowledge and daily behavior patterns
                  </li>
                  <li>
                    Family traditions revolving around high-calorie feasting
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">System Archetypes Present</h2>
        <p className="text-sm mb-6 text-gray-600">
          The following common system patterns (archetypes) help explain why the
          problem persists despite awareness and interventions:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {systemArchetypes.map((archetype, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-base mb-2">{archetype.name}</h3>
              <p className="text-sm mb-3 text-gray-600">{archetype.description}</p>
              <div className="bg-gray-50 p-3 rounded text-xs">
                <span className="font-medium">Example: </span>
                {archetype.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Existing Solutions Analysis</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intervention Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Examples
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Targets Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limitations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">Awareness Campaigns</td>
                <td className="px-4 py-3">
                  Health ministry education programs, diabetes screening
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                    Events
                  </span>
                </td>
                <td className="px-4 py-3">
                  Knowledge rarely translates to behavior in complex systems
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">Fitness Trends</td>
                <td className="px-4 py-3">
                  Gym chains, yoga studios, fitness apps
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                    Patterns
                  </span>
                </td>
                <td className="px-4 py-3">
                  Focuses on exercise without addressing food environment
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">Medical Management</td>
                <td className="px-4 py-3">
                  Medications, bariatric surgery, specialist clinics
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                    Events
                  </span>
                </td>
                <td className="px-4 py-3">
                  Treats symptoms while systemic drivers continue
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">Corporate Wellness</td>
                <td className="px-4 py-3">
                  Office gyms, health checkups, step challenges
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                    Patterns
                  </span>
                </td>
                <td className="px-4 py-3">
                  Often superficial without addressing work demands
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">Policy Measures</td>
                <td className="px-4 py-3">Food labeling, sugar taxes</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                    Structures
                  </span>
                </td>
                <td className="px-4 py-3">
                  Limited implementation and enforcement in India
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLeveragePoints = () => (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Leverage Points Analysis</h2>
        <p className="text-lg mb-6 text-gray-600">
          Leverage points are places in the system where small changes can
          produce large shifts. We've identified the following high-impact
          intervention points:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {leveragePoints.map((point, index) => (
            <LeveragePointCard key={index} point={point} index={index} />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Integrated Intervention Strategy
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          An effective approach must work at multiple levels simultaneously to
          transform the system:
        </p>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>

          <div className="ml-16 mb-10 relative">
            <div className="absolute -left-16 top-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              1
            </div>
            <h3 className="font-semibold text-xl mb-3 text-blue-600">
              Immediate Actions (0-1 years)
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Launch workplace redesign pilots that integrate movement into
                  daily routines
                </li>
                <li>
                  Create tech-based interventions that gamify healthy behaviors
                  appropriately
                </li>
                <li>
                  Develop community cooking programs that modernize traditional
                  recipes
                </li>
                <li>
                  Form multi-stakeholder coalitions involving food industry,
                  healthcare, and government
                </li>
              </ul>
            </div>
          </div>

          <div className="ml-16 mb-10 relative">
            <div className="absolute -left-16 top-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              2
            </div>
            <h3 className="font-semibold text-xl mb-3 text-blue-600">
              Medium-Term Strategies (1-3 years)
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Reform urban planning to prioritize active transportation and
                  public spaces
                </li>
                <li>
                  Implement health-promoting policies in corporate environments
                </li>
                <li>
                  Develop alternative food distribution networks for fresh,
                  local produce
                </li>
                <li>
                  Create financial incentives for preventative healthcare
                  approaches
                </li>
              </ul>
            </div>
          </div>

          <div className="ml-16 relative">
            <div className="absolute -left-16 top-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              3
            </div>
            <h3 className="font-semibold text-xl mb-3 text-blue-600">
              Long-Term Transformations (3-10 years)
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Rebuild cultural narratives around food, success, and
                  wellbeing
                </li>
                <li>Transform economic incentives throughout food systems</li>
                <li>
                  Redesign cities and neighborhoods around human-centered
                  principles
                </li>
                <li>
                  Integrate health outcomes into economic and development
                  metrics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConclusion = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Key Insights from Systems Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <GitMerge size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Complex Interdependencies
                </h3>
                <p className="text-sm text-gray-600">
                  The rise in lifestyle diseases results from complex interactions between urbanization, work culture, food systems, technology use, and cultural factors—not simply individual choices.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Reinforcing Feedback Loops
                </h3>
                <p className="text-sm text-gray-600">
                  Multiple reinforcing feedback loops in the system accelerate negative health outcomes, explaining why the problem persists despite increasing awareness and fitness trends.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle size={24} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Solution Mismatch</h3>
                <p className="text-sm text-gray-600">
                  Current interventions primarily target events (symptoms) and occasionally patterns, but rarely address the underlying structural causes driving the system.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Target size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  High-Leverage Opportunities
                </h3>
                <p className="text-sm text-gray-600">
                  Structural interventions that reshape work culture, food environments, urban spaces, and cultural narratives offer the greatest potential for sustainable change.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Recommendations for Key Stakeholders
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="border p-5 rounded-lg"
          >
            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-500" />
              For Policymakers
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Integrate health metrics into urban development planning</li>
              <li>Create incentives for preventative healthcare approaches</li>
              <li>Implement comprehensive food policies beyond simple taxes</li>
              <li>
                Foster interdepartmental collaboration (health, urban, education)
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="border p-5 rounded-lg"
          >
            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
              <Building size={20} className="text-blue-500" />
              For Corporate Leaders
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Redesign work environments to naturally encourage movement
              </li>
              <li>
                Shift from superficial wellness programs to structural changes
              </li>
              <li>
                Recognize health impacts of workplace policies and culture
              </li>
              <li>Measure success beyond productivity to include wellbeing</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="border p-5 rounded-lg"
          >
            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
              <HeartPulse size={20} className="text-blue-500" />
              For Healthcare Providers
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Adopt systemic approaches to lifestyle disease management</li>
              <li>Engage with community and environmental factors</li>
              <li>Develop cultural competence in lifestyle recommendations</li>
              <li>
                Advocate for preventative approaches in healthcare financing
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="border p-5 rounded-lg"
          >
            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
              <Users size={20} className="text-blue-500" />
              For Community Organizations
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Create spaces for collective cooking and physical activity
              </li>
              <li>Develop neighborhood-scale food and exercise solutions</li>
              <li>
                Revitalize traditional cultural practices that promote health
              </li>
              <li>
                Build social connections to counteract isolation-driven habits
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p className="mb-6 text-gray-300 text-lg max-w-3xl mx-auto">
          Addressing the paradox of rising lifestyle diseases alongside growing
          health awareness requires moving beyond individual-focused interventions
          to system-level transformations. By understanding and targeting the
          underlying structures and feedback loops driving this crisis, we can
          create lasting change that enables healthier communities.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("overview")}
          className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg mx-auto"
        >
          <BookOpen size={18} />
          <span>Return to Overview</span>
        </motion.button>
      </motion.div>
    </div>
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity size={28} className="text-blue-600" />
              <h1 className="text-xl font-bold">Health Systems Analysis</h1>
            </div>
            <div className="hidden md:flex gap-2">
              <TabButton
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={<BookOpen size={16} />}
              >
                Overview
              </TabButton>
              <TabButton
                active={activeTab === "cld"}
                onClick={() => setActiveTab("cld")}
                icon={<GitMerge size={16} />}
              >
                Causal Loop
              </TabButton>
              <TabButton
                active={activeTab === "sfd"}
                onClick={() => setActiveTab("sfd")}
                icon={<GitMerge size={16} />}
              >
                SFD
              </TabButton>
              <TabButton
                active={activeTab === "bot"}
                onClick={() => setActiveTab("bot")}
                icon={<GitMerge size={16} />}
              >
                BOT
              </TabButton>
              <TabButton
                active={activeTab === "analysis"}
                onClick={() => setActiveTab("analysis")}
                icon={<Search size={16} />}
              >
                Analysis
              </TabButton>
              <TabButton
                active={activeTab === "leverage"}
                onClick={() => setActiveTab("leverage")}
                icon={<Target size={16} />}
              >
                Leverage Points
              </TabButton>
              <TabButton
                active={activeTab === "conclusion"}
                onClick={() => setActiveTab("conclusion")}
                icon={<Lightbulb size={16} />}
              >
                Conclusion
              </TabButton>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-1 md:hidden"
            >
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveTab("cld");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "cld"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Causal Loop Diagram
              </button>
              <button
                onClick={() => {
                  setActiveTab("sfd");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "sfd"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                SFD
              </button>
              <button
                onClick={() => {
                  setActiveTab("bot");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "bot"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                BOT
              </button>
              <button
                onClick={() => {
                  setActiveTab("analysis");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "analysis"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                System Analysis
              </button>
              <button
                onClick={() => {
                  setActiveTab("leverage");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "leverage"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Leverage Points
              </button>
              <button
                onClick={() => {
                  setActiveTab("conclusion");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium ${
                  activeTab === "conclusion"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Conclusion
              </button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Understanding Rising Lifestyle Diseases in
                Middle-Class India
              </h1>
              <p className="text-gray-600 mt-2">
                A systems thinking approach to analyzing how middle-class India
                faces growing health challenges despite increasing health
                awareness
              </p>
            </div>

            {activeTab === "overview" && renderOverview()}
            {activeTab === "cld" && renderCausalLoopDiagram()}
            {activeTab === "analysis" && renderDiseasePatternAnalysis()}
            {activeTab === "leverage" && renderLeveragePoints()}
            {activeTab === "conclusion" && renderConclusion()}
            {activeTab === "sfd" && RenderSFD()}
            {activeTab === "bot" && RenderBOT()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Activity size={20} />
                <span className="font-semibold">
                  Health Systems Analysis Project
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                A systems thinking approach to health challenges in modern India
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Info size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Lightbulb size={18} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} Health Systems Analysis. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}