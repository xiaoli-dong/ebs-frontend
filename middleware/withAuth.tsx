/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:04
 * @modify date 2021-07-15 13:19:09
 * @desc [description]
 */
import { useIsAuthenticated } from "./AuthProvider";
import withConditionalRedirect from "./withConditionalRedirect";

/**
 * withAuth (HOC)
 * @param WrappedComponent - A child component depending on Authentication middleware
 * @param location - An URI for redirection in case the user is not authenticated
 * @returns - Authentication Provider
 */
export default function withAuth(WrappedComponent, location = "/login") {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withAuthClientCondition() {
      return !useIsAuthenticated();
    },
    serverCondition: function withAuthServerCondition(ctx) {
      return !ctx.req?.cookies.auth_token;
    },
  });
}
