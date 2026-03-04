# 開発者・サーバー構築ガイド

このドキュメントでは、Discord Voice Recorder を自分で構築・運用するための手順を説明します。

## 1. Bot の作成と設定

1.  [Discord Developer Portal](https://discord.com/developers/applications) で新しい Application を作成します。
2.  **Privileged Gateway Intents**: 「Bot」タブで以下の 3 つを有効にします。
    - Presence Intent
    - Server Members Intent
    - Message Content Intent
3.  **トークンの取得**: 「Reset Token」からボットのトークンを取得し、`.env` に保存します。

## 2. サーバーの準備 (GCP 推奨)

- **推奨スペック**: e2-micro (2 vCPU, 1GB RAM)
- **OS**: Ubuntu 22.04 LTS 等
- **ディスク**: 30GB (Standard Persistent Disk)
- **ネットワーク**: ファイアウォール設定で `TCP 3000` ポートを許可してください。

## 3. デプロイ手順 (Docker)

```bash
# リポジトリのクローン
git clone https://github.com/suzukigame/discord-recorder.git
cd discord-recorder

# 環境設定
cp .env.example .env
# vi .env 等でトークンを書き換え

# 起動
docker compose up -d --build
```

### 環境変数 (.env)
- `DISCORD_TOKEN_1~3`: 各ボットのトークン。
- `RETENTION_DAYS`: 録音データの保持日数。
- `TZ`: タイムゾーン (Asia/Tokyo)。

## 4. 技術的な詳細
システムの詳細な仕組みについては [ARCHITECTURE.md](./ARCHITECTURE.md) を参照してください。
