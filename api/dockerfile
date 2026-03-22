# ---------- STAGE 1: build ----------
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bun run build


# ---------- STAGE 2: produção ----------
FROM oven/bun:1-slim AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["bun", "dist/index.js"]