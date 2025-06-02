"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Fuel,
  User,
  AlertTriangle,
  Download,
  Calendar,
  Target,
  Award,
  Clock,
} from "lucide-react";
import ReactECharts from "echarts-for-react";

interface AnalyticsTabsProps {
  truck: {
    id: string;
    [key: string]: any; // Для гибкости с другими полями
  };
}

export function AnalyticsTabs({ truck }: AnalyticsTabsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Генерация данных для графиков
  const generateTimeSeriesData = (
    days: number,
    baseValue: number,
    variance: number
  ) => {
    const data = [];
    const categories = [];
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      categories.push(
        date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })
      );
      data.push(baseValue + (Math.random() - 0.5) * variance);
    }

    return { categories, data };
  };

  // Данные для графиков топлива и эффективности
  const fuelData = generateTimeSeriesData(30, 25, 4);
  const efficiencyData = generateTimeSeriesData(30, 85, 15);
  const mileageData = generateTimeSeriesData(30, 450, 100);

  // Конфигурация графика расхода топлива
  const getFuelChartOption = () => ({
    title: { text: "Расход топлива", left: "center" },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Расход: ${params[0].value.toFixed(1)} л/100км`,
    },
    xAxis: {
      type: "category",
      data: fuelData.categories,
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "л/100км",
      axisLabel: { formatter: "{value} л" },
    },
    series: [
      {
        name: "Расход топлива",
        type: "line",
        data: fuelData.data,
        smooth: true,
        lineStyle: { color: "#f59e0b", width: 3 },
        areaStyle: { color: "#f59e0b20" },
        markLine: {
          data: [{ type: "average", name: "Среднее" }],
          lineStyle: { color: "#ef4444" },
        },
      },
    ],
    grid: { left: 60, right: 20, top: 60, bottom: 80 },
  });

  // Конфигурация графика эффективности
  const getEfficiencyChartOption = () => ({
    title: { text: "Эффективность вождения", left: "center" },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Эффективность: ${params[0].value.toFixed(0)}%`,
    },
    xAxis: {
      type: "category",
      data: efficiencyData.categories,
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "%",
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "Эффективность",
        type: "bar",
        data: efficiencyData.data,
        itemStyle: {
          color: (params: any) => {
            if (params.value >= 90) return "#10b981";
            if (params.value >= 70) return "#f59e0b";
            return "#ef4444";
          },
        },
      },
    ],
    grid: { left: 60, right: 20, top: 60, bottom: 80 },
  });

  // Конфигурация графика пробега
  const getMileageChartOption = () => ({
    title: { text: "Ежедневный пробег", left: "center" },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Пробег: ${params[0].value} км`,
    },
    xAxis: {
      type: "category",
      data: mileageData.categories,
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "км",
    },
    series: [
      {
        name: "Пробег",
        type: "bar",
        data: mileageData.data,
        itemStyle: { color: "#3b82f6" },
      },
    ],
    grid: { left: 60, right: 20, top: 60, bottom: 80 },
  });

  // Данные для DTC истории
  const dtcHistoryData = [
    { month: "Янв", count: 3, resolved: 3 },
    { month: "Фев", count: 1, resolved: 1 },
    { month: "Мар", count: 5, resolved: 4 },
    { month: "Апр", count: 2, resolved: 2 },
    { month: "Май", count: 4, resolved: 3 },
    { month: "Июн", count: 1, resolved: 1 },
  ];

  const getDTCChartOption = () => ({
    title: { text: "История DTC кодов", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    xAxis: {
      type: "category",
      data: dtcHistoryData.map((d) => d.month),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Новые коды",
        type: "bar",
        data: dtcHistoryData.map((d) => d.count),
        itemStyle: { color: "#ef4444" },
      },
      {
        name: "Устранено",
        type: "bar",
        data: dtcHistoryData.map((d) => d.resolved),
        itemStyle: { color: "#10b981" },
      },
    ],
    grid: { left: 60, right: 20, top: 60, bottom: 60 },
  });

  // Данные производительности водителя
  const driverMetrics = {
    score: 87,
    trends: {
      fuelEfficiency: { value: 92, change: 3, trend: "up" },
      safetyScore: { value: 85, change: -2, trend: "down" },
      onTimeDelivery: { value: 96, change: 1, trend: "up" },
      vehicleCare: { value: 89, change: 5, trend: "up" },
    },
    achievements: [
      {
        title: "Экономный водитель",
        description: "Расход ниже нормы 30 дней подряд",
        date: "2024-01-15",
      },
      {
        title: "Безопасное вождение",
        description: "Без нарушений 6 месяцев",
        date: "2024-01-10",
      },
      {
        title: "Точность доставки",
        description: "100% доставок вовремя этот месяц",
        date: "2024-01-05",
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Аналитика и отчеты
          </div>
          <div className="flex space-x-2">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fuel" className="space-y-4">
          <TabsList className="inline-flex w-auto space-x-1">
            <TabsTrigger value="fuel" className="flex items-center">
              <Fuel className="h-4 w-4 mr-2" />
              Топливо и эффективность
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Производительность водителя
            </TabsTrigger>
            <TabsTrigger value="dtc" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              История DTC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fuel" className="space-y-6">
            {/* KPI карты */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Fuel className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">24.8</div>
                  <div className="text-sm text-gray-600">л/100км</div>
                  <div className="text-xs text-green-600 mt-1">↓ 2.1%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-gray-600">Эффективность</div>
                  <div className="text-xs text-green-600 mt-1">↑ 5.2%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">412</div>
                  <div className="text-sm text-gray-600">км/день</div>
                  <div className="text-xs text-blue-600 mt-1">= 0%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-gray-600">рабочих дней</div>
                  <div className="text-xs text-purple-600 mt-1">этот месяц</div>
                </CardContent>
              </Card>
            </div>

            {/* Графики */}
            <div className="grid grid-cols-1 gap-6">
              <div className="h-96">
                <ReactECharts
                  option={getFuelChartOption()}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-96">
                <ReactECharts
                  option={getEfficiencyChartOption()}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>

            <div className="h-96">
              <ReactECharts
                option={getMileageChartOption()}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </TabsContent>

          <TabsContent value="driver" className="space-y-6">
            {/* Общий рейтинг */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-4">
                {driverMetrics.score}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Общий рейтинг водителя
              </h3>
              <Badge className="bg-blue-600 text-white">
                Отличная производительность
              </Badge>
            </div>

            {/* Метрики производительности */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(driverMetrics.trends).map(([key, metric]) => {
                const titles = {
                  fuelEfficiency: "Экономичность",
                  safetyScore: "Безопасность",
                  onTimeDelivery: "Пунктуальность",
                  vehicleCare: "Уход за ТС",
                };

                const icons = {
                  fuelEfficiency: <Fuel className="h-5 w-5" />,
                  safetyScore: <Target className="h-5 w-5" />,
                  onTimeDelivery: <Clock className="h-5 w-5" />,
                  vehicleCare: <Award className="h-5 w-5" />,
                };

                return (
                  <Card key={key}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-600">
                            {icons[key as keyof typeof icons]}
                          </div>
                          <span className="font-medium">
                            {titles[key as keyof typeof titles]}
                          </span>
                        </div>
                        <div
                          className={`flex items-center text-sm ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.trend === "up" ? "↑" : "↓"}{" "}
                          {Math.abs(metric.change)}%
                        </div>
                      </div>
                      <div className="text-3xl font-bold">{metric.value}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            metric.value >= 90
                              ? "bg-green-500"
                              : metric.value >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Достижения */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driverMetrics.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <Award className="h-6 w-6 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-yellow-800">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-yellow-700">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                          Получено:{" "}
                          {new Date(achievement.date).toLocaleDateString(
                            "ru-RU"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dtc" className="space-y-6">
            {/* Статистика DTC */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">16</div>
                  <div className="text-sm text-gray-600">Всего кодов</div>
                  <div className="text-xs text-gray-500 mt-1">за 6 месяцев</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    ✓
                  </div>
                  <div className="text-2xl font-bold">14</div>
                  <div className="text-sm text-gray-600">Устранено</div>
                  <div className="text-xs text-green-600 mt-1">87.5%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-gray-600">Активных</div>
                  <div className="text-xs text-orange-600 mt-1">
                    требуют внимания
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2.1</div>
                  <div className="text-sm text-gray-600">дня</div>
                  <div className="text-xs text-blue-600 mt-1">
                    среднее время решения
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* График DTC истории */}
            <div className="h-96">
              <ReactECharts
                option={getDTCChartOption()}
                style={{ height: "100%", width: "100%" }}
              />
            </div>

            {/* Топ проблем */}
            <Card>
              <CardHeader>
                <CardTitle>Наиболее частые проблемы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      code: "P0420",
                      description: "Катализатор ниже порога эффективности",
                      count: 4,
                    },
                    {
                      code: "P0171",
                      description: "Система слишком бедная (банк 1)",
                      count: 3,
                    },
                    {
                      code: "P0300",
                      description:
                        "Случайные/множественные пропуски воспламенения",
                      count: 2,
                    },
                    {
                      code: "P0128",
                      description: "Термостат охлаждающей жидкости",
                      count: 2,
                    },
                  ].map((problem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-mono font-semibold">
                          {problem.code}
                        </span>
                        <p className="text-sm text-gray-600">
                          {problem.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{problem.count} раз</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
