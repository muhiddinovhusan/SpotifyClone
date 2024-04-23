import { createSlice } from "@reduxjs/toolkit"

export const loadFromLocalStorage = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return undefined;
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        return undefined;
    }
};


const initialState = {
    likeCart: loadFromLocalStorage("likeCart") ?? [],
};


const saveToLocalStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};


const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        addToLikeCart(state, action) {
            state.likeCart.push(action.payload);
            saveToLocalStorage("likeCart", state.likeCart);
        },
        removeFromLikedSongs(state, action) {
            state.likeCart = state.likeCart.filter(song => song.id !== action.payload);
            saveToLocalStorage("likeCart", state.likeCart);
          },
    },
});


export const { reducer: likeReducer, actions: likeActions } = likeSlice;

export const { addToLikeCart } = likeActions;

export const { removeFromLikedSongs } = likeActions;