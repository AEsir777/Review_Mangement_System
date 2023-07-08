import '../styles/globals.css';
import { PaginationProvider } from '../contexts/paginationContext';

function MyApp({ Component, pageProps }) {
  return (
    <PaginationProvider>
    <Component {...pageProps} />
    </PaginationProvider>
  )
}

export default MyApp;
