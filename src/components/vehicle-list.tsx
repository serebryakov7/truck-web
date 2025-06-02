"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, AlertTriangle, Fuel, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// Мокированные данные транспортных средств
const mockVehicles = [
  {
    id: "1",
    number: "А123БВ178",
    vin: "1HGBH41JXMN109186",
    model: "KAMAZ-5490",
    type: "Тягач",
    status: "in-transit",
    statusLabel: "В пути",
    driver: "Иванов И.И.",
    location: "М-4 Дон, км 127",
    lastUpdate: "2 мин назад",
    speed: "87 км/ч",
    fuel: "68%",
    mileage: "234,567 км",
    department: "Московское отделение",
    alerts: [],
  },
  {
    id: "2",
    number: "В456ГД178",
    vin: "2HGBH41JXMN109187",
    model: "Volvo FH16",
    type: "Тягач",
    status: "parked",
    statusLabel: "На стоянке",
    driver: "Петров П.П.",
    location: "Склад №1, Москва",
    lastUpdate: "15 мин назад",
    speed: "0 км/ч",
    fuel: "45%",
    mileage: "189,234 км",
    department: "Московское отделение",
    alerts: [],
  },
  {
    id: "3",
    number: "Е789ЖЗ178",
    vin: "3HGBH41JXMN109188",
    model: "MAN TGX",
    type: "Рефрижератор",
    status: "maintenance",
    statusLabel: "Требует обслуживания",
    driver: "Сидоров С.С.",
    location: "СТО, СПб",
    lastUpdate: "1 час назад",
    speed: "0 км/ч",
    fuel: "32%",
    mileage: "298,765 км",
    department: "Санкт-Петербург",
    alerts: ["Низкий уровень топлива", "Ошибка двигателя P0171"],
  },
  {
    id: "4",
    number: "И012КЛ178",
    vin: "4HGBH41JXMN109189",
    model: "Scania R450",
    type: "Бортовой",
    status: "offline",
    statusLabel: "Вне сети",
    driver: "Козлов К.К.",
    location: "Последняя известная: Тверь",
    lastUpdate: "3 часа назад",
    speed: "—",
    fuel: "—",
    mileage: "156,890 км",
    department: "Московское отделение",
    alerts: ["Нет связи с GPS"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "in-transit":
      return "bg-green-100 text-green-800";
    case "parked":
      return "bg-blue-100 text-blue-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    case "offline":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface VehicleListProps {
  className?: string;
}

export function VehicleList({ className }: VehicleListProps) {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "cards">("cards");

  const toggleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  return (
    <div className={className}>
      {/* Заголовок и управление */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Транспортные средства</h2>
          <p className="text-sm text-gray-600">
            Найдено: {mockVehicles.length} единиц
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            onClick={() => setViewMode("cards")}
            size="sm"
          >
            Карточки
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            Список
          </Button>
        </div>
      </div>

      {/* Режим карточек */}
      {viewMode === "cards" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/vehicles/${vehicle.id}`}
              className="bg-white rounded-lg shadow border hover:shadow-lg hover:border-blue-300 transition-all duration-200 block cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="p-4">
                {/* Заголовок карточки */}
                <div className="mb-3">
                  <h3 className="font-semibold text-lg">{vehicle.number}</h3>
                  <p className="text-sm text-gray-600">{vehicle.model}</p>
                </div>

                {/* Статус */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.statusLabel}
                  </span>
                </div>

                {/* Основная информация */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="size-4 mr-2" />
                    {vehicle.driver}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="size-4 mr-2" />
                    {vehicle.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="size-4 mr-2" />
                    {vehicle.lastUpdate}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Fuel className="size-4 mr-2" />
                    Топливо: {vehicle.fuel}
                  </div>
                </div>

                {/* Предупреждения */}
                {vehicle.alerts.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center text-amber-600 mb-1">
                      <AlertTriangle className="size-4 mr-1" />
                      <span className="text-xs font-medium">
                        Предупреждения:
                      </span>
                    </div>
                    {vehicle.alerts.map((alert, index) => (
                      <p key={index} className="text-xs text-amber-600">
                        {alert}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Режим списка */}
      {viewMode === "list" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Транспорт
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Водитель
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Местоположение
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Топливо
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Последнее обновление
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedVehicles.includes(vehicle.id)}
                        onChange={() => toggleVehicleSelection(vehicle.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {vehicle.number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.model}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          vehicle.status
                        )}`}
                      >
                        {vehicle.statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.driver}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.fuel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.lastUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Подробности
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
