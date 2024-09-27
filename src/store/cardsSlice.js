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
                count:6
           }
       }
   );
   
   return data;
    // return [
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //             {image:"https://avatars.mds.yandex.net/i?id=2414e1a11e8ea018c07319af1c31604f93fa0baa-10165663-images-thumbs&n=13", active: false , matched:false},
    //         ]
});

export const cardsSlice = createSlice({
    name:'cards',
    initialState:{
        items:[],
        gameItems:[],
        previousCard:null,
        currentCard:null
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
            state.gameItems.map((item)=>{
                if(item.id === payload) {
                    item.matched = true;
                }
            })
        },
        resetStatus:(state, {payload})=>{
            state.gameItems.map((item)=>{
                if(item.id === payload) {
                    item.status = false;
                }
            })
        }    
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
            //let eight_items = state.allitems.slice(0,8);
            // let eight_items = payload;
           
            // eight_items.map((item)=>{
            //      item.id = nanoid();
            //      return item;
            // })
            //eight_items = [...eight_items, id: nanoid()];
            state.gameItems = [...state.items, ...state.items].sort(() => Math.random() - 0.5);
        })
        builder.addCase(fetchImages.rejected, (state, action)=>{
            console.log(action)
        })
    }
});

export const {setStatus, setCurrentCard, setPreviousCard, setMatched, resetStatus} = cardsSlice.actions;

export default cardsSlice.reducer;