import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addTocart = async (itemId) => {
        setCartItems((prev) => {
            const qty = prev[itemId] ? prev[itemId] + 1 : 1
            return { ...prev, [itemId]: qty }
        })
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) return prev
            const qty = prev[itemId] - 1
            if (qty <= 0) {
                const { [itemId]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [itemId]: qty }
        });
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=>product._id===item);
            totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () =>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            if (localStorage.getItem("token")) {
             setToken(localStorage.getItem("token"));
             await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    
    const deliveryFee = Math.round(getTotalCartAmount()*0.2)

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        getTotalCartAmount,
        deliveryFee,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;