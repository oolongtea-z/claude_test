import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Vitest (Node環境) 用 MSW サーバー
 * setup.ts でライフサイクルを管理する
 */
export const server = setupServer(...handlers);
