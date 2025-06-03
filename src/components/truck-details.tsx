"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Activity,
  Fuel,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  Send,
  Wrench,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Zap,
  Thermometer,
  Gauge,
  Battery,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import { useRouter } from "next/navigation";
import { TelemetryCharts } from "@/components/telemetry-charts";
import { DTCTable } from "@/components/dtc-table";
import { MetricsTable } from "@/components/metrics-table";

interface TruckDetailsProps {
  truckId: string;
}

export function TruckDetails({ truckId }: TruckDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock truck data
  const truck = {
    id: truckId,
    name: `Грузовик ${truckId.toUpperCase()}`,
    model: "Volvo FH16",
    year: 2022,
    vin: `VNL${truckId.toUpperCase()}64T123456789`,
    licensePlate: `А${truckId.slice(-3)}ВС77`,
    driver: "Иван Петров",
    fleet: "Флот А",
    department: "Доставка",
    status: "active",
    location: {
      address: "ул. Ленина, 123, Москва",
      coordinates: [55.7558, 37.6176],
    },
    telemetry: {
      rpm: Math.floor(Math.random() * 2000) + 800,
      speed: Math.floor(Math.random() * 80) + 20,
      fuelLevel: Math.floor(Math.random() * 100),
      engineTemp: Math.floor(Math.random() * 30) + 80,
      oilPressure: Math.floor(Math.random() * 50) + 30,
      batteryVoltage: 12.5 + Math.random() * 2,
      airPressure: Math.floor(Math.random() * 20) + 80, // 80-100 PSI
      exhaustTemp: Math.floor(Math.random() * 200) + 300, // 300-500°C
      coolantLevel: Math.floor(Math.random() * 100), // 0-100%
      adBlueLevel: Math.floor(Math.random() * 100), // 0-100%
      turboBoost: Math.floor(Math.random() * 30) + 10, // 10-40 PSI
      transmissionTemp: Math.floor(Math.random() * 40) + 60, // 60-100°C
    },
    kpis: {
      totalMileage: 125430,
      fuelConsumption: 8.5,
      engineHours: 3240,
      activeDtcCodes: 2,
      healthScore: 85,
    },
    dtcCodes: [
      {
        code: "P0171",
        description: "Система слишком бедная (ряд 1)",
        severity: "medium" as const,
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        code: "P0300",
        description: "Случайные/множественные пропуски зажигания",
        severity: "high" as const,
        timestamp: "2024-01-14T15:45:00Z",
      },
    ],
    maintenance: [
      {
        date: "2024-01-10",
        type: "Плановое ТО",
        description: "Замена масла и фильтров",
        cost: 15000,
        status: "completed" as const,
      },
      {
        date: "2024-02-15",
        type: "Диагностика",
        description: "Проверка двигателя",
        cost: 5000,
        status: "scheduled" as const,
      },
    ],
    trips: [
      {
        id: "1",
        startTime: "2024-01-15T08:00:00Z",
        endTime: "2024-01-15T16:30:00Z",
        distance: 250,
        fuelUsed: 32.5,
        avgSpeed: 65,
        route: "Москва - Тула",
      },
    ],
  };

  // Mini chart options for KPI cards
  const getMiniChartOption = (data: number[], color: string) => ({
    grid: { top: 0, left: 0, right: 0, bottom: 0 },
    xAxis: { type: "category", show: false },
    yAxis: { type: "value", show: false },
    series: [
      {
        data,
        type: "line",
        smooth: true,
        lineStyle: { color, width: 2 },
        showSymbol: false,
        areaStyle: { color: `${color}20` },
      },
    ],
  });

  return (
    <div className="space-y-6 px-[10%]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Назад</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{truck.name}</h1>
            <p className="text-gray-600">
              {truck.model} • {truck.year} • {truck.licensePlate}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={truck.status === "active" ? "default" : "secondary"}
            className={
              truck.status === "active" ? "bg-green-100 text-green-800" : ""
            }
          >
            {truck.status === "active" ? "Активен" : "Неактивен"}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="diagnostics">Диагностика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <MetricsTable telemetry={truck.telemetry} />
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4">
          <DTCTable dtcCodes={truck.dtcCodes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
