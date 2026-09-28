import { createAuthClient } from "better-auth/vue";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  fetchOptions: {
    credentials: "include"
  },
  plugins: [
    inferAdditionalFields({
			user: {
				role: {
					type: "string"
				}
			}
		})
  ]
});
