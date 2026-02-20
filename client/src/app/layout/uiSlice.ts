import { createSlice } from "@reduxjs/toolkit";

const getInitDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : true
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        darkMode: getInitDarkMode()
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        setDarkMode: (state) => {
            localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
            state.darkMode = !state.darkMode
        }
    }
});

export const { startLoading, stopLoading, setDarkMode} = uiSlice.actions