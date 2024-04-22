
import { v1 as api } from "./controllers";

export interface Env {
  JS_VARIABLE: R2Bucket;

	// Global sensitive environment variables
	ENVIRONMENT: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		try {
			const { pathname } = new URL(request.url);
      /**
       * Upload file to R2 bucket
       */
      if (pathname === "/api/v1/chapter/import" && request.method === "POST") {
        return api.uploadFile(request, env, ctx);
      }

      if (pathname === "/api/v1/chapter/import" && request.method === "OPTIONS") {
        return new Response("OK", {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin":
              env.ENVIRONMENT === "production"
                ? "https://example.com"
                : "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

			// Redirecting to 'example homepage' permanently.
			return Response.redirect("https://example.com/", 301);
		} catch (err) {
			return new Response(
				JSON.stringify({
					message: "SERVER_ERROR",
					stacktrace: err,
				}),
				{
					status: 500,
					headers: {
						"Access-Control-Allow-Origin":
							env.ENVIRONMENT === "production"
								? "https://example.com"
								: "http://localhost:3000",
						"Access-Control-Allow-Methods": "POST,OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type",
					},
				},
			);
		}
	},
};
