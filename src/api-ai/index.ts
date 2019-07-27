import apiAi from 'apiai';

import * as settings from '../settings';

const apiKey = settings.getApiKey() || 'b6220b38aec344a4a900baa48e663a65';
const app = apiAi(apiKey);

/**
 * Get response from api.ai which looks like:
 * ```
 * { id: '0fee7f3d-5816-4c6e-b040-725efbe91804',
 *   timestamp: '2017-05-21T22:29:09.373Z',
 *   lang: 'zh-cn',
 *   result:
 *    { source: 'agent',
 *      resolvedQuery: 'Hello',
 *      action: 'input.welcome',
 *      actionIncomplete: false,
 *      parameters: {},
 *      contexts: [],
 *      metadata:
 *       { intentId: '46665ceb-fbf0-4965-9ff0-357df727be28',
 *         webhookUsed: 'false',
 *         webhookForSlotFillingUsed: 'false',
 *         intentName: 'Default Welcome Intent' },
 *      fulfillment: { speech: '嘿！ 好久不见！', messages: [Object] },
 *      score: 1 },
 *   status: { code: 200, errorType: 'success' },
 *   sessionId: '1495405752519' }
 * ```
 */
export const request = (text, sessionId) =>
  new Promise((resolve, reject) => {
    const req = app.textRequest(text, {
      sessionId,
    });

    req.on('response', response => {
      resolve(response);
    });

    req.on('error', err => {
      console.log(err); // tslint:disable-line
      reject(err);
    });

    req.end();
  });
