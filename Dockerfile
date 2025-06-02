# Используем официальный образ Node.js 20 Alpine для уменьшения размера
FROM node:24-alpine AS base

# Устанавливаем зависимости для работы с некоторыми пакетами
RUN apk add --no-cache libc6-compat

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Этап установки зависимостей
FROM base AS deps
# Устанавливаем зависимости
RUN npm ci --only=production && npm cache clean --force

# Этап сборки
FROM base AS builder
# Копируем зависимости из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
# Копируем исходный код
COPY . .

# Устанавливаем переменную окружения для production сборки
ENV NEXT_TELEMETRY_DISABLED 1

# Собираем приложение
RUN npm run build

# Этап production
FROM base AS runner
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Устанавливаем правильные разрешения
RUN chown -R nextjs:nodejs /app

# Переключаемся на пользователя nextjs
USER nextjs

# Открываем порт 3000
EXPOSE 3000

# Устанавливаем переменные окружения
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Запускаем приложение
CMD ["node", "server.js"]
