import React, {lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
//importing components
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Shimmer from "./components/Shimmer";
// import Glocery from "./components/Glocery";
import Error from "./components/Error";
import RestaurentMenu from "./components/RestaurentMenu";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";

const Glocery = lazy(()=> import("./components/Glocery"));
const AppLayout = () =>{
    return (
        <div className="app">
            <Header></Header>
            {/* the outlet just acts as a tunnel which pushes the element according to the path in the page.
            as it in the Applayout component whenever the path changes in the element, outlet undestands it
            and it changes the component according to the path */}
            <Outlet/>
        </div>

    )
}

const indexRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/glocery",
                element:<Suspense fallback={<Shimmer/>}><Glocery/></Suspense>
            },
            {
                path:"/restaurents/:resId",
                element:<RestaurentMenu/>
            },
        ],
        errorElement:<Error/>,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={indexRouter}/>);
// root.render(<AppLayout/>);