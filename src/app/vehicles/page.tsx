"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { VehicleFilters } from "@/components/vehicle-filters";
import { VehicleList } from "@/components/vehicle-list";

export default function VehiclesPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        {/* Боковая панель фильтров */}
        <VehicleFilters
          onFiltersChange={(filters) => {
            console.log("Filters changed:", filters);
          }}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          {/* Заголовок */}
          <div className="bg-white border-b px-6 py-4">
            <h1 className="text-2xl font-semibold">Транспортные средства</h1>
          </div>

          {/* Список транспортных средств */}
          <div className="flex-1 overflow-y-auto">
            <VehicleList className="p-6" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
