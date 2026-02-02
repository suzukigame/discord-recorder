recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for まるはち: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for ちゃーこ: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for きさらぎ_どーじ: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 5 files into /app/data/recordings/Room A_202601292106_full.mp3
recorder-1  | [RecordingSession] Mixing failed: Error: Command failed: "/app/node_modules/ffmpeg-static/ffmpeg" -i "/app/data/recordings/Room A_202601292106/suzuki_504987225168019456.mp3" -i "/app/data/recordings/Room A_202601292106/せる(CELL)_500667861925101578.mp3" -i "/app/data/recordings/Room A_202601292106/ちゃーこ_499227749508972552.mp3" -i "/app/data/recordings/Room A_202601292106/まるはち_480772165189369877.mp3" -i "/app/data/recordings/Room A_202601292106/きさらぎ_どーじ_556089520425009163.mp3" -filter_complex "[0:a]adelay=267|267[a0]; [1:a]adelay=1299|1299[a1]; [2:a]adelay=283|283[a2]; [3:a]adelay=6492|6492[a3]; [4:a]adelay=-341|-341[a4]; [a0][a1][a2][a3][a4]amix=inputs=5:duration=longest:dropout_transition=0,volume=5[out]" -map "[out]" -acodec libmp3lame -b:a 128k -y "/app/data/recordings/Room A_202601292106_full.mp3"
recorder-1  | ffmpeg version 7.0.2-static https://johnvansickle.com/ffmpeg/  Copyright (c) 2000-2024 the FFmpeg developers
recorder-1  |   built with gcc 8 (Debian 8.3.0-6)
recorder-1  |   configuration: --enable-gpl --enable-version3 --enable-static --disable-debug --disable-ffplay --disable-indev=sndio --disable-outdev=sndio --cc=gcc --enable-fontconfig --enable-frei0r --enable-gnutls --enable-gmp --enable-libgme --enable-gray --enable-libaom --enable-libfribidi --enable-libass --enable-libvmaf --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librubberband --enable-libsoxr --enable-libspeex --enable-libsrt --enable-libvorbis --enable-libopus --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libdav1d --enable-libxvid --enable-libzvbi --enable-libzimg
recorder-1  |   libavutil      59.  8.100 / 59.  8.100
recorder-1  | [BotManager] Bot 1 released from channel 1466018670219231256
recorder-1  |   libavcodec     61.  3.100 / 61.  3.100
recorder-1  |   libavformat    61.  1.100 / 61.  1.100
recorder-1  |   libavdevice    61.  1.100 / 61.  1.100
recorder-1  |   libavfilter    10.  1.100 / 10.  1.100
recorder-1  |   libswscale      8.  1.100 /  8.  1.100
recorder-1  |   libswresample   5.  1.100 /  5.  1.100
recorder-1  |   libpostproc    58.  1.100 / 58.  1.100
recorder-1  | [mp3 @ 0x1a233380] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #0, mp3, from '/app/data/recordings/Room A_202601292106/suzuki_504987225168019456.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:03:15.67, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #0:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x1a2342c0] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #1, mp3, from '/app/data/recordings/Room A_202601292106/せる(CELL)_500667861925101578.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:02:14.33, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #1:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x1a245640] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #2, mp3, from '/app/data/recordings/Room A_202601292106/ちゃーこ_499227749508972552.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:04:19.08, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #2:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x1a264100] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #3, mp3, from '/app/data/recordings/Room A_202601292106/まるはち_480772165189369877.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:01:54.26, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #3:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x1a283040] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #4, mp3, from '/app/data/recordings/Room A_202601292106/きさらぎ_どーじ_556089520425009163.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:04:57.48, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #4:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | Stream mapping:
recorder-1  |   Stream #0:0 (mp3float) -> adelay:default
recorder-1  |   Stream #1:0 (mp3float) -> adelay:default
recorder-1  |   Stream #2:0 (mp3float) -> adelay:default
recorder-1  |   Stream #3:0 (mp3float) -> adelay:default
recorder-1  |   Stream #4:0 (mp3float) -> adelay:default
recorder-1  |   volume:default -> Stream #0:0 (libmp3lame)
recorder-1  | Press [q] to stop, [?] for help
recorder-1  | [Parsed_adelay_4 @ 0x7d75a8009980] Delay must be non negative number.
recorder-1  | [Parsed_adelay_4 @ 0x7d75a8009980] Failed to configure input pad on Parsed_adelay_4
recorder-1  | [fc#0 @ 0x1a228d00] Error reinitializing filters!
recorder-1  | [fc#0 @ 0x1a228d00] Task finished with error code: -22 (Invalid argument)
recorder-1  | [fc#0 @ 0x1a228d00] Terminating thread with return code -22 (Invalid argument)
recorder-1  | [aost#0:0/libmp3lame @ 0x1a2c1440] Could not open encoder before EOF
recorder-1  | [aost#0:0/libmp3lame @ 0x1a2c1440] Task finished with error code: -22 (Invalid argument)
recorder-1  | [aost#0:0/libmp3lame @ 0x1a2c1440] Terminating thread with return code -22 (Invalid argument)
recorder-1  | [out#0/mp3 @ 0x1a283a00] Nothing was written into output file, because at least one of its streams received no packets.
recorder-1  | size=       0KiB time=N/A bitrate=N/A speed=N/A
recorder-1  | Conversion failed!
recorder-1  |
recorder-1  |     at genericNodeError (node:internal/errors:983:15)
recorder-1  |     at wrappedFn (node:internal/errors:537:14)
recorder-1  |     at ChildProcess.exithandler (node:child_process:417:12)
recorder-1  |     at ChildProcess.emit (node:events:519:28)
recorder-1  |     at ChildProcess.emit (node:domain:489:12)
recorder-1  |     at maybeClose (node:internal/child_process:1101:16)
recorder-1  |     at Process.ChildProcess._handle.onexit (node:internal/child_process:304:5) {
recorder-1  |   code: 234,
recorder-1  |   killed: false,
recorder-1  |   signal: null,
recorder-1  |   cmd: '"/app/node_modules/ffmpeg-static/ffmpeg" -i "/app/data/recordings/Room A_202601292106/suzuki_504987225168019456.mp3" -i "/app/data/recordings/Room A_202601292106/せる(CELL)_500667861925101578.mp3" -i "/app/data/recordings/Room A_202601292106/ちゃーこ_499227749508972552.mp3" -i "/app/data/recordings/Room A_202601292106/まるはち_480772165189369877.mp3" -i "/app/data/recordings/Room A_202601292106/きさらぎ_どーじ_556089520425009163.mp3" -filter_complex "[0:a]adelay=267|267[a0]; [1:a]adelay=1299|1299[a1]; [2:a]adelay=283|283[a2]; [3:a]adelay=6492|6492[a3]; [4:a]adelay=-341|-341[a4]; [a0][a1][a2][a3][a4]amix=inputs=5:duration=longest:dropout_transition=0,volume=5[out]" -map "[out]" -acodec libmp3lame -b:a 128k -y "/app/data/recordings/Room A_202601292106_full.mp3"',
recorder-1  |   stdout: '',
recorder-1  |   stderr: 'ffmpeg version 7.0.2-static https://johnvansickle.com/ffmpeg/  Copyright (c) 2000-2024 the FFmpeg developers\n' +
recorder-1  |     '  built with gcc 8 (Debian 8.3.0-6)\n' +
recorder-1  |     '  configuration: --enable-gpl --enable-version3 --enable-static --disable-debug --disable-ffplay --disable-indev=sndio --disable-outdev=sndio --cc=gcc --enable-fontconfig --enable-frei0r --enable-gnutls --enable-gmp --enable-libgme --enable-gray --enable-libaom --enable-libfribidi --enable-libass --enable-libvmaf --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librubberband --enable-libsoxr --enable-libspeex --enable-libsrt --enable-libvorbis --enable-libopus --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libdav1d --enable-libxvid --enable-libzvbi --enable-libzimg\n' +
recorder-1  |     '  libavutil      59.  8.100 / 59.  8.100\n' +
recorder-1  |     '  libavcodec     61.  3.100 / 61.  3.100\n' +
recorder-1  |     '  libavformat    61.  1.100 / 61.  1.100\n' +
recorder-1  |     '  libavdevice    61.  1.100 / 61.  1.100\n' +
recorder-1  |     '  libavfilter    10.  1.100 / 10.  1.100\n' +
recorder-1  |     '  libswscale      8.  1.100 /  8.  1.100\n' +
recorder-1  |     '  libswresample   5.  1.100 /  5.  1.100\n' +
recorder-1  |     '  libpostproc    58.  1.100 / 58.  1.100\n' +
recorder-1  |     '[mp3 @ 0x1a233380] Estimating duration from bitrate, this may be inaccurate\n' +
recorder-1  |     "Input #0, mp3, from '/app/data/recordings/Room A_202601292106/suzuki_504987225168019456.mp3':\n" +
recorder-1  |     '  Metadata:\n' +
recorder-1  |     '    encoder         : Lavf61.1.100\n' +
recorder-1  |     '  Duration: 00:03:15.67, start: 0.000000, bitrate: 128 kb/s\n' +
recorder-1  |     '  Stream #0:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s\n' +
recorder-1  |     '[mp3 @ 0x1a2342c0] Estimating duration from bitrate, this may be inaccurate\n' +
recorder-1  |     "Input #1, mp3, from '/app/data/recordings/Room A_202601292106/せる(CELL)_500667861925101578.mp3':\n" +
recorder-1  |     '  Metadata:\n' +
recorder-1  |     '    encoder         : Lavf61.1.100\n' +
recorder-1  |     '  Duration: 00:02:14.33, start: 0.000000, bitrate: 128 kb/s\n' +
recorder-1  |     '  Stream #1:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s\n' +
recorder-1  |     '[mp3 @ 0x1a245640] Estimating duration from bitrate, this may be inaccurate\n' +
recorder-1  |     "Input #2, mp3, from '/app/data/recordings/Room A_202601292106/ちゃーこ_499227749508972552.mp3':\n" +
recorder-1  |     '  Metadata:\n' +
recorder-1  |     '    encoder         : Lavf61.1.100\n' +
recorder-1  |     '  Duration: 00:04:19.08, start: 0.000000, bitrate: 128 kb/s\n' +
recorder-1  |     '  Stream #2:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s\n' +
recorder-1  |     '[mp3 @ 0x1a264100] Estimating duration from bitrate, this may be inaccurate\n' +
recorder-1  |     "Input #3, mp3, from '/app/data/recordings/Room A_202601292106/まるはち_480772165189369877.mp3':\n" +
recorder-1  |     '  Metadata:\n' +
recorder-1  |     '    encoder         : Lavf61.1.100\n' +
recorder-1  |     '  Duration: 00:01:54.26, start: 0.000000, bitrate: 128 kb/s\n' +
recorder-1  |     '  Stream #3:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s\n' +
recorder-1  |     '[mp3 @ 0x1a283040] Estimating duration from bitrate, this may be inaccurate\n' +
recorder-1  |     "Input #4, mp3, from '/app/data/recordings/Room A_202601292106/きさらぎ_どーじ_556089520425009163.mp3':\n" +
recorder-1  |     '  Metadata:\n' +
recorder-1  |     '    encoder         : Lavf61.1.100\n' +
recorder-1  |     '  Duration: 00:04:57.48, start: 0.000000, bitrate: 128 kb/s\n' +
recorder-1  |     '  Stream #4:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s\n' +
recorder-1  |     'Stream mapping:\n' +
recorder-1  |     '  Stream #0:0 (mp3float) -> adelay:default\n' +
recorder-1  |     '  Stream #1:0 (mp3float) -> adelay:default\n' +
recorder-1  |     '  Stream #2:0 (mp3float) -> adelay:default\n' +
recorder-1  |     '  Stream #3:0 (mp3float) -> adelay:default\n' +
recorder-1  |     '  Stream #4:0 (mp3float) -> adelay:default\n' +
recorder-1  |     '  volume:default -> Stream #0:0 (libmp3lame)\n' +
recorder-1  |     'Press [q] to stop, [?] for help\n' +
recorder-1  |     '[Parsed_adelay_4 @ 0x7d75a8009980] Delay must be non negative number.\n' +
recorder-1  |     '[Parsed_adelay_4 @ 0x7d75a8009980] Failed to configure input pad on Parsed_adelay_4\n' +
recorder-1  |     '[fc#0 @ 0x1a228d00] Error reinitializing filters!\n' +
recorder-1  |     '[fc#0 @ 0x1a228d00] Task finished with error code: -22 (Invalid argument)\n' +
recorder-1  |     '[fc#0 @ 0x1a228d00] Terminating thread with return code -22 (Invalid argument)\n' +
recorder-1  |     '[aost#0:0/libmp3lame @ 0x1a2c1440] Could not open encoder before EOF\n' +
recorder-1  |     '[aost#0:0/libmp3lame @ 0x1a2c1440] Task finished with error code: -22 (Invalid argument)\n' +
recorder-1  |     '[aost#0:0/libmp3lame @ 0x1a2c1440] Terminating thread with return code -22 (Invalid argument)\n' +
recorder-1  |     '[out#0/mp3 @ 0x1a283a00] Nothing was written into output file, because at least one of its streams received no packets.\n' +
recorder-1  |     'size=       0KiB time=N/A bitrate=N/A speed=N/A    \n' +
recorder-1  |     'Conversion failed!\n'
recorder-1  | }
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393
recorder-1  |                   return buffer;
recorder-1  |           ^
recorder-1  | Error: Failed to decrypt: DecryptionFailed(UnencryptedWhenPassthroughDisabled)
recorder-1  |     at DAVESession.decrypt (file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393:11)
recorder-1  |     at VoiceReceiver.parsePacket (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:157:10)
recorder-1  |     at VoiceReceiver.onUdpMessage (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:182:11)
recorder-1  |     at VoiceUDPSocket.emit (node:events:519:28)
recorder-1  |     at VoiceUDPSocket.emit (node:domain:489:12)
recorder-1  |     at VoiceUDPSocket.onMessage (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:112:2)
recorder-1  |     at Socket.<anonymous> (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:98:17)
recorder-1  |     at Socket.emit (node:events:519:28)
recorder-1  |     at Socket.emit (node:domain:489:12)
recorder-1  |     at UDP.onMessage (node:dgram:990:8) {
recorder-1  |   code: 'GenericFailure'
recorder-1  | }
recorder-1  |
recorder-1  | > discord-recorder@1.0.0 start
recorder-1  | > ts-node src/index.ts
recorder-1  |
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
recorder-1  | Voice Recorder Manager is starting...
recorder-1  | Bot 3 logged in as RecordBot-3#3902
recorder-1  | Bot 2 logged in as RecordBot-2#6452
recorder-1  | Main Bot logged in as RecordBot-1#6247
recorder-1  | Started refreshing application (/) commands.
recorder-1  | Bot 1 logged in as RecordBot-1#6247
recorder-1  | (node:18) DeprecationWarning: The ready event has been renamed to clientReady to distinguish it from the gateway READY event and will only emit under that name in v15. Please use clientReady instead.
recorder-1  | (Use `node --trace-deprecation ...` to show where the warning was created)
recorder-1  | Successfully reloaded application (/) commands for guild 1466018667924815964.
recorder-1  | [BotManager] No session found for channel 1466048050148409364, already stopped
recorder-1  | [RecordingSession] Starting recording in channel 1466018670219231256 (Room A)
recorder-1  | [RecordingSession] Pre-subscribing to member: _octco_
recorder-1  | [RecordingSession] Setting up listener for user 480772165189369877
recorder-1  | [RecordingSession] Pre-subscribing to member: cha70ko
recorder-1  | [RecordingSession] Setting up listener for user 499227749508972552
recorder-1  | [RecordingSession] Pre-subscribing to member: ce_ll_dai_ki_ba_ku
recorder-1  | [RecordingSession] Setting up listener for user 500667861925101578
recorder-1  | [RecordingSession] Pre-subscribing to member: ya_mo_ri
recorder-1  | [RecordingSession] Setting up listener for user 502483114648403969
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Pre-subscribing to member: kisaragi_douzi
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] User 499227749508972552 speaking event triggered
recorder-1  | [RecordingSession] User 502483114648403969 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for ちゃーこ at offset 288ms. Creating file: ちゃーこ_499227749508972552.mp3
recorder-1  | [RecordingSession] Audio received for suzuki at offset 301ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] Audio received for やもり at offset 345ms. Creating file: やもり_502483114648403969.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 1260ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] Audio received for せる(CELL) at offset 1475ms. Creating file: せる(CELL)_500667861925101578.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for せる(CELL): Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for ちゃーこ: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for やもり: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for きさらぎ_どーじ: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 5 files into /app/data/recordings/Room A_202601292131_full.mp3
recorder-1  | [RecordingSession] Mixing complete: /app/data/recordings/Room A_202601292131_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room A_202601292131
recorder-1  | [BotManager] Bot 1 released from channel 1466018670219231256
recorder-1  | [RecordingSession] Starting recording in channel 1466018670219231256 (Room A)
recorder-1  | [RecordingSession] Pre-subscribing to member: _octco_
recorder-1  | [RecordingSession] Setting up listener for user 480772165189369877
recorder-1  | [RecordingSession] Pre-subscribing to member: cha70ko
recorder-1  | [RecordingSession] Setting up listener for user 499227749508972552
recorder-1  | [RecordingSession] Pre-subscribing to member: ce_ll_dai_ki_ba_ku
recorder-1  | [RecordingSession] Setting up listener for user 500667861925101578
recorder-1  | [RecordingSession] Pre-subscribing to member: ya_mo_ri
recorder-1  | [RecordingSession] Setting up listener for user 502483114648403969
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Pre-subscribing to member: kisaragi_douzi
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 15ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 502483114648403969 speaking event triggered
recorder-1  | [RecordingSession] Audio received for やもり at offset 18ms. Creating file: やもり_502483114648403969.mp3
recorder-1  | [RecordingSession] User 499227749508972552 speaking event triggered
recorder-1  | [RecordingSession] Audio received for ちゃーこ at offset 19ms. Creating file: ちゃーこ_499227749508972552.mp3
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] Audio received for せる(CELL) at offset 20ms. Creating file: せる(CELL)_500667861925101578.mp3
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] Error in pipeline for やもり: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] Error in pipeline for ちゃーこ: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Audio received for suzuki at offset 1614ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 6
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 5820ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset -1359ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 1
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 1
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] No valid audio files to mix.
recorder-1  | [BotManager] Bot 2 released from channel 1466048050148409364
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] Starting recording in channel 1466060882437079205 (Room C)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 140ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393
recorder-1  |                   return buffer;
recorder-1  |           ^
recorder-1  | Error: Failed to decrypt: DecryptionFailed(UnencryptedWhenPassthroughDisabled)
recorder-1  |     at DAVESession.decrypt (file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393:11)
recorder-1  |     at VoiceReceiver.parsePacket (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:157:10)
recorder-1  |     at VoiceReceiver.onUdpMessage (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:182:11)
recorder-1  |     at VoiceUDPSocket.emit (node:events:519:28)
recorder-1  |     at VoiceUDPSocket.emit (node:domain:489:12)
recorder-1  |     at VoiceUDPSocket.onMessage (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:112:2)
recorder-1  |     at Socket.<anonymous> (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:98:17)
recorder-1  |     at Socket.emit (node:events:519:28)
recorder-1  |     at Socket.emit (node:domain:489:12)
recorder-1  |     at UDP.onMessage (node:dgram:990:8) {
recorder-1  |   code: 'GenericFailure'
recorder-1  | }
recorder-1  |
recorder-1  | > discord-recorder@1.0.0 start
recorder-1  | > ts-node src/index.ts
recorder-1  |
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  override existing env vars with { override: true }
recorder-1  | Voice Recorder Manager is starting...
recorder-1  | Bot 2 logged in as RecordBot-2#6452
recorder-1  | Main Bot logged in as RecordBot-1#6247
recorder-1  | Started refreshing application (/) commands.
recorder-1  | Bot 1 logged in as RecordBot-1#6247
recorder-1  | (node:18) DeprecationWarning: The ready event has been renamed to clientReady to distinguish it from the gateway READY event and will only emit under that name in v15. Please use clientReady instead.
recorder-1  | (Use `node --trace-deprecation ...` to show where the warning was created)
recorder-1  | Bot 3 logged in as RecordBot-3#3902
recorder-1  | Successfully reloaded application (/) commands for guild 1466018667924815964.
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 32ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 1
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room B, skipping duplicate
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 1 files into /app/data/recordings/Room B_202601292135_full.mp3
recorder-1  | [RecordingSession] Single file moved to /app/data/recordings/Room B_202601292135_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room B_202601292135
recorder-1  | [BotManager] Bot 2 released from channel 1466048050148409364
recorder-1  | [RecordingSession] Starting recording in channel 1466018670219231256 (Room A)
recorder-1  | [RecordingSession] Pre-subscribing to member: _octco_
recorder-1  | [RecordingSession] Setting up listener for user 480772165189369877
recorder-1  | [RecordingSession] Pre-subscribing to member: cha70ko
recorder-1  | [RecordingSession] Setting up listener for user 499227749508972552
recorder-1  | [RecordingSession] Pre-subscribing to member: ce_ll_dai_ki_ba_ku
recorder-1  | [RecordingSession] Setting up listener for user 500667861925101578
recorder-1  | [RecordingSession] Pre-subscribing to member: ya_mo_ri
recorder-1  | [RecordingSession] Setting up listener for user 502483114648403969
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Pre-subscribing to member: kisaragi_douzi
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] User 499227749508972552 speaking event triggered
recorder-1  | [RecordingSession] Audio received for ちゃーこ at offset 18ms. Creating file: ちゃーこ_499227749508972552.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 22ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] Error in pipeline for ちゃーこ: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Audio received for suzuki at offset 1299ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 1400ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 6
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 267ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393
recorder-1  |                   return buffer;
recorder-1  |           ^
recorder-1  | Error: Failed to decrypt: DecryptionFailed(UnencryptedWhenPassthroughDisabled)
recorder-1  |     at DAVESession.decrypt (file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393:11)
recorder-1  |     at VoiceReceiver.parsePacket (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:157:10)
recorder-1  |     at VoiceReceiver.onUdpMessage (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:182:11)
recorder-1  |     at VoiceUDPSocket.emit (node:events:519:28)
recorder-1  |     at VoiceUDPSocket.emit (node:domain:489:12)
recorder-1  |     at VoiceUDPSocket.onMessage (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:112:2)
recorder-1  |     at Socket.<anonymous> (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:98:17)
recorder-1  |     at Socket.emit (node:events:519:28)
recorder-1  |     at Socket.emit (node:domain:489:12)
recorder-1  |     at UDP.onMessage (node:dgram:990:8) {
recorder-1  |   code: 'GenericFailure'
recorder-1  | }
recorder-1  |
recorder-1  | > discord-recorder@1.0.0 start
recorder-1  | > ts-node src/index.ts
recorder-1  |
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
recorder-1  | Voice Recorder Manager is starting...
recorder-1  | Bot 2 logged in as RecordBot-2#6452
recorder-1  | Bot 3 logged in as RecordBot-3#3902
recorder-1  | Main Bot logged in as RecordBot-1#6247
recorder-1  | Started refreshing application (/) commands.
recorder-1  | Bot 1 logged in as RecordBot-1#6247
recorder-1  | (node:18) DeprecationWarning: The ready event has been renamed to clientReady to distinguish it from the gateway READY event and will only emit under that name in v15. Please use clientReady instead.
recorder-1  | (Use `node --trace-deprecation ...` to show where the warning was created)
recorder-1  | Successfully reloaded application (/) commands for guild 1466018667924815964.
recorder-1  | [RecordingSession] Starting recording in channel 1466060882437079205 (Room C)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 76ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 1 files into /app/data/recordings/Room C_202601292143_full.mp3
recorder-1  | [RecordingSession] Single file moved to /app/data/recordings/Room C_202601292143_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room C_202601292143
recorder-1  | [BotManager] Bot 3 released from channel 1466060882437079205
recorder-1  | [RecordingSession] Starting recording in channel 1466018670219231256 (Room A)
recorder-1  | [RecordingSession] Pre-subscribing to member: _octco_
recorder-1  | [RecordingSession] Setting up listener for user 480772165189369877
recorder-1  | [RecordingSession] Pre-subscribing to member: cha70ko
recorder-1  | [RecordingSession] Setting up listener for user 499227749508972552
recorder-1  | [RecordingSession] Pre-subscribing to member: ce_ll_dai_ki_ba_ku
recorder-1  | [RecordingSession] Setting up listener for user 500667861925101578
recorder-1  | [RecordingSession] Pre-subscribing to member: ya_mo_ri
recorder-1  | [RecordingSession] Setting up listener for user 502483114648403969
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Pre-subscribing to member: kisaragi_douzi
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] User 499227749508972552 speaking event triggered
recorder-1  | [RecordingSession] Audio received for ちゃーこ at offset 20ms. Creating file: ちゃーこ_499227749508972552.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 24ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 25ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] User 502483114648403969 speaking event triggered
recorder-1  | [RecordingSession] Audio received for やもり at offset 26ms. Creating file: やもり_502483114648403969.mp3
recorder-1  | [RecordingSession] Error in pipeline for ちゃーこ: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] Error in pipeline for きさらぎ_どーじ: Error: Decode error: Invalid packet
recorder-1  |     at OpusScript.decode (/app/node_modules/opusscript/index.js:82:15)
recorder-1  |     at Decoder._decode (/app/node_modules/prism-media/src/opus/Opus.js:64:25)
recorder-1  |     at Decoder._transform (/app/node_modules/prism-media/src/opus/Opus.js:204:22)
recorder-1  |     at Decoder.Transform._write (node:internal/streams/transform:171:8)
recorder-1  |     at writeOrBuffer (node:internal/streams/writable:572:12)
recorder-1  |     at _write (node:internal/streams/writable:501:10)
recorder-1  |     at Decoder.Writable.write (node:internal/streams/writable:510:10)
recorder-1  |     at PassThrough.ondata (node:internal/streams/readable:1009:22)
recorder-1  |     at PassThrough.emit (node:events:519:28)
recorder-1  |     at PassThrough.emit (node:domain:489:12)
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Audio received for suzuki at offset 1919ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 6829ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] Audio received for せる(CELL) at offset 13277ms. Creating file: せる(CELL)_500667861925101578.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 6
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 6
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 6
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 16ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [RecordingSession] User 500667861925101578 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room B, skipping duplicate
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room B, skipping duplicate
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [AutoStop Polling] Detected empty channel Room B, stopping...
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error destroying connection: Error: Cannot destroy VoiceConnection - it has already been destroyed
recorder-1  |     at VoiceConnection.destroy (file:///app/node_modules/@discordjs/voice/src/VoiceConnection.ts:585:7)
recorder-1  |     at RecordingSession.stop (file:///app/src/recorder.ts:174:33)
recorder-1  |     at BotManager.stopRecording (file:///app/src/manager.ts:211:27)
recorder-1  |     at Timeout._onTimeout (file:///app/src/manager.ts:107:34)
recorder-1  |     at listOnTimeout (node:internal/timers:588:17)
recorder-1  |     at processTimers (node:internal/timers:523:7)
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Mixing 1 files into /app/data/recordings/Room B_202601292149_full.mp3
recorder-1  | [RecordingSession] Single file moved to /app/data/recordings/Room B_202601292149_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room B_202601292149
recorder-1  | [BotManager] Bot 2 released from channel 1466048050148409364
recorder-1  | [RecordingSession] No valid audio files to mix.
recorder-1  | [BotManager] Bot 2 released from channel 1466048050148409364
recorder-1  | [RecordingSession] Starting recording in channel 1466060882437079205 (Room C)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 30ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393
recorder-1  |                   return buffer;
recorder-1  |           ^
recorder-1  | Error: Failed to decrypt: DecryptionFailed(UnencryptedWhenPassthroughDisabled)
recorder-1  |     at DAVESession.decrypt (file:///app/node_modules/@discordjs/voice/src/networking/DAVESession.ts:393:11)
recorder-1  |     at VoiceReceiver.parsePacket (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:157:10)
recorder-1  |     at VoiceReceiver.onUdpMessage (file:///app/node_modules/@discordjs/voice/src/receive/VoiceReceiver.ts:182:11)
recorder-1  |     at VoiceUDPSocket.emit (node:events:519:28)
recorder-1  |     at VoiceUDPSocket.emit (node:domain:489:12)
recorder-1  |     at VoiceUDPSocket.onMessage (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:112:2)
recorder-1  |     at Socket.<anonymous> (file:///app/node_modules/@discordjs/voice/src/networking/VoiceUDPSocket.ts:98:17)
recorder-1  |     at Socket.emit (node:events:519:28)
recorder-1  |     at Socket.emit (node:domain:489:12)
recorder-1  |     at UDP.onMessage (node:dgram:990:8) {
recorder-1  |   code: 'GenericFailure'
recorder-1  | }
recorder-1 exited with code 0
recorder-1  | 
recorder-1  | > discord-recorder@1.0.0 start
recorder-1  | > ts-node src/index.ts
recorder-1  |
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
recorder-1  | Voice Recorder Manager is starting...
recorder-1  | Bot 3 logged in as RecordBot-3#3902
recorder-1  | Main Bot logged in as RecordBot-1#6247
recorder-1  | Started refreshing application (/) commands.
recorder-1  | Bot 1 logged in as RecordBot-1#6247
recorder-1  | (node:18) DeprecationWarning: The ready event has been renamed to clientReady to distinguish it from the gateway READY event and will only emit under that name in v15. Please use clientReady instead.
recorder-1  | (Use `node --trace-deprecation ...` to show where the warning was created)
recorder-1  | Bot 2 logged in as RecordBot-2#6452
recorder-1  | Successfully reloaded application (/) commands for guild 1466018667924815964.
recorder-1  | npm error path /app
recorder-1  | npm error command failed
recorder-1  | npm error signal SIGTERM
recorder-1  | npm error command sh -c ts-node src/index.ts
recorder-1  | npm error A complete log of this run can be found in: /root/.npm/_logs/2026-01-29T12_50_03_140Z-debug-0.log
recorder-1 exited with code 1
recorder-1 has been recreated
recorder-1  | 
recorder-1  | > discord-recorder@1.0.0 start
recorder-1  | > ts-node src/index.ts
recorder-1  |
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
recorder-1  | [dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
recorder-1  | Voice Recorder Manager is starting...
recorder-1  | Bot 2 logged in as RecordBot-2#6452
recorder-1  | Main Bot logged in as RecordBot-1#6247
recorder-1  | Started refreshing application (/) commands.
recorder-1  | Bot 1 logged in as RecordBot-1#6247
recorder-1  | (node:18) DeprecationWarning: The ready event has been renamed to clientReady to distinguish it from the gateway READY event and will only emit under that name in v15. Please use clientReady instead.
recorder-1  | (Use `node --trace-deprecation ...` to show where the warning was created)
recorder-1  | Bot 3 logged in as RecordBot-3#3902
recorder-1  | Successfully reloaded application (/) commands for guild 1466018667924815964.
recorder-1  | [RecordingSession] Starting recording in channel 1466018670219231256 (Room A)
recorder-1  | [RecordingSession] Pre-subscribing to member: _octco_
recorder-1  | [RecordingSession] Setting up listener for user 480772165189369877
recorder-1  | [RecordingSession] Pre-subscribing to member: cha70ko
recorder-1  | [RecordingSession] Setting up listener for user 499227749508972552
recorder-1  | [RecordingSession] Pre-subscribing to member: ce_ll_dai_ki_ba_ku
recorder-1  | [RecordingSession] Setting up listener for user 500667861925101578
recorder-1  | [RecordingSession] Pre-subscribing to member: ya_mo_ri
recorder-1  | [RecordingSession] Setting up listener for user 502483114648403969
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] Pre-subscribing to member: kisaragi_douzi
recorder-1  | [RecordingSession] Setting up listener for user 556089520425009163
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 65ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 502483114648403969 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for きさらぎ_どーじ at offset 588ms. Creating file: きさらぎ_どーじ_556089520425009163.mp3
recorder-1  | [RecordingSession] Audio received for やもり at offset 620ms. Creating file: やもり_502483114648403969.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [AutoStop Debug] User left Room A (1466018670219231256). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room A, Human count: 5
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Starting recording in channel 1466048050148409364 (Room B)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 242ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room B, skipping duplicate
recorder-1  | [AutoStop Debug] User left Room B (1466048050148409364). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room B, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room B. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room B, skipping duplicate
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Mixing 1 files into /app/data/recordings/Room B_202601292156_full.mp3
recorder-1  | [RecordingSession] Single file moved to /app/data/recordings/Room B_202601292156_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room B_202601292156
recorder-1  | [BotManager] Bot 2 released from channel 1466048050148409364
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] Starting recording in channel 1466060882437079205 (Room C)
recorder-1  | [RecordingSession] Pre-subscribing to member: suzukismaburanozuidaoludian
recorder-1  | [RecordingSession] Setting up listener for user 504987225168019456
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Audio received for suzuki at offset 180ms. Creating file: suzuki_504987225168019456.mp3
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [AutoStop Debug] User left Room C (1466060882437079205). Bot index: 0
recorder-1  | [AutoStop Debug] Channel: Room C, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room C. Stopping...
recorder-1  | [AutoStop Debug] User left Room C (1466060882437079205). Bot index: 2
recorder-1  | [AutoStop Debug] Channel: Room C, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room C. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room C, skipping duplicate
recorder-1  | [AutoStop Debug] User left Room C (1466060882437079205). Bot index: 1
recorder-1  | [AutoStop Debug] Channel: Room C, Human count: 0
recorder-1  | [AutoStop] All humans left channel Room C. Stopping...
recorder-1  | [AutoStop] Stop already scheduled for Room C, skipping duplicate
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 1 files into /app/data/recordings/Room C_202601292156_full.mp3
recorder-1  | [RecordingSession] Single file moved to /app/data/recordings/Room C_202601292156_full.mp3
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room C_202601292156
recorder-1  | [BotManager] Bot 3 released from channel 1466060882437079205
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 556089520425009163 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] User 504987225168019456 speaking event triggered
recorder-1  | [RecordingSession] Stopping recording and mixing files...
recorder-1  | [RecordingSession] Error in pipeline for やもり: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for suzuki: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Error in pipeline for きさらぎ_どーじ: Error: Premature close
recorder-1  |     at WriteStream.<anonymous> (node:internal/streams/pipeline:415:29)
recorder-1  |     at WriteStream.emit (node:events:531:35)
recorder-1  |     at WriteStream.emit (node:domain:489:12)
recorder-1  |     at emitCloseNT (node:internal/streams/destroy:148:10)
recorder-1  |     at processTicksAndRejections (node:internal/process/task_queues:89:21) {
recorder-1  |   code: 'ERR_STREAM_PREMATURE_CLOSE'
recorder-1  | }
recorder-1  | [RecordingSession] Mixing 3 files into /app/data/recordings/Room A_202601292155_full.mp3
recorder-1  | [RecordingSession] Renamed temp file: やもり_502483114648403969.mp3 -> input_0.mp3
recorder-1  | [RecordingSession] Renamed temp file: suzuki_504987225168019456.mp3 -> input_1.mp3
recorder-1  | [RecordingSession] Renamed temp file: きさらぎ_どーじ_556089520425009163.mp3 -> input_2.mp3
recorder-1  | [RecordingSession] Mixing complete: /app/data/recordings/Room A_202601292155_full.mp3
recorder-1  | [RecordingSession] FFmpeg stderr: ffmpeg version 7.0.2-static https://johnvansickle.com/ffmpeg/  Copyright (c) 2000-2024 the FFmpeg developers
recorder-1  |   built with gcc 8 (Debian 8.3.0-6)
recorder-1  |   configuration: --enable-gpl --enable-version3 --enable-static --disable-debug --disable-ffplay --disable-indev=sndio --disable-outdev=sndio --cc=gcc --enable-fontconfig --enable-frei0r --enable-gnutls --enable-gmp --enable-libgme --enable-gray --enable-libaom --enable-libfribidi --enable-libass --enable-libvmaf --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librubberband --enable-libsoxr --enable-libspeex --enable-libsrt --enable-libvorbis --enable-libopus --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libdav1d --enable-libxvid --enable-libzvbi --enable-libzimg
recorder-1  |   libavutil      59.  8.100 / 59.  8.100
recorder-1  |   libavcodec     61.  3.100 / 61.  3.100
recorder-1  |   libavformat    61.  1.100 / 61.  1.100
recorder-1  |   libavdevice    61.  1.100 / 61.  1.100
recorder-1  |   libavfilter    10.  1.100 / 10.  1.100
recorder-1  |   libswscale      8.  1.100 /  8.  1.100
recorder-1  |   libswresample   5.  1.100 /  5.  1.100
recorder-1  |   libpostproc    58.  1.100 / 58.  1.100
recorder-1  | [mp3 @ 0x13f432c0] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #0, mp3, from '/app/data/recordings/Room A_202601292155/input_0.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:01:25.25, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #0:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x13f445c0] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #1, mp3, from '/app/data/recordings/Room A_202601292155/input_1.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:00:04.70, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #1:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | [mp3 @ 0x13f55d80] Estimating duration from bitrate, this may be inaccurate
recorder-1  | Input #2, mp3, from '/app/data/recordings/Room A_202601292155/input_2.mp3':
recorder-1  |   Metadata:
recorder-1  |     encoder         : Lavf61.1.100
recorder-1  |   Duration: 00:00:09.38, start: 0.000000, bitrate: 128 kb/s
recorder-1  |   Stream #2:0: Audio: mp3 (mp3float), 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  | Stream mapping:
recorder-1  |   Stream #0:0 (mp3float) -> adelay:default
recorder-1  |   Stream #1:0 (mp3float) -> adelay:default
recorder-1  |   Stream #2:0 (mp3float) -> adelay:default
recorder-1  |   volume:default -> Stream #0:0 (libmp3lame)
recorder-1  | Press [q] to stop, [?] for help
recorder-1  | Output #0, mp3, to '/app/data/recordings/Room A_202601292155_full.mp3':
recorder-1  |   Metadata:
recorder-1  |     TSSE            : Lavf61.1.100
recorder-1  |   Stream #0:0: Audio: mp3, 48000 Hz, stereo, fltp, 128 kb/s
recorder-1  |       Metadata:
recorder-1  |         encoder         : Lavc61.3.100 libmp3lame
[out#0/mp3 @ 0x13f74c80] video:0KiB audio:1342KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.031142%
recorder-1  | size=    1343KiB time=00:01:25.86 bitrate= 128.1kbits/s speed= 146x
recorder-1  |
recorder-1  | [RecordingSession] Cleaning up temporary directory: data/recordings/Room A_202601292155
recorder-1  | [BotManager] Bot 1 released from channel 1466018670219231256