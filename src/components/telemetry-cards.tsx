"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gauge,
  Thermometer,
  Fuel,
  Battery,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface TelemetryCardsProps {
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

export function TelemetryCards({ telemetry }: TelemetryCardsProps) {
  const getStatusColor = (
    value: number,
    min: number,
    max: number,
    reverse = false
  ) => {
    const percentage = (value - min) / (max - min);
    if (reverse) {
      if (percentage < 0.3) return "text-green-600";
      if (percentage < 0.7) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (percentage < 0.3) return "text-red-600";
      if (percentage < 0.7) return "text-yellow-600";
      return "text-green-600";
    }
  };

  const getStatusBadge = (
    value: number,
    min: number,
    max: number,
    reverse = false
  ) => {
    const percentage = (value - min) / (max - min);
    let status, color;

    if (reverse) {
      if (percentage < 0.3) {
        status = "Отлично";
        color = "bg-green-500";
      } else if (percentage < 0.7) {
        status = "Хорошо";
        color = "bg-yellow-500";
      } else {
        status = "Внимание";
        color = "bg-red-500";
      }
    } else {
      if (percentage < 0.3) {
        status = "Низкий";
        color = "bg-red-500";
      } else if (percentage < 0.7) {
        status = "Средний";
        color = "bg-yellow-500";
      } else {
        status = "Высокий";
        color = "bg-green-500";
      }
    }

    return <Badge className={`${color} text-white text-xs`}>{status}</Badge>;
  };

  const telemetryData = [
    {
      title: "Обороты",
      value: telemetry.rpm,
      unit: "об/мин",
      icon: <Activity className="h-5 w-5" />,
      min: 600,
      max: 2500,
      reverse: false,
    },
    {
      title: "Скорость",
      value: telemetry.speed,
      unit: "км/ч",
      icon: <Gauge className="h-5 w-5" />,
      min: 0,
      max: 120,
      reverse: false,
    },
    {
      title: "Топливо",
      value: telemetry.fuelLevel,
      unit: "%",
      icon: <Fuel className="h-5 w-5" />,
      min: 0,
      max: 100,
      reverse: false,
    },
    {
      title: "Температура",
      value: telemetry.engineTemp,
      unit: "°C",
      icon: <Thermometer className="h-5 w-5" />,
      min: 60,
      max: 120,
      reverse: true,
    },
    {
      title: "Давление масла",
      value: telemetry.oilPressure,
      unit: "бар",
      icon: <Zap className="h-5 w-5" />,
      min: 20,
      max: 60,
      reverse: false,
    },
    {
      title: "Напряжение АКБ",
      value: telemetry.batteryVoltage,
      unit: "В",
      icon: <Battery className="h-5 w-5" />,
      min: 11,
      max: 15,
      reverse: false,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Текущие показатели</h3>

      {/* Основные показатели телеметрии */}
      <div className="grid gap-3">
        {telemetryData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1.5 rounded-full bg-gray-100 ${getStatusColor(
                      item.value,
                      item.min,
                      item.max,
                      item.reverse
                    )}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {getStatusBadge(item.value, item.min, item.max, item.reverse)}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    {item.unit}
                  </span>
                </div>

                {/* Мини индикатор */}
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.reverse
                        ? (item.value - item.min) / (item.max - item.min) < 0.7
                          ? "bg-green-500"
                          : "bg-red-500"
                        : (item.value - item.min) / (item.max - item.min) > 0.3
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.max(
                        5,
                        Math.min(
                          100,
                          ((item.value - item.min) / (item.max - item.min)) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Общее состояние */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Общее состояние</span>
            </div>
            <Badge className="bg-green-500 text-white">Хорошее</Badge>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Все показатели в норме. Рекомендуется плановое ТО через 2000 км.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
