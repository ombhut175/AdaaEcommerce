import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const AnalyticsTracker = () => {
    const location = useLocation();
    console.log(location, "location");
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return null;
};

export default AnalyticsTracker;
