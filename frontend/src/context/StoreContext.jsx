import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // ✅ NEW

    const url = "http://localhost:4000";

    const foodMap = useMemo(() => {
        const map = {};
        food_list.forEach(item => {
            map[item._id] = item;
        });
        return map;
    }, [food_list]);

    const addTocart = async (itemId) => {
        setCartItems((prev) => {
            const qty = prev[itemId] ? prev[itemId] + 1 : 1;
            return { ...prev, [itemId]: qty };
        });

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) return prev;

            const qty = prev[itemId] - 1;

            if (qty <= 0) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [itemId]: qty };
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = foodMap[item];
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        );
        setCartItems(response.data.cartData || {});
    };

    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();

                const storedToken = localStorage.getItem("token");

                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false); // ✅ IMPORTANT
            }
        }

        loadData();
    }, []);

    const deliveryFee = Math.round(getTotalCartAmount() * 0.2);

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
        setToken,
        searchQuery,
        setSearchQuery,
        foodMap,
        loading // ✅ EXPORT LOADING
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
