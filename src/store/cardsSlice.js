import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

export const fetchImages = createAsyncThunk("cards/fetchImages", async()=>{
    const {data} = await axios.get(' https://api.api-ninjas.com/v1/emoji',
        {
           headers: {
               'X-Api-Key':'I6suSpEF4FjYzEG681IOKA==qsY3NDzjWspmkkhF'
           },
           params: {
                group:'food_drink',
           }
       }
   );
   return data;
});

export const cardsSlice = createSlice({
    name:'cards',
    initialState:{
        items:[],
        gameItems:[],
        previousCard:null,
        currentCard:null,
        final_count:0,
    },
    reducers:{
        setStatus:(state, { payload })=>{
            console.log(payload)
            state.gameItems[payload].status = true;
           
        },
        setPreviousCard:(state,{payload})=>{
            payload === null ? state.previousCard = null : state.previousCard = state.gameItems[payload];
        },
        setCurrentCard:(state, {payload})=>{
            payload === null ? state.currentCard = null : state.currentCard = state.gameItems[payload];
        },
        setMatched:(state, {payload})=>{
            state.final_count++;
            state.gameItems.map((item)=>{
                if(item.id === payload) {
                    item.matched = true;
                }
            })
        },
        resetStatus:(state, {payload})=>{
            console.log(payload)
            state.gameItems.map((item)=>{
                if(item.id === payload.previousId || item.id === payload.currentId) {
                    item.status = false;
                }
            })
        },
        resetState: (state, {payload})=>{
            state.final_count = 0;
        },
         
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchImages.fulfilled, (state, {payload})=>{
            state.items = payload.slice(0,8);
            state.items.map((item)=>{
                item.id = nanoid();
                item.status = false;
                item.matched = false;
                return item;
            })
            state.gameItems = [...state.items, ...state.items].sort(() => Math.random() - 0.5);
        })
        builder.addCase(fetchImages.rejected, (state, action)=>{
            console.log(action)
        })
    }
});

export const {setStatus, setCurrentCard, setPreviousCard, setMatched, resetStatus, resetState} = cardsSlice.actions;

export default cardsSlice.reducer;