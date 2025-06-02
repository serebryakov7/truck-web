"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, User, LogOut, GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [notifications] = useState(5); // Мокированное количество уведомлений

  const handleLogout = () => {
    // Мокированный выход из системы
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <Link
              href="/vehicles"
              className="flex items-center gap-2 font-medium"
            >
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="text-xl font-semibold">Truck Monitor</span>
            </Link>

            {/* Правая часть шапки */}
            <div className="flex items-center gap-4">
              {/* Уведомления */}
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="size-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
              </div>

              {/* Профиль пользователя */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="size-5" />
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium">Администратор</div>
                      <div className="text-xs text-gray-500">
                        admin@company.com
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">Администратор</p>
                    <p className="text-xs text-gray-500">admin@company.com</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="w-full">{children}</main>
    </div>
  );
}
