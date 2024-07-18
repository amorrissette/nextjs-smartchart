"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  Progress 
} from "@/components/ui/progress";

// type ChartConfig = {
//     [key: string]: {
//       label: string,
//       color: string,
//     }
// };

export default function DataChart({ csvData }: { csvData: string }) {
    const [chartData, setChartData] = useState([]);
    const [chartType, setChartType] = useState<string>('');
    const [finding, setFinding] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [chartTitle, setChartTitle] = useState<string>('');

    const [chartConfig, setChartConfig] = useState<ChartConfig>({});
    const [xAxis, setXAxis] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = React.useState(10)

    useEffect(() => {
      async function fetchInsight() {
        try {
          const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ csvData })
          });
  
          if (response.ok) {
            const insight = await response.json();
            
            const insightData = insight.insights[0].chartData;
            const insightFinding = insight.insights[0].finding;
            const insightDescription = insight.insights[0].description;
            const insightChartTitle = insight.insights[0].chartTitle;
            const insightChartType = insight.insights[0].chartType.toLowerCase();
            const insightXAxis = insight.insights[0].xAxis.toLowerCase();

            // Extract keys dynamically from the chartData
            const config: ChartConfig = {};
            if (insightData.length > 0) {
              const keys = Object.keys(insightData[0]);
              keys.forEach((key, index) => {
                if (key.toLowerCase() != insightXAxis) { // Skip xAxis key
                  config[key] = {
                    label: key,
                    color: `hsl(var(--chart-${index}))`
                  };
                }
              });
            }
  
            setChartData(insightData);
            setChartType(insightChartType);
            setChartTitle(insightChartTitle);
            setXAxis(insightXAxis);
            setFinding(insightFinding);
            setDescription(insightDescription);

            setChartConfig(config);
            setLoading(false);
          } else {
            const error = await response.json();
            console.error('Error:', error);
            setLoading(false);
          }
        } catch (error) {
          console.error('Server Error:', error);
          setLoading(false);
        }
      }
      if (csvData) {
        fetchInsight();
      }

      // Example to simulate progress increase
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress * 0.95 + 5));
      }, 500);
  
      return () => {
        clearInterval(timer);
      };

    }, [csvData]);
  
    if (loading) {
      return (
        <div className="flex w-full items-center gap-2 pt-6 pb-6 text-lg">
          <div>Analyzing data...</div>
          <Progress value={progress} className="w-[50%]" />
        </div>
      );
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>{chartTitle}</CardTitle>
          <CardDescription>Insights from provided CSV Data</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xAxis}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {Object.keys(chartConfig).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={chartConfig[key].color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {finding} <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {description}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
