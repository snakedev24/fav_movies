import { AppProps } from 'next/app';
import '../styles/global.css';
import { ToastContainer } from 'react-toastify';

function MyMovieApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyMovieApp;