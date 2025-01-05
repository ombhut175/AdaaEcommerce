import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function Layout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default Layout;

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./src/components/Navbar";

// function Layout() {
//     const [showDarkModeButton, setShowDarkModeButton] = useState(true);

//     return (
//         <>
//             <Navbar showDarkModeButton={showDarkModeButton} setShowDarkModeButton={setShowDarkModeButton} />
//             <div className="content-container">
//                 <Outlet context={{ showDarkModeButton, setShowDarkModeButton }} />
//             </div>
//         </>
//     );
// }

// export default Layout;
