import ReactGA from 'react-ga';

const trackingId = "G-724K91PHM4"; // Replace with your tracking ID
ReactGA.initialize(trackingId);

export const pageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};