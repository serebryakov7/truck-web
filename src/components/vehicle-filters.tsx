"use client";

import { useState } from "react";
import { Search, Filter, Calendar, User, Truck, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VehicleFiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

const vehicleStatuses = [
  { id: "all", label: "Все", count: 47 },
  { id: "in-transit", label: "В пути", count: 23 },
  { id: "parked", label: "На стоянке/простой", count: 15 },
  { id: "maintenance", label: "Требуют обслуживания", count: 6 },
  { id: "offline", label: "Вне сети", count: 3 },
];

const fleetGroups = [
  { id: "all", label: "Все грузовики" },
  { id: "tractors", label: "Тягачи" },
  { id: "dump-trucks", label: "Самосвалы" },
  { id: "flatbed", label: "Бортовые" },
  { id: "refrigerated", label: "Рефрижераторы" },
];

const departments = [
  { id: "all", label: "Все подразделения" },
  { id: "moscow", label: "Московское отделение" },
  { id: "spb", label: "Санкт-Петербург" },
  { id: "ekb", label: "Екатеринбург" },
  { id: "nsk", label: "Новосибирск" },
];

const drivers = [
  { id: "all", label: "Все водители" },
  { id: "driver-1", label: "Иванов И.И." },
  { id: "driver-2", label: "Петров П.П." },
  { id: "driver-3", label: "Сидоров С.С." },
  { id: "driver-4", label: "Козлов К.К." },
];

const timeRanges = [
  { id: "24h", label: "Последние 24 часа" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "custom", label: "Произвольный период" },
];

const geozones = [
  { id: "all", label: "Все геозоны" },
  { id: "warehouse-1", label: "Склад №1" },
  { id: "warehouse-2", label: "Склад №2" },
  { id: "city-center", label: "Центр города" },
  { id: "highway-m1", label: "Трасса М1" },
];

export function VehicleFilters({
  onFiltersChange,
  className = "",
}: VehicleFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFleet, setSelectedFleet] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedGeozone, setSelectedGeozone] = useState("all");
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value);
    setShowCustomDateRange(value === "custom");
  };

  return (
    <div
      className={`w-80 bg-white border-r border-gray-200 h-full ${className}`}
    >
      <div className="h-full overflow-y-auto">
        {/* Заголовок */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Фильтры</h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Поиск */}
          <div className="space-y-2">
            <Label htmlFor="search">Поиск по транспорту / VIN / номеру</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                id="search"
                type="text"
                placeholder="Введите номер, VIN или название..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Флот */}
          <div className="space-y-2">
            <Label>Флот</Label>
            <select
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fleetGroups.map((fleet) => (
                <option key={fleet.id} value={fleet.id}>
                  {fleet.label}
                </option>
              ))}
            </select>
          </div>

          {/* Подразделения */}
          <div className="space-y-2">
            <Label>Подразделение / Регион</Label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Статусы транспортных средств */}
          <div className="space-y-2">
            <Label>Статус транспортного средства</Label>
            <div className="space-y-2">
              {vehicleStatuses.map((status) => (
                <label
                  key={status.id}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={status.id}
                      checked={selectedStatus === status.id}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{status.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {status.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Период времени */}
          <div className="space-y-2">
            <Label>Период времени</Label>
            <div className="space-y-2">
              {timeRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="timeRange"
                    value={range.id}
                    checked={selectedTimeRange === range.id}
                    onChange={(e) => handleTimeRangeChange(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{range.label}</span>
                </label>
              ))}
            </div>

            {showCustomDateRange && (
              <div className="mt-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="start-date" className="text-xs">
                      С
                    </Label>
                    <Input id="start-date" type="date" className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-xs">
                      По
                    </Label>
                    <Input id="end-date" type="date" className="text-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Водитель */}
          <div className="space-y-2">
            <Label>
              <User className="inline size-4 mr-1" />
              Водитель
            </Label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.label}
                </option>
              ))}
            </select>
          </div>

          {/* Тип грузовика */}
          <div className="space-y-2">
            <Label>
              <Truck className="inline size-4 mr-1" />
              Тип грузовика
            </Label>
            <select
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fleetGroups.map((fleet) => (
                <option key={fleet.id} value={fleet.id}>
                  {fleet.label}
                </option>
              ))}
            </select>
          </div>

          {/* Геозона */}
          <div className="space-y-2">
            <Label>
              <MapPin className="inline size-4 mr-1" />
              Геозона
            </Label>
            <select
              value={selectedGeozone}
              onChange={(e) => setSelectedGeozone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {geozones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопки действий */}
          <div className="space-y-2 pt-4 border-t">
            <Button className="w-full">Применить фильтры</Button>
            <Button variant="outline" className="w-full">
              Сбросить все
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
