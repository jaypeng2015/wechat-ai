const apiAi = require('apiai');

const app = apiAi('410d0e20d98d4e10a084ae91e3c8eb5d');

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
module.exports.request = (text, sessionId) =>
  new Promise((resolve, reject) => {
    const request = app.textRequest(text, {
      sessionId,
    });

    request.on('response', (response) => {
      resolve(response);
    });

    request.on('error', (err) => {
      console.log(err);
      reject(err);
    });

    request.end();
  });
