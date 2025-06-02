"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Wrench, Clock, DollarSign, Plus } from "lucide-react";

interface MaintenanceRecord {
  date: string;
  type: string;
  description: string;
  cost: number;
  status: "completed" | "scheduled" | "overdue";
}

interface MaintenanceHistoryProps {
  maintenance: MaintenanceRecord[];
}

export function MaintenanceHistory({ maintenance }: MaintenanceHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Выполнено";
      case "scheduled":
        return "Запланировано";
      case "overdue":
        return "Просрочено";
      default:
        return "Неизвестно";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCost = (cost: number) => {
    return cost.toLocaleString("ru-RU") + " ₽";
  };

  // Сортировка по дате (новые сверху)
  const sortedMaintenance = [...maintenance].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Wrench className="h-5 w-5 mr-2" />
            История обслуживания
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Добавить
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {maintenance.length === 0 ? (
          <div className="text-center py-8">
            <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Записей об обслуживании нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMaintenance.map((record, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">
                      {formatDate(record.date)}
                    </span>
                    <Badge
                      className={`${getStatusColor(
                        record.status
                      )} text-white text-xs`}
                    >
                      {getStatusText(record.status)}
                    </Badge>
                  </div>
                  {record.status === "completed" && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatCost(record.cost)}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium text-sm">{record.type}</p>
                  <p className="text-sm text-gray-600">{record.description}</p>
                </div>

                {record.status === "scheduled" && (
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Изменить
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Отменить
                    </Button>
                  </div>
                )}

                {record.status === "completed" && (
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Детали
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Документы
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Рекомендации по обслуживанию */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">
            Рекомендации по обслуживанию
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Замена масла</span>
              <span className="text-blue-600 font-medium">через 2000 км</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Техосмотр</span>
              <span className="text-blue-600 font-medium">через 30 дней</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Замена фильтров</span>
              <span className="text-blue-600 font-medium">через 5000 км</span>
            </div>
          </div>
        </div>

        {/* Статистика обслуживания */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">
              {maintenance.filter((m) => m.status === "completed").length}
            </div>
            <div className="text-xs text-gray-600">Выполнено</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">
              {maintenance
                .filter((m) => m.status === "completed")
                .reduce((sum, m) => sum + m.cost, 0)
                .toLocaleString()}
              ₽
            </div>
            <div className="text-xs text-gray-600">Потрачено</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
