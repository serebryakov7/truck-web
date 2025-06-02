"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Route, Zap } from "lucide-react";

interface TruckMapProps {
  truck: {
    location: {
      address: string;
      coordinates: number[];
    };
    telemetry: {
      speed: number;
    };
  };
}

export function TruckMap({ truck }: TruckMapProps) {
  const [mapType, setMapType] = useState<"satellite" | "roadmap">("roadmap");

  // Мок данные для маршрута
  const routePoints = [
    { lat: 55.7558, lng: 37.6176, time: "14:30", event: "Выезд со склада" },
    {
      lat: 55.7608,
      lng: 37.6256,
      time: "14:45",
      event: "Остановка на заправке",
    },
    { lat: 55.7658, lng: 37.6356, time: "15:00", event: "Доставка №1" },
    { lat: 55.7708, lng: 37.6456, time: "15:30", event: "Доставка №2" },
    {
      lat: 55.7758,
      lng: 37.6556,
      time: "16:00",
      event: "Текущее местоположение",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Информация о местоположении */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold">Текущее местоположение</p>
            <p className="text-sm text-gray-600">{truck.location.address}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Navigation className="h-4 w-4 text-green-600" />
          <span className="font-semibold">{truck.telemetry.speed} км/ч</span>
        </div>
      </div>

      {/* Контролы карты */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={mapType === "roadmap" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapType("roadmap")}
          >
            Карта
          </Button>
          <Button
            variant={mapType === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapType("satellite")}
          >
            Спутник
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Route className="h-4 w-4 mr-2" />
            Показать маршрут
          </Button>
          <Button variant="outline" size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Live
          </Button>
        </div>
      </div>

      {/* Заглушка карты (в реальном проекте здесь был бы компонент Google Maps или OpenStreetMap) */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-semibold text-gray-700">
              Интерактивная карта
            </p>
            <p className="text-sm text-gray-500">
              Координаты: {truck.location.coordinates[0].toFixed(4)},{" "}
              {truck.location.coordinates[1].toFixed(4)}
            </p>
          </div>
        </div>

        {/* Симуляция маркера грузовика */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg">
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {truck.telemetry.speed} км/ч
            </div>
          </div>
        </div>

        {/* Симуляция маршрута */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
          <path
            d="M 50 300 Q 150 250 250 200 T 350 150"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      </div>

      {/* История маршрута */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-700">
          История маршрута (сегодня)
        </h4>
        <div className="space-y-1">
          {routePoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 text-sm"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  index === routePoints.length - 1
                    ? "bg-blue-600"
                    : "bg-gray-400"
                }`}
              />
              <span className="text-gray-500 w-16">{point.time}</span>
              <span className="flex-1">{point.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
