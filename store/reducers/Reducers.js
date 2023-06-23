import { combineReducers } from "redux";

function cartReducer(items = [], action) {
    switch(action.type){
        case 'add item':
            return [...items, action.item];
        default: 
            return items;
    }
}

function openCartReducer(open = false, action){
    switch(action.type){
        case 'open cart':
            return action.open;
        case 'close cart':
            return action.open;
        default: 
            return open; 
    }
}

export default combineReducers({
    cart: cartReducer,
    openCart: openCartReducer,
})