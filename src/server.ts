import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const RECORDINGS_DIR = path.join(__dirname, '..', 'data', 'recordings');

export class WebServer {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware() {
        this.app.use(express.json());
        const publicPath = path.join(__dirname, '..', 'public');
        if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath, { recursive: true });
        }
        this.app.use(express.static(publicPath));
    }

    private setupRoutes() {
        this.app.get('/api/recordings', (_req: express.Request, res: express.Response) => {
            try {
                if (!fs.existsSync(RECORDINGS_DIR)) {
                    return res.json([]);
                }
                const sessions = fs.readdirSync(RECORDINGS_DIR);
                const allFiles: any[] = [];

                for (const session of sessions) {
                    const sessionPath = path.join(RECORDINGS_DIR, session);
                    if (fs.statSync(sessionPath).isDirectory()) {
                        const files = fs.readdirSync(sessionPath)
                            .filter(f => f.endsWith('.mp3'))
                            .map(file => {
                                const stats = fs.statSync(path.join(sessionPath, file));
                                return {
                                    sessionId: session,
                                    filename: file,
                                    size: stats.size,
                                    createdAt: stats.birthtime,
                                    url: `/api/download/${session}/${file}`
                                };
                            });
                        allFiles.push(...files);
                    }
                }

                allFiles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                res.json(allFiles);
            } catch (error) {
                console.error('Error fetching recordings:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        this.app.get('/api/download/:sessionId/:filename', (req: express.Request, res: express.Response) => {
            const { sessionId, filename } = req.params;
            if (!sessionId || !filename) {
                res.status(400).send('Invalid parameters');
                return;
            }
            const filePath = path.join(RECORDINGS_DIR, sessionId as string, filename as string);
            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.status(404).send('File not found');
            }
        });

        this.app.delete('/api/recordings/:sessionId/:filename', (req: express.Request, res: express.Response) => {
            const { sessionId, filename } = req.params;
            if (!sessionId || !filename) {
                res.status(400).send('Invalid parameters');
                return;
            }

            const sessionPath = path.join(RECORDINGS_DIR, sessionId as string);
            const filePath = path.join(sessionPath, filename as string);

            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`[WebServer] Deleted file: ${filePath}`);

                    // フォルダが空になったらフォルダも削除
                    if (fs.readdirSync(sessionPath).length === 0) {
                        fs.rmdirSync(sessionPath);
                        console.log(`[WebServer] Deleted empty session directory: ${sessionPath}`);
                    }

                    res.json({ message: 'Deleted successfully' });
                } else {
                    res.status(404).json({ error: 'File not found' });
                }
            } catch (error) {
                console.error('[WebServer] Deletion error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }

    public start() {
        this.app.listen(PORT, '0.0.0.0', () => {
            console.log(`[WebServer] Server is running on http://0.0.0.0:${PORT}`);
        });
    }
}
