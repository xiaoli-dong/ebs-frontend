/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:14:25
 * @modify date 2021-07-15 15:46:55
 * @desc [description]
 */
import "../styles/globals.css";
import "../styles/ebs.scss";
import "semantic-ui-css/semantic.min.css";

import type { AppProps, AppContext } from "next/app";

import React from "react";
import App from "next/app";
import Head from "next/head";
import cookie from "cookie";
import { AuthProvider } from "../middleware/AuthProvider";

/**
 * EBSAppProps
 */
interface EBSAppProps extends AppProps {
  authenticated: boolean;
  token: string;
}

/**
 * The most top level of Next.js component that extends react application by overriding the global App component.
 * @param EBSAppProps - See {@link EBSAppProps}
 * @returns - A Component of Next.js
 */
function EBSApp(EBSAppProps: EBSAppProps): JSX.Element {
  const { Component, pageProps, authenticated, token } = EBSAppProps;
  return (
    <>
      <Head>
        <title>EBS Project</title>
      </Head>
      <AuthProvider authenticated={authenticated} token={token}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

/**
 * Overriding getInitialProps
 * @param appContext - Application context of Next.js.
 * @returns - AppContext with custom props which are authenticated and token.
 */
EBSApp.getInitialProps = async (appContext: AppContext) => {
  let token = "";
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    const cookies = cookie.parse(request.headers.cookie || "");
    const auth_token = cookies.auth_token;
    if (auth_token) {
      // const sanitized = auth_token.replace(/\\054/g, ",").replace(/'/g, '"');
      // const tokenObj = JSON.parse(sanitized);
      // token = tokenObj.access;
      token = auth_token;
    }
    authenticated = !!auth_token;
  }

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated, token };
};

export default EBSApp;
