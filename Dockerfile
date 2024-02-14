# Stage 1
FROM node:20 AS builder

WORKDIR /app

COPY ./package* ./

RUN npm ci

COPY ./src ./src

COPY ./uploads ./uploads

COPY .swcrc ./

RUN npm run build

# Stage 2
FROM node:20 AS release

WORKDIR /app

COPY ./package* ./

COPY ./uploads ./uploads

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]