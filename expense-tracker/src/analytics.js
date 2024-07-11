export const logPageView = () => {
    if (window.gtag) {
      window.gtag('config', 'G-FD80NCSEPR', {
        page_path: window.location.pathname + window.location.search,
      });
    }
  };
  