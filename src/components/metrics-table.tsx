"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import {
  ChevronDown,
  ChevronRight,
  Thermometer,
  Gauge,
  Fuel,
  Battery,
  Zap,
  Activity,
} from "lucide-react";

interface MetricsTableProps {
  telemetry: {
    rpm: number;
    speed: number;
    fuelLevel: number;
    engineTemp: number;
    oilPressure: number;
    batteryVoltage: number;
    airPressure: number;
    exhaustTemp: number;
    coolantLevel: number;
    adBlueLevel: number;
    turboBoost: number;
    transmissionTemp: number;
  };
}

interface MetricData {
  id: string;
  name: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  minValue?: number;
  maxValue?: number;
}

export function MetricsTable({ telemetry }: MetricsTableProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  // Генерация исторических данных для графиков
  const generateHistoricalData = (
    currentValue: number,
    variance: number,
    points: number = 24
  ) => {
    const data = [];
    const categories = [];
    const now = new Date();

    for (let i = points; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 60 * 60 * 1000); // каждый час
      categories.push(
        date.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // Генерируем значения около текущего с небольшими вариациями
      const variation = (Math.random() - 0.5) * variance;
      data.push(Math.max(0, currentValue + variation));
    }

    return { categories, data };
  };

  // Данные метрик
  const metrics: MetricData[] = [
    {
      id: "rpm",
      name: "Обороты двигателя",
      value: telemetry.rpm,
      unit: "об/мин",
      icon: Activity,
      color: "#3b82f6",
      minValue: 0,
      maxValue: 3000,
    },
    {
      id: "speed",
      name: "Скорость",
      value: telemetry.speed,
      unit: "км/ч",
      icon: Gauge,
      color: "#10b981",
      minValue: 0,
      maxValue: 120,
    },
    {
      id: "fuelLevel",
      name: "Уровень топлива",
      value: telemetry.fuelLevel,
      unit: "%",
      icon: Fuel,
      color: "#f59e0b",
      minValue: 0,
      maxValue: 100,
    },
    {
      id: "engineTemp",
      name: "Температура двигателя",
      value: telemetry.engineTemp,
      unit: "°C",
      icon: Thermometer,
      color: "#ef4444",
      minValue: 60,
      maxValue: 120,
    },
    {
      id: "oilPressure",
      name: "Давление масла",
      value: telemetry.oilPressure,
      unit: "PSI",
      icon: Gauge,
      color: "#8b5cf6",
      minValue: 0,
      maxValue: 80,
    },
    {
      id: "batteryVoltage",
      name: "Напряжение батареи",
      value: telemetry.batteryVoltage,
      unit: "V",
      icon: Battery,
      color: "#06b6d4",
      minValue: 10,
      maxValue: 15,
    },
    {
      id: "airPressure",
      name: "Давление воздуха",
      value: telemetry.airPressure,
      unit: "PSI",
      icon: Zap,
      color: "#84cc16",
      minValue: 60,
      maxValue: 120,
    },
    {
      id: "exhaustTemp",
      name: "Температура выхлопа",
      value: telemetry.exhaustTemp,
      unit: "°C",
      icon: Thermometer,
      color: "#f97316",
      minValue: 200,
      maxValue: 600,
    },
  ];

  const getChartOption = (metric: MetricData) => {
    const historicalData = generateHistoricalData(metric.value, 20);

    return {
      title: {
        text: `${metric.name} за последние 24 часа`,
        left: "center",
        textStyle: { fontSize: 16, fontWeight: "bold" },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) =>
          `${params[0].name}<br/>${metric.name}: ${
            Math.round(params[0].value * 10) / 10
          } ${metric.unit}`,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: historicalData.categories,
        axisLabel: {
          rotate: 45,
          fontSize: 12,
        },
      },
      yAxis: {
        type: "value",
        name: metric.unit,
        axisLabel: { formatter: "{value}" },
        min: metric.minValue,
        max: metric.maxValue,
      },
      series: [
        {
          name: metric.name,
          type: "line",
          data: historicalData.data,
          smooth: true,
          lineStyle: { color: metric.color, width: 3 },
          areaStyle: { color: `${metric.color}20` },
          markLine: {
            data: [
              {
                yAxis: metric.value,
                name: "Текущее",
                lineStyle: { color: "#ef4444", type: "dashed" },
                label: { formatter: `Текущее: ${metric.value}${metric.unit}` },
              },
            ],
          },
        },
      ],
    };
  };

  const handleRowClick = (metricId: string) => {
    setExpandedMetric(expandedMetric === metricId ? null : metricId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Метрики в реальном времени</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isExpanded = expandedMetric === metric.id;

            return (
              <div
                key={metric.id}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleRowClick(metric.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                        <Icon
                          className="h-5 w-5"
                          style={{ color: metric.color }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {metric.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-black">
                          {metric.value} {metric.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="h-64">
                      <ReactECharts
                        option={getChartOption(metric)}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
