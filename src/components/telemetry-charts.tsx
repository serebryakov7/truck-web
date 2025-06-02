"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

interface TelemetryChartsProps {
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

export function TelemetryCharts({ telemetry }: TelemetryChartsProps) {
  // Генерация исторических данных для графиков
  const generateHistoricalData = (
    currentValue: number,
    variance: number,
    points: number = 30
  ) => {
    const data = [];
    const categories = [];
    const now = new Date();

    for (let i = points; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 2 * 60 * 1000); // каждые 2 минуты
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

  // Данные для графиков
  const rpmData = generateHistoricalData(telemetry.rpm, 200);
  const speedData = generateHistoricalData(telemetry.speed, 15);
  const fuelData = generateHistoricalData(telemetry.fuelLevel, 5);
  const airPressureData = generateHistoricalData(telemetry.airPressure, 10);
  const oilPressureData = generateHistoricalData(telemetry.oilPressure, 8);
  const engineTempData = generateHistoricalData(telemetry.engineTemp, 15);
  const exhaustTempData = generateHistoricalData(telemetry.exhaustTemp, 50);
  const turboBoostData = generateHistoricalData(telemetry.turboBoost, 5);

  // Конфигурация графика оборотов
  const getRpmChartOption = () => ({
    title: {
      text: "Обороты двигателя",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Обороты: ${Math.round(params[0].value)} об/мин`,
    },
    xAxis: {
      type: "category",
      data: rpmData.categories,
      axisLabel: {
        rotate: 45,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "об/мин",
      axisLabel: { formatter: "{value}" },
      min: 500,
      max: 3000,
    },
    series: [
      {
        name: "Обороты",
        type: "line",
        data: rpmData.data,
        smooth: true,
        lineStyle: { color: "#3b82f6", width: 3 },
        areaStyle: { color: "#3b82f620" },
        markLine: {
          data: [
            {
              yAxis: telemetry.rpm,
              name: "Текущее",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика скорости
  const getSpeedChartOption = () => ({
    title: {
      text: "Скорость движения",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Скорость: ${Math.round(params[0].value)} км/ч`,
    },
    xAxis: {
      type: "category",
      data: speedData.categories,
      axisLabel: {
        rotate: 45,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "км/ч",
      axisLabel: { formatter: "{value}" },
      min: 0,
      max: 120,
    },
    series: [
      {
        name: "Скорость",
        type: "line",
        data: speedData.data,
        smooth: true,
        lineStyle: { color: "#10b981", width: 3 },
        areaStyle: { color: "#10b98120" },
        markLine: {
          data: [
            {
              yAxis: telemetry.speed,
              name: "Текущая",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика топлива
  const getFuelChartOption = () => ({
    title: {
      text: "Уровень топлива",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Топливо: ${Math.round(params[0].value)}%`,
    },
    xAxis: {
      type: "category",
      data: fuelData.categories,
      axisLabel: {
        rotate: 45,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "%",
      axisLabel: { formatter: "{value}%" },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "Топливо",
        type: "line",
        data: fuelData.data,
        smooth: true,
        lineStyle: { color: "#f59e0b", width: 3 },
        areaStyle: { color: "#f59e0b20" },
        markLine: {
          data: [
            {
              yAxis: telemetry.fuelLevel,
              name: "Текущий",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика давления воздуха
  const getAirPressureChartOption = () => ({
    title: {
      text: "Давление воздуха",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Давление: ${Math.round(params[0].value)} PSI`,
    },
    xAxis: {
      type: "category",
      data: airPressureData.categories,
      axisLabel: { rotate: 45, fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "PSI",
      axisLabel: { formatter: "{value}" },
      min: 70,
      max: 110,
    },
    series: [
      {
        name: "Давление воздуха",
        type: "line",
        data: airPressureData.data,
        smooth: true,
        lineStyle: { color: "#8b5cf6", width: 3 },
        areaStyle: { color: "#8b5cf620" },
        markLine: {
          data: [
            {
              yAxis: telemetry.airPressure,
              name: "Текущее",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика давления масла
  const getOilPressureChartOption = () => ({
    title: {
      text: "Давление масла",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Давление: ${Math.round(params[0].value)} бар`,
    },
    xAxis: {
      type: "category",
      data: oilPressureData.categories,
      axisLabel: { rotate: 45, fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "бар",
      axisLabel: { formatter: "{value}" },
      min: 20,
      max: 80,
    },
    series: [
      {
        name: "Давление масла",
        type: "line",
        data: oilPressureData.data,
        smooth: true,
        lineStyle: { color: "#f59e0b", width: 3 },
        areaStyle: { color: "#f59e0b20" },
        markLine: {
          data: [
            {
              yAxis: telemetry.oilPressure,
              name: "Текущее",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика температуры двигателя
  const getEngineTempChartOption = () => ({
    title: {
      text: "Температура двигателя",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Температура: ${Math.round(params[0].value)}°C`,
    },
    xAxis: {
      type: "category",
      data: engineTempData.categories,
      axisLabel: { rotate: 45, fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "°C",
      axisLabel: { formatter: "{value}°C" },
      min: 60,
      max: 120,
    },
    series: [
      {
        name: "Температура двигателя",
        type: "line",
        data: engineTempData.data,
        smooth: true,
        lineStyle: { color: "#ef4444", width: 3 },
        areaStyle: { color: "#ef444420" },
        markLine: {
          data: [
            {
              yAxis: telemetry.engineTemp,
              name: "Текущая",
              lineStyle: { color: "#dc2626", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика температуры выхлопа
  const getExhaustTempChartOption = () => ({
    title: {
      text: "Температура выхлопных газов",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Температура: ${Math.round(params[0].value)}°C`,
    },
    xAxis: {
      type: "category",
      data: exhaustTempData.categories,
      axisLabel: { rotate: 45, fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "°C",
      axisLabel: { formatter: "{value}°C" },
      min: 250,
      max: 550,
    },
    series: [
      {
        name: "Температура выхлопа",
        type: "line",
        data: exhaustTempData.data,
        smooth: true,
        lineStyle: { color: "#dc2626", width: 3 },
        areaStyle: { color: "#dc262620" },
        markLine: {
          data: [
            {
              yAxis: telemetry.exhaustTemp,
              name: "Текущая",
              lineStyle: { color: "#b91c1c", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  // Конфигурация графика турбонаддува
  const getTurboBoostChartOption = () => ({
    title: {
      text: "Давление турбонаддува",
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) =>
        `${params[0].name}<br/>Наддув: ${Math.round(params[0].value)} PSI`,
    },
    xAxis: {
      type: "category",
      data: turboBoostData.categories,
      axisLabel: { rotate: 45, fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "PSI",
      axisLabel: { formatter: "{value}" },
      min: 5,
      max: 45,
    },
    series: [
      {
        name: "Турбонаддув",
        type: "line",
        data: turboBoostData.data,
        smooth: true,
        lineStyle: { color: "#06b6d4", width: 3 },
        areaStyle: { color: "#06b6d420" },
        markLine: {
          data: [
            {
              yAxis: telemetry.turboBoost,
              name: "Текущее",
              lineStyle: { color: "#0891b2", type: "dashed" },
            },
          ],
        },
      },
    ],
    grid: { left: 80, right: 40, top: 80, bottom: 100 },
  });

  return (
    <div className="space-y-6">
      {/* Графики в сетке 2x4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[600px]">
          <ReactECharts
            option={getRpmChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getSpeedChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getFuelChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getAirPressureChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getOilPressureChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getEngineTempChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getExhaustTempChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className="h-[600px]">
          <ReactECharts
            option={getTurboBoostChartOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
