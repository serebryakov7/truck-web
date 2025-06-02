import Link from "next/link";
import { GalleryVerticalEnd, Truck, Activity, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-blue-600 text-white flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="text-xl font-semibold">Truck Monitor</span>
            </div>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Войти в систему
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Система мониторинга
            <span className="block text-blue-600">автопарка</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Эффективное управление транспортными средствами, диагностика и
            мониторинг в режиме реального времени.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Начать работу
            </Link>
          </div>
        </div>

        {/* Особенности */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Управление автопарком
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Полный контроль над всеми транспортными средствами в одном
                месте.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Диагностика</h3>
              <p className="mt-2 text-base text-gray-500">
                Мониторинг состояния техники и предупреждение о неисправностях.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Аналитика</h3>
              <p className="mt-2 text-base text-gray-500">
                Детальные отчёты и аналитика для принятия решений.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
