import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomError extends Error {
  cause?: {
    errorDescription?: string;
  };
}

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res);
  } catch (error: unknown) {
    console.error("Callback error:", error);
    if (error instanceof Error && (error as CustomError).cause?.errorDescription === "user is blocked") {
      return res.redirect(302, "/login?from=user_blocked");
    }

    console.error(error);
    res.status(500).json({ error });
  }
}

// 'ERR_CALLBACK_HANDLER_FAILURE',
//   status: 400,
//     [cause]: Error: Missing state cookie from login request(check login URL, callback URL and cookie config).
//       at<unknown>(node_modules@auth0\nextjs - auth0\src\auth0 - session\handlers\callback.ts: 45: 12)
//       at async(node_modules@auth0\nextjs - auth0\src\handlers\callback.ts: 368: 13)
//       at async callback(c: \Users\leandro\Desktop\Active\frontend\src\pages\api\auth\callback.ts: 15: 4)
//       at async apiResolver(webpack://next/dist/src/server/api-utils/node/api-resolver.ts:420:27)
//         at async PagesAPIRouteModule.render(webpack://next/dist/src/server/route-modules/pages-api/module.ts:144:39)
//           at async DevServer.runApi(node_modules\next\src\server\next - server.ts: 535: 4)
//       at async NextNodeServer.handleCatchallRenderRequest(node_modules\next\src\server\next - server.ts: 1030: 24)
//       at async DevServer.handleRequestImpl(node_modules\next\src\server\base - server.ts: 1462: 8)
//       at async(node_modules\next\src\server\dev\next - dev - server.ts: 514: 13)
//       at async Span.traceAsyncFn(node_modules\next\src\trace\trace.ts: 143: 13)
//       at async DevServer.handleRequest(node_modules\next\src\server\dev\next - dev - server.ts: 512: 19)
//       at async invokeRender(node_modules\next\src\server\lib\router - server.ts: 284: 10)
//       at async handleRequest(node_modules\next\src\server\lib\router - server.ts: 530: 15)
//       at async requestHandlerImpl(node_modules\next\src\server\lib\router - server.ts: 576: 6)
//     13 | ) {
//         14 |   try {

//           15 | await handleCallback(req, res);

//        |    ^
//           16 |   } catch (error: unknown) {
//             17 |     if (
//               18 | error instanceof Error && {
//                 status: 400,
//                 statusCode: 400
//               }
// }
// GET / api / auth / callback ?