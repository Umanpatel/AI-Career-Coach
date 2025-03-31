"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart as ChartIcon,
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Award,
  ArrowUpRight,
  Lightbulb,
  Radio,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const DashboardView = ({ insights }) => {
  const [showLatestData, setShowLatestData] = useState(false);

  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: ChartIcon, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: ChartIcon, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-muted-foreground">
            Analytics and insights for {insights.industry}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            variant="outline"
            className="bg-secondary/10 hover:bg-secondary/20 transition-colors"
          >
            Last updated: {lastUpdatedDate}
          </Badge>
          <Badge
            variant="outline"
            className="bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            Next update {nextUpdateDistance}
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.marketOutlook}
            </div>
            <div className={cn("text-xs font-medium mt-2", outlookColor)}>
              {insights.marketOutlook === "POSITIVE"
                ? "+12% from last quarter"
                : insights.marketOutlook === "NEGATIVE"
                ? "-8% from last quarter"
                : "Stable market conditions"}
            </div> 
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress
              value={insights.growthRate}
              className="mt-2 h-2 bg-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-5 w-5 text-orange-500" />
            {/* <Target className="h-5 w-5 text-blue-500" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.demandLevel}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div
                className={cn(
                  "h-2 flex-1 rounded-full",
                  getDemandLevelColor(insights.demandLevel)
                )}
              />
              <span className="text-xs font-medium">
                {insights.demandLevel === "HIGH"
                  ? "↑"
                  : insights.demandLevel === "LOW"
                  ? "↓"
                  : "→"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Skills Match</CardTitle>
            {/* <Award className="h-5 w-5 text-purple-500" /> */}
            <Brain className="h-5 w-5 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {Math.round((insights.topSkills.length / 10) * 100)}%
            </div>
            <Progress
              value={(insights.topSkills.length / 10) * 100}
              className="mt-2 h-2 bg-gray-700"
              indicatorClassName="bg-purple-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Salary Chart Section */}
      <Card className="col-span-1 lg:col-span-2 hover:shadow-xl transition-all duration-200  from-slate-900/50 to-slate-800/30 border-slate-700/50">
        <CardHeader className="border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-100 via-teal-100 to-emerald-100 bg-clip-text text-transparent">
                Salary Distribution
              </CardTitle>
              <CardDescription className="text-slate-400">
                Annual compensation ranges by role (in thousands)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-cyan-500/10 text-cyan-50 hover:bg-cyan-500/20 cursor-pointer"
                onClick={() => setShowLatestData(true)}
              >
                <ArrowUpRight className="h-4 w-4 mr-1 animate-pulse" />
                Latest Data
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(191 219 254)"
                      stopOpacity={0.9}
                    />{" "}
                    {/* light blue-200 */}
                    <stop
                      offset="95%"
                      stopColor="rgb(191 219 254)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                  <linearGradient
                    id="medianGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(147 197 253)"
                      stopOpacity={0.9}
                    />{" "}
                    {/* light blue-300 */}
                    <stop
                      offset="95%"
                      stopColor="rgb(147 197 253)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                  <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(96 165 250)"
                      stopOpacity={0.9}
                    />{" "}
                    {/* light blue-400 */}
                    <stop
                      offset="95%"
                      stopColor="rgb(96 165 250)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgb(148 163 184)"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="rgb(148 163 184)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "rgb(148 163 184)", opacity: 0.2 }}
                  tick={{ fill: "rgb(203 213 225)" }}
                />
                <YAxis
                  stroke="rgb(148 163 184)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgb(203 213 225)" }}
                  tickFormatter={(value) => `$${value}K`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-800/95 backdrop-blur-md border border-cyan-500/20 rounded-lg p-4 shadow-xl">
                          <h3 className="font-semibold text-base mb-2 text-cyan-300">
                            {label}
                          </h3>
                          <div className="space-y-2">
                            {payload.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between gap-4"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className="h-3 w-3 rounded-full animate-pulse"
                                    style={{ backgroundColor: item.fill }}
                                  />
                                  <span className="text-sm text-slate-300">
                                    {item.name}:
                                  </span>
                                </div>
                                <span className="font-medium text-cyan-200">
                                  ${item.value}K
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="min"
                  fill="url(#minGradient)"
                  name="Min Salary"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="median"
                  fill="url(#medianGradient)"
                  name="Median Salary"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="max"
                  fill="url(#maxGradient)"
                  name="Max Salary"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showLatestData} onOpenChange={setShowLatestData}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] bg-black backdrop-blur-md border-slate-700">
          <DialogHeader className="border-b border-slate-700/50 pb-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r text-white bg-clip-text">
              Latest Salary Data
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 pr-2">
            <div className="space-y-3">
              {salaryData.map((role) => (
                <div
                  key={role.name}
                  className="p-3 rounded-lg bg-black hover:bg-slate-800/80 transition-colors border border-white/60"
                >
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400/50 animate-pulse"></span>
                    {role.name}
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs">Minimum</p>
                      <p className="text-cyan-300 font-medium">${role.min}K</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs">Median</p>
                      <p className="text-teal-300 font-medium">
                        ${role.median}K
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs">Maximum</p>
                      <p className="text-emerald-300 font-medium">
                        ${role.max}K
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trends and Skills */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Industry Trends</CardTitle>
                <CardDescription>Latest developments</CardDescription>
              </div>
              <Lightbulb className="h-5 w-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>Most in-demand capabilities</CardDescription>
              </div>
              <Radio className="h-5 w-5 text-emerald-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 bg-blue-400/10 hover:bg-amber-100 hover:text-black  transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
