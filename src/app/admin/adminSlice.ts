import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { Market, Roles, SortTypes, UserIE, ProductIE, EmployerIE, ClanIE} from '../interfaces'
import { AppAdminDispatch, RootAdminState } from '../adminStore'
import { adminFetcher, useAppDispatch } from '../hooks'





const initState = {
    user: {
        wallet:"123214",
        balance: 100,
        id:"1",
        role:"ADMIN",
        name:"Firesieht"
    } as UserIE, //потом достается запросом
    market:  {
        sortType: SortTypes.sortByPriceSmaller,
        products: []
    } as Market, // потом достается запросом
    employers: [] as EmployerIE[],
    clans: [] as ClanIE[]
}

const adminSlice = createSlice(
    {
        name: "adminSlice",
        initialState: initState,
        reducers:{
            setClans(state, action:PayloadAction<ClanIE[]>){
                state.clans = action.payload
            },
            setEmployers(state, action:PayloadAction<EmployerIE[]>){
                state.employers = action.payload
            },
            addEmployer(state, action:PayloadAction<EmployerIE>){
                if(state.employers.length == 0){
                    state.employers = state.employers.concat([action.payload])
                }
            },
            delEmployer(state, action:PayloadAction<string>){
                let employers = state.employers
                let ind = 0
                employers.forEach((employer, index)=>{
                    if (employer.telegramID == action.payload){
                        ind = index
                    }
                })
                employers.splice(ind, 1)
                state.employers = employers
            },
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
            changeEmployer(state, action:PayloadAction<EmployerIE>){
                let employers = state.employers
                employers.forEach((product,index)=>{
                    if (product.telegramID == action.payload.telegramID){
                        employers[index] = action.payload
                    }
                })
                state.employers = employers
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

export async function fetchAddEmployer(dispatch:AppAdminDispatch, params:{pass:string, name: string, respect: string, salary:string, command:string, tg:string, type: string}) {
    const formData = new FormData()
    formData.append("name",params.name)
    formData.append("type",params.type)
    formData.append("respect", params.respect.toString())
    formData.append("salary",params.salary.toString())
    formData.append("telegram",params.tg)
    formData.append("command", params.command)
    formData.append("password", params.pass)
    adminFetcher.post("users/", formData).then((user)=>{
        dispatch(addEmployer({
                name: user.data.name, 
                wallet: user.data.wallet_public_key,
                telegramID: user.data.telegram,
                command: user.data.command,
                role: user.data.type,
                respect: user.data.respect,
                balance: user.data.salary,
                jobTittle: user.data.department,
        } as EmployerIE))
        
    })
}

export async function fetchDelEmployer(dispatch:AppAdminDispatch, tg:string) {
    adminFetcher.delete("users/"+tg).then(()=>dispatch(delProduct(tg)))
}

export async function fetchChangeEmployer(dispatch:AppAdminDispatch, params:{name: string, respect: number, balance:number, speciality:string, tg:string}) {
    const formData = new FormData()
    formData.append("name",params.name)
    formData.append("respect", params.respect.toString())
    formData.append("salary",params.balance.toString())
    adminFetcher.patch("users/" + params.tg, formData).then((user)=>{
        console.log(user)
        dispatch(changeEmployer({
                name: user.data.name, 
                wallet: user.data.wallet_public_key,
                telegramID: user.data.telegram,
                command: user.data.command,
                role: user.data.type,
                respect: user.data.respect,
                balance: user.data.salary,
                jobTittle: user.data.department,
        } as EmployerIE))
        
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

export const getEmployerByTg = createSelector(
    (state:RootAdminState, tg:string) => state.adminSlice.employers.filter((product)=>product.telegramID == tg)[0],
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
export const getEmployers = createSelector(
    (state:RootAdminState) => state.adminSlice.employers,
    (field)=>field
)
export const getClans = createSelector(
    (state:RootAdminState) => state.adminSlice.clans,
    (field)=>field
)
export const getClanByName = createSelector(
    (state:RootAdminState, name: string) => state.adminSlice.clans.filter((clan)=>clan.name == name)[0],
    (field)=>field
)

export const {
    sendCoins,
    addProduct,
    delProduct,
    changeProduct,
    addProducts,
    setEmployers,
    addEmployer,
    delEmployer,
    changeEmployer,
    setClans
} = adminSlice.actions

export default adminSlice.reducer