import 'layouts/App/reset.css';
import 'layouts/App/global.css';

import { Navbar } from 'components/Navbar';
import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useFoucFix, useLocalStorage } from 'hooks';
import styles from 'layouts/App/App.module.css';
import { initialState, reducer } from 'layouts/App/reducer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer } from 'react';
import { msToNum } from 'utils/style';
import { ScrollRestore } from '../layouts/App/ScrollRestore';
import Script from 'next/script';
import * as gtag from '../lib/gtag';

export const AppContext = createContext({});

const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { route, asPath, events } = useRouter();
  const canonicalRoute = route === '/' ? '' : `${asPath}`;
  useFoucFix();

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <LazyMotion features={domAnimation}>
          <Fragment>
            <Head>
              <link
                rel="canonical"
                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${canonicalRoute}`}
              />
            </Head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
              id="gtag-script-1"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-script-2"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#MainContent"
            >
              Skip to main content
            </VisuallyHidden>
            <Navbar />
            <main className={styles.app} tabIndex={-1} id="MainContent">
              <AnimatePresence exitBeforeEnter>
                <m.div
                  key={route}
                  className={styles.page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'tween',
                    ease: 'linear',
                    duration: msToNum(tokens.base.durationS) / 1000,
                    delay: 0.1,
                  }}
                >
                  <ScrollRestore />
                  <Component {...pageProps} />
                </m.div>
              </AnimatePresence>
            </main>
          </Fragment>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
