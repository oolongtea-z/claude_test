// import { http, HttpResponse } from 'msw';

/**
 * MSW ハンドラー定義
 * 各テストファイルで server.use(...) によって上書き可能
 */
export const handlers = [
  // デフォルトハンドラーはここに追加
  // 例: http.get('/api/v1/reports', () => HttpResponse.json({ data: { reports: [] } })),
];
