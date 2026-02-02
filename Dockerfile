FROM node:22

# FFmpegとビルドに必要なツールをインストール
RUN apt-get update && apt-get install -y ffmpeg python3 make g++ build-essential

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
