/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:15
 * @modify date 2021-07-15 13:19:20
 * @desc [description]
 */
import { useRouter } from "next/router";

/**
 * isBrowser
 * @returns - Boolean Value if request is sent from user's browser
 */
function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * withConditionalRedirect
 * @param param0 - WrappedComponent, clientCondition, serverCondition, location
 * @returns - WrappedComponent
 */
export default function withConditionalRedirect({
  WrappedComponent,
  clientCondition,
  serverCondition,
  location,
}) {
  const WithConditionalRedirectWrapper = (props) => {
    const router = useRouter();
    const redirectCondition = clientCondition();
    if (isBrowser() && redirectCondition) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.getInitialProps = async (ctx) => {
    if (!isBrowser() && ctx.res) {
      if (serverCondition(ctx)) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps };
  };

  return WithConditionalRedirectWrapper;
}
