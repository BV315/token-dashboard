import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Zap, DollarSign, Activity, Menu, X, BarChart3 } from 'lucide-react';

const TokenDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('daily');
  const [chartType, setChartType] = useState('area');

  // Mock data for usage over time
  const dailyData = [
    { date: 'Feb 17', tokens: 45000, promptTokens: 28000, completionTokens: 17000 },
    { date: 'Feb 18', tokens: 52000, promptTokens: 31000, completionTokens: 21000 },
    { date: 'Feb 19', tokens: 38000, promptTokens: 24000, completionTokens: 14000 },
    { date: 'Feb 20', tokens: 61000, promptTokens: 37000, completionTokens: 24000 },
    { date: 'Feb 21', tokens: 55000, promptTokens: 33000, completionTokens: 22000 },
    { date: 'Feb 22', tokens: 67000, promptTokens: 41000, completionTokens: 26000 },
    { date: 'Feb 23', tokens: 48000, promptTokens: 29000, completionTokens: 19000 },
  ];

  const weeklyData = [
    { week: 'Week 1', tokens: 320000, promptTokens: 192000, completionTokens: 128000 },
    { week: 'Week 2', tokens: 380000, promptTokens: 228000, completionTokens: 152000 },
    { week: 'Week 3', tokens: 410000, promptTokens: 246000, completionTokens: 164000 },
    { week: 'Week 4', tokens: 366000, promptTokens: 219600, completionTokens: 146400 },
  ];

  const monthlyData = [
    { month: 'January', tokens: 1200000, promptTokens: 720000, completionTokens: 480000 },
    { month: 'February', tokens: 980000, promptTokens: 588000, completionTokens: 392000 },
    { month: 'March', tokens: 850000, promptTokens: 510000, completionTokens: 340000 },
  ];

  const modelBreakdown = [
    { name: 'Claude Haiku', value: 520000, cost: 416 },
    { name: 'Claude Sonnet', value: 280000, cost: 840 },
    { name: 'Claude Opus', value: 95000, cost: 1425 },
    { name: 'GPT-4', value: 85000, cost: 1700 },
  ];

  const recentRequests = [
    { id: 1, timestamp: '2026-02-23 02:47', model: 'Claude Haiku', prompt: 1250, completion: 320, cost: 1.57 },
    { id: 2, timestamp: '2026-02-23 02:45', model: 'Claude Haiku', prompt: 890, completion: 245, cost: 0.91 },
    { id: 3, timestamp: '2026-02-23 02:43', model: 'Claude Sonnet', prompt: 2100, completion: 580, cost: 7.60 },
    { id: 4, timestamp: '2026-02-23 02:41', model: 'Claude Haiku', prompt: 1450, completion: 410, cost: 1.86 },
    { id: 5, timestamp: '2026-02-23 02:40', model: 'Claude Opus', prompt: 3200, completion: 920, cost: 48.00 },
    { id: 6, timestamp: '2026-02-23 02:38', model: 'Claude Haiku', prompt: 2050, completion: 520, cost: 2.29 },
    { id: 7, timestamp: '2026-02-23 02:36', model: 'Claude Sonnet', prompt: 1890, completion: 410, cost: 6.94 },
    { id: 8, timestamp: '2026-02-23 02:34', model: 'Claude Haiku', prompt: 1200, completion: 380, cost: 1.58 },
  ];

  const chartData = timeRange === 'daily' ? dailyData : timeRange === 'weekly' ? weeklyData : monthlyData;
  const totalTokens = 980000;
  const promptTokens = 588000;
  const completionTokens = 392000;
  const estimatedCost = 6821.43;
  const rateLimitUsage = (totalTokens / 10000000) * 100;

  // Vibrant color palette
  const COLORS = ['#00D9FF', '#00FF88', '#FFB800', '#FF006E'];
  const BRIGHT_COLORS = {
    cyan: '#00D9FF',
    lime: '#00FF88',
    amber: '#FFB800',
    pink: '#FF006E',
    purple: '#B537F2',
    blue: '#0099FF'
  };

  const xAxisKey = timeRange === 'daily' ? 'date' : timeRange === 'weekly' ? 'week' : 'month';

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col shadow-2xl`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Token Tracker</h1>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-20 rounded-xl border border-cyan-500 border-opacity-30 text-cyan-300 transition hover:bg-opacity-30">
            <Activity size={20} />
            {sidebarOpen && <span className="font-semibold">Dashboard</span>}
          </div>
          <div className="flex items-center space-x-3 p-4 hover:bg-slate-800 rounded-xl cursor-pointer transition text-gray-400 hover:text-gray-200">
            <BarChart3 size={20} />
            {sidebarOpen && <span>Analytics</span>}
          </div>
          <div className="flex items-center space-x-3 p-4 hover:bg-slate-800 rounded-xl cursor-pointer transition text-gray-400 hover:text-gray-200">
            <Zap size={20} />
            {sidebarOpen && <span>Limits</span>}
          </div>
          <div className="flex items-center space-x-3 p-4 hover:bg-slate-800 rounded-xl cursor-pointer transition text-gray-400 hover:text-gray-200">
            <DollarSign size={20} />
            {sidebarOpen && <span>Billing</span>}
          </div>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-slate-800 text-xs text-gray-500">
            <p className="mb-2">Last updated</p>
            <p className="text-cyan-400 font-semibold">2 min ago</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 p-8 sticky top-0 z-10 shadow-xl">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Token Usage Dashboard</h2>
          <p className="text-gray-400 text-lg">Real-time AI API consumption analytics</p>
        </header>

        <div className="p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Tokens', value: '980K', icon: Zap, color: 'cyan', gradient: 'from-cyan-400 to-cyan-600', trend: '+12%' },
              { label: 'Prompt Tokens', value: '588K', icon: TrendingUp, color: 'lime', gradient: 'from-lime-400 to-lime-600', trend: '+8%' },
              { label: 'Completion Tokens', value: '392K', icon: Activity, color: 'amber', gradient: 'from-amber-400 to-amber-600', trend: '+5%' },
              { label: 'Estimated Cost', value: '$6,821', icon: DollarSign, color: 'pink', gradient: 'from-pink-400 to-pink-600', trend: '+3%' },
            ].map((card, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-3">{card.label}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{card.value}</p>
                    <p className="text-lime-400 text-xs font-semibold mt-3">{card.trend} vs last week</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <card.icon size={28} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rate Limit Indicator */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Rate Limit Status</h3>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{rateLimitUsage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 shadow-lg ${
                  rateLimitUsage < 50 ? 'bg-gradient-to-r from-lime-400 to-cyan-400 shadow-lime-500/50' : 
                  rateLimitUsage < 80 ? 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-amber-500/50' : 
                  'bg-gradient-to-r from-pink-500 to-red-500 shadow-pink-500/50'
                }`}
                style={{ width: `${Math.min(rateLimitUsage, 100)}%` }}
              />
            </div>
            <p className="text-gray-300 text-sm mt-4 font-medium">
              <span className="text-cyan-400 font-bold">{(totalTokens / 1000000).toFixed(2)}M</span> / <span className="text-blue-400 font-bold">10M</span> tokens used this month
            </p>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Usage Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Token Usage Trend</h3>
                <div className="flex gap-3">
                  {['daily', 'weekly', 'monthly'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        timeRange === range 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' 
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                {['area', 'line'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      chartType === type 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-slate-700 text-gray-400'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'area' ? (
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradientCyan" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#00D9FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey={xAxisKey} stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #00D9FF', borderRadius: '8px' }}
                        labelStyle={{ color: '#00D9FF' }}
                      />
                      <Area type="monotone" dataKey="tokens" stroke="#00D9FF" strokeWidth={3} fillOpacity={1} fill="url(#gradientCyan)" />
                    </AreaChart>
                  ) : (
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey={xAxisKey} stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #00D9FF', borderRadius: '8px' }}
                        labelStyle={{ color: '#00D9FF' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="promptTokens" stroke="#00FF88" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="completionTokens" stroke="#FFB800" strokeWidth={3} dot={false} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Breakdown */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8">Model Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {modelBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #00D9FF', borderRadius: '8px' }}
                      formatter={(value) => `${(value / 1000).toFixed(0)}K tokens`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-3">
                {modelBreakdown.map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg border border-slate-700 hover:border-slate-600 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: COLORS[idx], boxShadow: `0 0 12px ${COLORS[idx]}` }} />
                      <span className="text-gray-300 font-medium text-sm">{model.name}</span>
                    </div>
                    <span className="text-cyan-300 font-bold">${model.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Requests Table */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-8">Recent Requests</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-6 text-cyan-400 font-bold text-xs uppercase tracking-wide">Timestamp</th>
                    <th className="text-left py-4 px-6 text-cyan-400 font-bold text-xs uppercase tracking-wide">Model</th>
                    <th className="text-right py-4 px-6 text-cyan-400 font-bold text-xs uppercase tracking-wide">Prompt Tokens</th>
                    <th className="text-right py-4 px-6 text-cyan-400 font-bold text-xs uppercase tracking-wide">Completion</th>
                    <th className="text-right py-4 px-6 text-cyan-400 font-bold text-xs uppercase tracking-wide">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req, idx) => (
                    <tr key={req.id} className={`border-b border-slate-700 hover:bg-slate-700 hover:bg-opacity-30 transition ${idx % 2 === 0 ? 'bg-slate-900 bg-opacity-30' : ''}`}>
                      <td className="py-4 px-6 text-gray-300 font-medium">{req.timestamp}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block ${
                          req.model.includes('Haiku') ? 'bg-cyan-500 bg-opacity-20 text-cyan-300 border border-cyan-500' :
                          req.model.includes('Sonnet') ? 'bg-lime-500 bg-opacity-20 text-lime-300 border border-lime-500' :
                          'bg-pink-500 bg-opacity-20 text-pink-300 border border-pink-500'
                        }`}>
                          {req.model}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-gray-300">{req.prompt.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-gray-300">{req.completion.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">${req.cost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenDashboard;
