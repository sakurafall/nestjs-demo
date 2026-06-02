import type { IncomingMessage, ServerResponse } from 'http';

/** 按 HTTP 状态映射 pino 级别（pino-http 默认全部为 info） */
function httpLogLevel(
  _req: IncomingMessage,
  res: ServerResponse,
  err?: Error,
): 'info' | 'warn' | 'error' {
  if (err || res.statusCode >= 500) return 'error';
  if (res.statusCode >= 400) return 'warn';
  return 'info';
}

const pinoHttpConfig = {
  customLogLevel: httpLogLevel,
  transport: {
    targets: [
      { target: 'pino-pretty', options: { colorize: true } },
      {
        target: 'pino/file',
        level: 'info',
        options: { destination: 'logs/info.log', mkdir: true },
      },
      {
        target: 'pino/file',
        level: 'warn',
        options: { destination: 'logs/warn.log', mkdir: true },
      },
      {
        target: 'pino/file',
        level: 'error',
        options: { destination: 'logs/error.log', mkdir: true },
      },
    ],
  },
};

export default pinoHttpConfig;
