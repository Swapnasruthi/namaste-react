import ResCategoryList from "./ResCategoryList";
// import React, { useState } from "react";
const {useState} = require("react");


const RestaurentCategory = ({data, showItems, setShowIndex})=> {

    // const [showItems,setShowItems] = useState(false);
    
    function clickFuntion(){
        // (showItems == false) ? setShowItems(true) : setShowItems(false);
        setShowIndex();
    }
    
    return(
        <div className="mt-30 mb-10">
            {/* header */}
            <div className="box-border border-t-[1rem] text-center border-solid border-gray-200 w-6/12 m-auto"
                >
                <h1 className="cursor-pointer flex justify-between items-center mt-5 box-border font-bold text-xl" 
                 onClick={clickFuntion}>{data.title} ({data.itemCards.length}) <span>{showItems? <span>⯅</span> : <span>⯆</span>}</span></h1>
                 
                 {/* accordian body */}
                 {showItems && <ResCategoryList items = {data.itemCards}/>}
               

            </div>
            
            
            {/* ⯆⯅ */}
        </div>
    )
}
export default RestaurentCategory;