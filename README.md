# Discord Voice Recorder (SKY-MAGYCC)

Discord のボイスチャンネルを録音し、ブラウザから簡単に再生・ダウンロードできるボットです。

## 1. Bot をサーバーにインストールする

まずは Discord のボットをサーバーに準備しましょう。

1.  **Bot の作成**: [Discord Developer Portal](https://discord.com/developers/applications) で新しい Application を作成します。
2.  **インテントの設定**: 「Bot」設定タブで `Privileged Gateway Intents` の以下の 3 つを **ON** にします。
    - Member Intent / Presence Intent / Message Content Intent
3.  **サーバーへの招待**: 「OAuth2」->「URL Generator」で以下の権限を選択して URL を作成し、サーバーに招待します。
    - `bot` + `applications.commands`
    - 権限: `Administrator` (または必要な権限)

## 2. 録音する方法

ボットがサーバーにいれば、スラッシュコマンドですぐに録音を開始できます。

- **録音を開始する**: 自分がボイスチャンネルに入った状態で、どこかのテキストチャンネルで以下を打ちます。
  ```text
  /record start
  ```
- **録音を終了する**: 録音を止めたいときは以下を打ちます。
  ```text
  /record stop
  ```
  ※ 録音終了後、ボットが自動で音声を合成して保存します。

## 3. 録音データをダウンロードする

録音したデータは、専用のウェブ画面から確認・ダウンロードできます。

1.  **ウェブ画面を開く**: 管理者から共有された URL（例: `http://35.247.18.47:3000/`）をブラウザで開きます。
2.  **目的のデータを探す**: 録音日時とチャンネル名が表示されたカードが並びます。
3.  **ダウンロード**: 各カードの右側にある「ダウンロード」ボタンを押すと、MP3 ファイルが保存されます。
4.  **整理 (削除)**: 不要になったデータは「削除」ボタンから消去できます。

---

### 管理者向け情報
システム構成やデプロイ方法については [こちら (Architecture Docs)](./docs/ARCHITECTURE.md) をご覧ください。
