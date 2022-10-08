import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { Market, Roles, SortTypes, UserIE, ProductIE} from '../interfaces'
import { AppAdminDispatch, RootAdminState } from '../adminStore'
import { adminFetcher, useAppDispatch } from '../hooks'
import { host, token } from '../consts'





const initState = {
    user: {
        wallet:"123214",
        balance: 100,
        id:1,
        role:Roles.admin,
        name:"Firesieht"
    } as UserIE, //потом достается запросом
    market:  {
        sortType: SortTypes.sortByPriceSmaller,
        products: []
    } as Market // потом достается запросом
}

const adminSlice = createSlice(
    {
        name: "adminSlice",
        initialState: initState,
        reducers:{
            sendCoins(state, action: PayloadAction<number>){
                state.user.balance = state.user.balance - action.payload
            },
            addProduct(state, action: PayloadAction<ProductIE>){
                state.market.products = state.market.products.concat([action.payload])
            },
            delProduct(state, action:PayloadAction<number>){
                let products = state.market.products
                let ind = 0
                products.forEach((product, index)=>{
                    if (product.id == action.payload){
                        ind = index
                    }
                })
                products.splice(ind, 1)
                state.market.products = products
            },
            changeProduct(state, action:PayloadAction<ProductIE>){
                let products = state.market.products
                products.forEach((product,index)=>{
                    if (product.id == action.payload.id){
                        products[index] = action.payload
                    }
                })
                state.market.products = products
            }
        }
    }
)


export async function fetchSendCoins(dispatch:AppAdminDispatch, params:{userID:number, amount:number}) {
    //тут идет фетч
    dispatch(sendCoins(params.amount))
}

export async function fetchAddProduct(dispatch:AppAdminDispatch, params:{image: FormData, descr: string, name:string, cost:number}) {
    //тут идет фетч
    let data = {
        image: "",
        description: params.descr,
        name: params.name,
        cost: params.cost,
        id: params.cost
    } as ProductIE //vмоковая даата
    adminFetcher.post("marketplace/product/", {
        
    })

    dispatch(addProduct(data))
}

export async function fetchDelProduct(dispatch:AppAdminDispatch, id:number) {
    //тут идет фетч
    dispatch(delProduct(id))
}

export async function fetchChangeProduct(dispatch:AppAdminDispatch, params:ProductIE) {
    dispatch(changeProduct(params))
}

export const getProducts = createSelector(
    (state:RootAdminState) => state.adminSlice.market.products,
    (field)=>field
)

export const getProductByID = createSelector(
    (state:RootAdminState, id:number) => state.adminSlice.market.products.filter((product)=>product.id == id)[0],
    (field)=>field
)

export const getSortType = createSelector(
    (state:RootAdminState) => state.adminSlice.market.sortType,
    (field)=>field
)
export const getUser = createSelector(
    (state:RootAdminState) => state.adminSlice.user,
    (field)=>field
)

export const {
    sendCoins,
    addProduct,
    delProduct,
    changeProduct,
} = adminSlice.actions

export default adminSlice.reducer