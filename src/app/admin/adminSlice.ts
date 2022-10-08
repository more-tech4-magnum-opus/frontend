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
                if(state.market.products.indexOf(action.payload) == -1){
                    state.market.products = state.market.products.concat([action.payload])
                }
            },
            addProducts(state, action: PayloadAction<ProductIE[]>){
                if(state.market.products.length == 0){
                    state.market.products = state.market.products.concat(action.payload)
                }
            },
            delProduct(state, action:PayloadAction<string>){
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
                console.log(action.payload)
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

export async function fetchAddProduct(dispatch:AppAdminDispatch, params:{image: File, descr: string, name:string, cost:number}) {
    //тут идет фетч
    const formData = new FormData()
    formData.append("name",params.name)
    formData.append("description",params.descr)
    formData.append("image", params.image)
    formData.append("price",params.cost.toString())
    adminFetcher.post("marketplace/product/", formData).then((response)=>{
        dispatch(addProduct({
            name: response.data.name,
            description:response.data.description,
            image: response.data.image_cropped,
            cost:Number(response.data.price),
            id:response.data.slug
        } as ProductIE))
        
    })

    
}

export async function fetchDelProduct(dispatch:AppAdminDispatch, id:string) {
    //тут идет фетч
    adminFetcher.delete("marketplace/product/"+id).then(()=>dispatch(delProduct(id)))
    
}

export async function fetchChangeProduct(dispatch:AppAdminDispatch, params:{id:string, descr: string, name:string, cost:number}) {
    const formData = new FormData()
    formData.append("name",params.name)
    formData.append("description",params.descr)
    formData.append("price",params.cost.toString())
    adminFetcher.patch("marketplace/product/" + params.id, formData).then((response)=>{
        dispatch(delProduct(params.id))
        dispatch(addProduct({
            name: response.data.name,
            description:response.data.description,
            image: response.data.image_cropped,
            cost:Number(response.data.price),
            id:response.data.slug
        } as ProductIE))
        
    })
      
}

export const getProducts = createSelector(
    (state:RootAdminState) => state.adminSlice.market.products,
    (field)=>field
)

export const getProductByID = createSelector(
    (state:RootAdminState, id:string) => state.adminSlice.market.products.filter((product)=>product.id == id)[0],
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
    addProducts
} = adminSlice.actions

export default adminSlice.reducer