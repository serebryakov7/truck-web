"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Info, X } from "lucide-react";

interface DTCCode {
  code: string;
  description: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
}

interface DTCTableProps {
  dtcCodes: DTCCode[];
}

export function DTCTable({ dtcCodes }: DTCTableProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "Критический";
      case "medium":
        return "Средний";
      case "low":
        return "Низкий";
      default:
        return "Неизвестно";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4" />;
      case "low":
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            DTC коды
            {dtcCodes.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {dtcCodes.length}
              </Badge>
            )}
          </div>
          {dtcCodes.length > 0 && (
            <Button variant="outline" size="sm">
              Очистить все
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dtcCodes.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Активных DTC кодов нет</p>
            <p className="text-sm text-gray-400">
              Система работает в штатном режиме
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {dtcCodes.map((dtc, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1 rounded-full text-white ${getSeverityColor(
                        dtc.severity
                      )}`}
                    >
                      {getSeverityIcon(dtc.severity)}
                    </div>
                    <div>
                      <span className="font-mono font-semibold text-lg">
                        {dtc.code}
                      </span>
                      <Badge
                        className={`ml-2 ${getSeverityColor(
                          dtc.severity
                        )} text-white text-xs`}
                      >
                        {getSeverityText(dtc.severity)}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-700 ml-8">{dtc.description}</p>

                <div className="flex items-center justify-between ml-8">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(dtc.timestamp)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Подробнее
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Исправить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
