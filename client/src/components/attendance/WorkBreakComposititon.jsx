import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend} from 'recharts';
import { ChevronDown } from 'lucide-react';

const WorkBreakComposition = () => {
  const [selectedOption, setSelectedOption] = useState('this-week');
  
  // Sample data for different time periods and selections
  const data = {
    'this-week': [
      { name: 'SUN', work: 0, break: 0 },
      { name: 'MON', work: 7, break: 1 },
      { name: 'TUE', work: 4, break: 4 },
      { name: 'WED', work: 3, break: 3 },
      { name: 'THU', work: 0, break: 0 },
      { name: 'FRI', work: 0, break: 0 },
      { name: 'SAT', work: 0, break: 0 }
    ],
    'this-month': [
      { name: 'Week 1', work: 25, break: 15 },
      { name: 'Week 2', work: 30, break: 10 },
      { name: 'Week 3', work: 28, break: 12 },
      { name: 'Week 4', work: 32, break: 8 }
    ],
    'last-month': [
      { name: 'Week 1', work: 22, break: 18 },
      { name: 'Week 2', work: 28, break: 12 },
      { name: 'Week 3', work: 26, break: 14 },
      { name: 'Week 4', work: 30, break: 10 }
    ],
    'last-6-months': [
      { name: 'Jan', work: 120, break: 40 },
      { name: 'Feb', work: 110, break: 50 },
      { name: 'Mar', work: 135, break: 35 },
      { name: 'Apr', work: 125, break: 45 },
      { name: 'May', work: 140, break: 30 },
      { name: 'Jun', work: 130, break: 40 }
    ],
    'last-12-months': [
      { name: 'Jul', work: 115, break: 45 },
      { name: 'Aug', work: 125, break: 35 },
      { name: 'Sep', work: 130, break: 40 },
      { name: 'Oct', work: 120, break: 50 },
      { name: 'Nov', work: 135, break: 35 },
      { name: 'Dec', work: 140, break: 30 },
      { name: 'Jan', work: 120, break: 40 },
      { name: 'Feb', work: 110, break: 50 },
      { name: 'Mar', work: 135, break: 35 },
      { name: 'Apr', work: 125, break: 45 },
      { name: 'May', work: 140, break: 30 },
      { name: 'Jun', work: 130, break: 40 }
    ],
    'this-year': [
      { name: 'Q1', work: 345, break: 125 },
      { name: 'Q2', work: 395, break: 115 },
      { name: 'Q3', work: 380, break: 120 },
      { name: 'Q4', work: 410, break: 100 }
    ],
    
  };

  const getYAxisMax = () => {
    const currentData = data[selectedOption];
    const maxWork = Math.max(...currentData.map(item => item.work));
    const maxBreak = Math.max(...currentData.map(item => item.break));
    const max = Math.max(maxWork, maxBreak);
    return Math.ceil(max * 1.2);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-3xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Work Break Composition</h2>
      
      {/* Chart Container */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data[selectedOption]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              domain={[0, getYAxisMax()]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Line 
              type="monotone" 
              dataKey="work" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
            <Line 
              type="monotone" 
              dataKey="break" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Custom Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">WORK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">BREAK</span>
          </div>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex gap-4">
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-sm px-4 py-3 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
          >
            <option value="this-week" className="bg-white text-gray-800 normal-case">This Week</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-sm px-4 py-3 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
          >
            <option value="this-month" className="bg-white text-gray-800 normal-case">This Month</option>
            <option value="last-month" className="bg-white text-gray-800 normal-case">Last Month</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-sm px-4 py-3 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
          >
            <option value="last-6-months" className="bg-white text-gray-800 normal-case">Last 6 Months</option>
            <option value="last-12-months" className="bg-white text-gray-800 normal-case">Last 12 Months</option>
            <option value="this-year" className="bg-white text-gray-800 normal-case">This Year</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-sm px-4 py-3 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
          >
           
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default WorkBreakComposition;
