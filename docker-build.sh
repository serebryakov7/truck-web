#!/bin/bash

# Скрипт для сборки и запуска Docker контейнера

echo "🚛 Сборка Docker образа для Truck Web..."

# Сборка образа
docker build -t truck-web:latest .

if [ $? -eq 0 ]; then
    echo "✅ Образ успешно собран!"
    
    echo "🚀 Запуск контейнера..."
    
    # Остановка существующего контейнера (если есть)
    docker stop truck-web-container 2>/dev/null
    docker rm truck-web-container 2>/dev/null
    
    # Запуск нового контейнера
    docker run -d \
        --name truck-web-container \
        -p 3000:3000 \
        --restart unless-stopped \
        truck-web:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ Контейнер запущен успешно!"
        echo "🌐 Приложение доступно по адресу: http://localhost:3000"
        echo ""
        echo "Полезные команды:"
        echo "  Просмотр логов: docker logs -f truck-web-container"
        echo "  Остановка:      docker stop truck-web-container"
        echo "  Удаление:       docker rm truck-web-container"
    else
        echo "❌ Ошибка при запуске контейнера"
        exit 1
    fi
else
    echo "❌ Ошибка при сборке образа"
    exit 1
fi
