import RestraurentCards, {withOfferTag} from "./RestaurentCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import {useEffect, useState, useContext} from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import userContext from "../utils/UserContext";

const Body = ()=>{
    const [listOfRestaurent, setListOfRestaurent] = useState([]); //this is for storing all the cards (whenever i need to filter something, i'll use this variable)
    const [filteringRestaurent, setFilteringRestaurent] = useState([]); //this is for displaying the changes in the UI. it also contains the cards. but, changes will be undergoes in this variable.
   
    const [inputValue,setInputValue] = useState(""); //this is for tracking our input box.

    const RestaurentOfferCards = withOfferTag(RestraurentCards);

    useEffect(()=>{
       fetchData();
    },[]);

    const {loggedUserId, setUserName} = useContext(userContext);
    const fetchData = async ()=>{
        const data = await fetch("https://www.swiggy.com/mapi/homepage/getCards?lat=17.44941225066375&lng=78.383892888085"
        );
        const json = await data.json();
        //console.log(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
        //console.log(json.data.success.cards[3].gridWidget.gridElements.infoWithStyle.restaurants);
        //console.log(json);
        // console.log(json.data.success.cards[3].gridWidget.gridElements.infoWithStyle.restaurants);
       
        //optional chaining.
        setListOfRestaurent(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
        setFilteringRestaurent(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();
    if (onlineStatus == false){
        return <h1>Looks like you're offline, check your Internet Connection!</h1>
    }
    
    //conditional rendering.
    if(listOfRestaurent.length === 0){
        return <Shimmer/>;
    }

   
    
    return (
        
        <div className="body w-10/12 m-auto">
            <div className="filter p-5 flex items-center justify-center">
                <input 
                    type="text"
                    className="border border-black h-8 w-72"
                    value={inputValue}
                    //tracking the input value using the onchange function.
                    onChange={(e)=>{
                        setInputValue(e.target.value);
                    }}
                />
                <button 
                    className="px-4 py-0.5 m-2 bg-green-200 rounded-lg"
                    onClick={()=>{
                            const inputFilter = listOfRestaurent.filter((res)=>res.info.name.toLowerCase().includes(inputValue));
                            setFilteringRestaurent(inputFilter);
                            console.log(inputValue);
                       }} >
                   
                    Search
                </button>
                <button 
                    className="px-4 py-0.5 m-2 bg-gray-300 rounded-lg" 
                    onClick={ () => {
                        const filterdRest = listOfRestaurent.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setFilteringRestaurent(filterdRest);
                        // console.log("clicked");
                    }} 
                    > 
                    Rated Restaurant
                </button>
                <label className="font-bold">User Name:</label>
                <input 
                    
                    type="text"
                    className="m-1 p-1 border border-black h-8 w-72"
                    value={loggedUserId}
                    onChange={(e)=>setUserName(e.target.value)}
                
                />
            </div>
                <div className="flex flex-wrap justify-center">
                   {
                    filteringRestaurent.map((restaurant) =>
                    
                    (
                       <Link to={"restaurents/"+restaurant.info.id} style={{ textDecoration: 'none', color:"black" }}> 

                       {
                       
                       restaurant.info.aggregatedDiscountInfoV3 ? 
                       (<RestaurentOfferCards restObj={restaurant} />) : 
                       
                       (<RestraurentCards key={restaurant.info.id} restObj={restaurant}/>) }

                       </Link>
                    ))
                   }
            </div>
        </div>
    )
}

export default Body;


