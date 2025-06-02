"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Route,
  MapPin,
  Clock,
  Fuel,
  User,
  Search,
  Calendar,
  Download,
  Eye,
} from "lucide-react";

interface Trip {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  duration: number;
  fuelConsumed: number;
  driver: string;
  status: "completed" | "in-progress" | "cancelled";
}

interface TripHistoryProps {
  trips: {
    id: string;
    startTime: string;
    endTime: string;
    distance: number;
    fuelUsed: number;
    avgSpeed: number;
    route: string;
  }[];
}

export function TripHistory({ trips: tripsData }: TripHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Адаптируем переданные данные к нужному формату
  const trips: Trip[] = tripsData.map((trip, index) => {
    const startDate = new Date(trip.startTime);
    const endDate = new Date(trip.endTime);
    const duration = Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60)
    ); // минуты

    return {
      id: trip.id,
      date: startDate.toISOString().split("T")[0],
      startTime: startDate.toTimeString().slice(0, 5),
      endTime: endDate.toTimeString().slice(0, 5),
      startLocation: trip.route.split(" - ")[0] || "Неизвестно",
      endLocation: trip.route.split(" - ")[1] || "Неизвестно",
      distance: trip.distance,
      duration,
      fuelConsumed: trip.fuelUsed,
      driver: "Иван Петров", // Можно добавить в данные позже
      status: "completed" as const,
    };
  });

  // Добавим несколько дополнительных записей для демонстрации
  if (trips.length === 1) {
    trips.push(
      {
        id: "2",
        date: "2024-01-14",
        startTime: "09:15",
        endTime: "15:30",
        startLocation: "Склад Б, Тула",
        endLocation: "ТЦ Калуга",
        distance: 124,
        duration: 375,
        fuelConsumed: 31.8,
        driver: "Иван Петров",
        status: "completed",
      },
      {
        id: "3",
        date: "2024-01-13",
        startTime: "10:00",
        endTime: "18:20",
        startLocation: "ТЦ Калуга",
        endLocation: "Склад А, Москва",
        distance: 156,
        duration: 500,
        fuelConsumed: 39.6,
        driver: "Иван Петров",
        status: "completed",
      },
      {
        id: "4",
        date: "2024-01-16",
        startTime: "08:00",
        endTime: "в пути",
        startLocation: "Склад А, Москва",
        endLocation: "Склад В, Рязань",
        distance: 78,
        duration: 185,
        fuelConsumed: 19.5,
        driver: "Иван Петров",
        status: "in-progress",
      }
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершена";
      case "in-progress":
        return "В пути";
      case "cancelled":
        return "Отменена";
      default:
        return "Неизвестно";
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredTrips = trips.filter(
    (trip) =>
      trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalFuel = trips.reduce((sum, trip) => sum + trip.fuelConsumed, 0);
  const averageConsumption =
    totalDistance > 0 ? ((totalFuel / totalDistance) * 100).toFixed(1) : "0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Route className="h-5 w-5 mr-2" />
            История поездок
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Фильтры */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск по маршруту или водителю..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            {["1d", "7d", "30d", "all"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === "1d"
                  ? "1 день"
                  : period === "7d"
                  ? "7 дней"
                  : period === "30d"
                  ? "30 дней"
                  : "Все"}
              </Button>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {totalDistance}
            </div>
            <div className="text-xs text-gray-600">км пройдено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {totalFuel.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">л потрачено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {averageConsumption}
            </div>
            <div className="text-xs text-gray-600">л/100км</div>
          </div>
        </div>

        {/* Список поездок */}
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{formatDate(trip.date)}</span>
                  <Badge
                    className={`${getStatusColor(
                      trip.status
                    )} text-white text-xs`}
                  >
                    {getStatusText(trip.status)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {trip.startTime} - {trip.endTime}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Откуда:</span>
                  <span className="font-medium">{trip.startLocation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-gray-600">Куда:</span>
                  <span className="font-medium">{trip.endLocation}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Route className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600">Расстояние:</span>
                  <span className="font-medium">{trip.distance} км</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600">Время:</span>
                  <span className="font-medium">
                    {formatDuration(trip.duration)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Fuel className="h-4 w-4 text-orange-600" />
                  <span className="text-gray-600">Топливо:</span>
                  <span className="font-medium">{trip.fuelConsumed} л</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-600">Водитель:</span>
                  <span className="font-medium">{trip.driver}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Расход:{" "}
                  {((trip.fuelConsumed / trip.distance) * 100).toFixed(1)}{" "}
                  л/100км
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    На карте
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Детали
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-8">
            <Route className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Поездки не найдены</p>
            <p className="text-sm text-gray-400">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
