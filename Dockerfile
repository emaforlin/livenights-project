# slim Nodejs image
FROM node:20-alpine AS base

# install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

 # build the application
RUN npm run build

# production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# switch to non-root user
USER nextjs

EXPOSE 3000
CMD [ "node", "server.js" ]
