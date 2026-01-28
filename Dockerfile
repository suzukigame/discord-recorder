FROM node:22-alpine

# FFmpegとビルドに必要なツールをインストール
RUN apk add --no-cache ffmpeg python3 make g++ tzdata

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# TypeScriptのビルド
RUN npm run build || true

# 実行
CMD ["npm", "start"]
