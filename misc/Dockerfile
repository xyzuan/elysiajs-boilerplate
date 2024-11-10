FROM oven/bun:slim AS build

WORKDIR /app

COPY package.json bun.lockb tsconfig.json ./
RUN \
  if [ -f bun.lockb ]; then bun install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY ./src ./src
COPY ./prisma ./prisma

RUN bunx prisma generate
RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM gcr.io/distroless/cc

WORKDIR /app

COPY --from=build /app/server server
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

CMD ["./server"]
