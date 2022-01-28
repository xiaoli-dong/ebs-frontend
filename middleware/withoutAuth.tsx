/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:32
 * @modify date 2021-07-15 13:19:38
 * @desc [description]
 */
import { useIsAuthenticated } from "./AuthProvider";
import withConditionalRedirect from "./withConditionalRedirect";

/**
 * withoutAuth (HOC)
 * @param WrappedComponent - A child component depending on Authentication middleware
 * @param location - An URI for redirection in case the user is not authenticated
 * @returns - Authentication Provider
 */
export default function withoutAuth(WrappedComponent, location = "/") {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      return useIsAuthenticated();
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
      return !!ctx.req?.cookies.auth_token;
    },
  });
}
