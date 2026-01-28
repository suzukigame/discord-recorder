# Discord Recorder 開発ログ

## 最終更新日時
2026-01-29 02:54 JST

## プロジェクト概要
Discord のボイスチャンネルで複数のボットを使用して同時録音を行うシステム。
最大3つのボイスチャンネルで同時に録音可能。

## 現在のステータス: ✅ 安定版完成

### 実装済み機能

#### 1. マルチボット録音システム
- **3つのボット**: Bot 1 (Room A), Bot 2 (Room B), Bot 3 (Room C)
- **独立動作**: 各ボットが自身の `voiceAdapterCreator` を使用し、互いに干渉しない
- **自動割り当て**: チャンネル名に基づいて適切なボットを自動選択

#### 2. 録音機能
- **DAVE暗号化対応**: Discord の End-to-End 暗号化音声を正しくデコード
- **複数ユーザー対応**: 同じチャンネル内の複数ユーザーの音声を個別に録音
- **タイムスタンプ記録**: 各ユーザーが話し始めた時間をミリ秒単位で記録
- **MP3エンコード**: Opus → PCM → MP3 の変換パイプライン

#### 3. 音声ミックス機能
- **FFmpeg使用**: 複数ユーザーの音声を1つのMP3ファイルに合成
- **タイミング同期**: 各ユーザーのオフセット時間を考慮して正確に合成
- **自動クリーンアップ**: 合成後に一時ファイルを自動削除

#### 4. 自動切断機能
- **イベントベース**: `voiceStateUpdate` で即座に検知（1秒後に停止）
- **ポーリングベース**: 10秒ごとにチャンネルをチェック（フォールバック）
- **重複防止**: `pendingStops` マップで複数ボットからの重複停止を防止

#### 5. スラッシュコマンド
- `/record start`: 録音開始（誰でも実行可能）
- `/record stop`: 録音停止（誰でも実行可能）

## 技術スタック

### 主要ライブラリ
- `discord.js`: Discord API クライアント
- `@discordjs/voice`: ボイス接続・音声受信
- `@snazzah/davey`: DAVE プロトコル（E2E暗号化）実装
- `prism-media`: Opus デコード・MP3 エンコード
- `ffmpeg-static`: 音声ミックス処理

### 開発環境
- **言語**: TypeScript
- **実行環境**: Docker (Node.js 20)
- **ビルドツール**: tsc (TypeScript Compiler)

## ファイル構成

```
discord-recorder/
├── src/
│   ├── index.ts          # メインエントリーポイント、コマンド処理
│   ├── manager.ts        # BotManager クラス、ボット管理・セッション管理
│   └── recorder.ts       # RecordingSession クラス、録音・ミックス処理
├── data/
│   └── recordings/       # 録音ファイル保存先
├── .env                  # 環境変数（トークン、Guild ID）
├── docker-compose.yml    # Docker 構成
├── Dockerfile            # Docker イメージ定義
└── package.json          # 依存関係
```

## 最新の修正内容（2026-01-29）

### 修正した問題
1. **ボット間の干渉**: 各ボットが独自の `voiceAdapterCreator` を使用するよう修正
2. **録音データ消失**: 重複した `stop` 呼び出しを防止
3. **自動切断の不安定性**: ポーリング機能を追加してイベント漏れに対応
4. **DAVE クラッシュ**: Opus ストリームの手動破棄を削除

### 主要な変更
- `manager.ts`:
  - `pendingStops` マップ追加（重複停止防止）
  - `checkEmptyChannels()` メソッド追加（10秒ごとのポーリング）
  - `startRecording()` で各ボット専用の guild を fetch
  
- `recorder.ts`:
  - `stop()` メソッドの try-catch-finally 強化
  - Opus ストリームの明示的破棄を削除（DAVE クラッシュ回避）
  
- `index.ts`:
  - `/record stop` の即座応答（タイムアウト回避）

## Git コミット情報

**最新コミット**: `cd4d86b`
```
fix: 録音機能の安定化 - 全ボット独立動作・自動切断・重複停止防止を実装
```

**変更ファイル**:
- `src/index.ts` (335 insertions, 51 deletions)
- `src/manager.ts`
- `src/recorder.ts`

## 動作確認済み

### テスト済みシナリオ
✅ Room A で録音開始・停止  
✅ Room B で録音開始・停止  
✅ Room C で録音開始・停止  
✅ 3部屋同時録音  
✅ 全員退出時の自動切断（全部屋）  
✅ 録音ファイルの正常保存  

### 未テスト（複数人が必要）
⚠️ 複数ユーザーの音声ミックス（実装済み、動作するはず）  
⚠️ 他のメンバーによるコマンド実行（実装済み、動作するはず）  

## 既知の問題・制限事項

### 制限事項
1. **最大同時録音数**: 3チャンネル（ボット数による制限）
2. **ファイルサイズ閾値**: 100バイト未満のファイルは削除される
3. **自動切断の遅延**: ポーリング方式の場合、最大10秒の遅延

### 既知の問題
なし（現時点で安定動作中）

## 次回セッションでの作業候補

### 機能拡張案
1. **録音ファイルのアップロード**: Discord チャンネルに自動アップロード
2. **録音時間制限**: 長時間録音の自動停止機能
3. **音声品質設定**: ビットレート・サンプリングレートの設定可能化
4. **Web UI**: 録音状態の可視化・管理画面

### 改善案
1. **ログの整理**: デバッグログの削減・本番用ログレベル設定
2. **エラーハンドリング**: より詳細なエラーメッセージ
3. **テスト追加**: 単体テスト・統合テストの実装
4. **ドキュメント**: README の充実、使い方ガイド

## 環境変数

`.env` ファイルに以下を設定：
```
DISCORD_TOKEN_1=<Bot 1 のトークン>
DISCORD_TOKEN_2=<Bot 2 のトークン>
DISCORD_TOKEN_3=<Bot 3 のトークン>
GUILD_ID=<対象サーバーのID>
```

## 実行コマンド

### 開発
```bash
npm run build        # TypeScript コンパイル
npm start            # ローカル実行
```

### Docker
```bash
docker compose up -d --build    # ビルド＆起動
docker compose down             # 停止
docker logs discord-recorder-recorder-1  # ログ確認
```

## 参考リンク

- Discord.js ドキュメント: https://discord.js.org/
- @discordjs/voice: https://github.com/discordjs/voice
- DAVE プロトコル: https://github.com/discord/dave-protocol

---

**メモ**: 次回セッション開始時は、このファイルを確認して現在の状態を把握してください。
