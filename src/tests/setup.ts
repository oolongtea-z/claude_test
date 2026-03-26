import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';

// テストスイート開始前にMSWサーバーを起動
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 各テスト後にハンドラーをリセット（server.use() による上書きをクリア）
afterEach(() => server.resetHandlers());

// テストスイート終了後にサーバーを停止
afterAll(() => server.close());
