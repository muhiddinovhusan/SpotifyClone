import { createSlice } from "@reduxjs/toolkit";

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
    selectedTrack: loadFromLocalStorage("selectedTrack") ?? null,
    isPlaying: false,
    SidebarLeft: true,
    SidebarRight: true,
    PlayerContent: false
};

export const saveToLocalStorage = (key, value) => {
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
        addToselectedTrack(state, action) {
            state.selectedTrack = action.payload;
            saveToLocalStorage("selectedTrack", state.selectedTrack);
        },
        togglePlayTrue(state) {
            state.isPlaying = !state.isPlaying;
        },
        pauseTrackFalse(state) {
            state.isPlaying = false;
        },
        toggleSidebarLeftOpen(state) {
            state.SidebarLeft = !state.SidebarLeft;
        },
        toggleSidebarLeftClose(state) {
            state.SidebarLeft = false;
        },
        togglePlayerContentOpen(state) {
            state.PlayerContent = !state.PlayerContent;
        },
        togglePlayerContentClose(state) {
            state.PlayerContent = false;
        },




    },
});






export const { addToLikeCart, removeFromLikedSongs, addToselectedTrack, pauseTrackFalse, togglePlayTrue, toggleSidebarLeftOpen, toggleSidebarLeftClose, togglePlayerContentOpen,togglePlayerContentClose } = likeSlice.actions;
export const likeReducer = likeSlice.reducer;
