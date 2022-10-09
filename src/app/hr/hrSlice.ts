import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { EventAttendence, EventIE, HRIE} from '../interfaces'
import { AppHRDispatch, RootHRState } from '../hrStore'
import { hrFetcher, useAppDispatch } from '../hooks'


const initState = {
    me: {} as HRIE,
    events: [] as EventIE[],
    currentEvent: "",
    attendences: [] as EventAttendence[],
}

const hrSlice = createSlice(
    {
        name: "hrSlice",
        initialState: initState,
        reducers:{
            setMe(state, action:PayloadAction<HRIE>){
                state.me = action.payload
            },
            setEvents(state, action:PayloadAction<EventIE[]>){
                state.events = action.payload
            },
            setAttendences(state, action:PayloadAction<EventAttendence[]>){
                state.attendences = action.payload
            },
            setCurrentEvent(state, aaction:PayloadAction<string>){
                state.currentEvent = aaction.payload
            },
            addEvent(state, action:PayloadAction<EventIE>){
                state.events = state.events.concat([action.payload])
            },
            delEvent(state, action:PayloadAction<string>){
                let events = state.events
                let ind = 0

                events.forEach((event:EventIE, index:number) => {
                    if(event.slug == action.payload){
                        ind = index
                    }
                });
                events.splice(ind, 1)
                state.events = events
            },
            updateEvent(state, action:PayloadAction<EventIE>){
                let events = state.events
                events.forEach((event:EventIE, index:number) => {
                    if(event.slug == action.payload.slug){
                        events[index] = action.payload
                    }
                });
                state.events = events
            },
            submitAttendance(state, action:PayloadAction<string>){
                let attendences = state.attendences
                
                attendences.forEach((attendance:EventAttendence, index:number) => {
                    if(attendance.worker_username == action.payload){
                        attendences[index].attended = true
                    }
                });
                state.attendences = attendences
            }
            
        }
    }
)




export async function fetchAddEvent(dispatch:AppHRDispatch, params:{name: string, about: string, starts:string, image:File}) {
    //тут идет фетч
    const formData = new FormData()

    formData.append("name",params.name)
    formData.append("about",params.about)
    formData.append("image", params.image)
    formData.append("starts",params.starts)

    hrFetcher.post("events/", formData).then((response)=>{
        dispatch(
            addEvent(
                {
                    name: response.data.name,
                    about: response.data.about,
                    slug: response.data.slug,
                    creator: {
                        wallet: "",
                        role: response.data.creator.type,
                        telegram: response.data.creator.telegram,
                        command: response.data.creator.command,
                        respect: response.data.creator.respect,
                        balance: response.data.creator.money,
                        name: response.data.creator.name
                    } as HRIE,
                    starts: response.data.starts,
                    image: response.data.image,
                    planning: Number(response.data.planning),
                    attended: Number(response.data.attended)
                } as EventIE
            )
        )
        
    })
}

export async function fetchDelEvent(dispatch:AppHRDispatch, params:string) {

    hrFetcher.delete("events/" + params).then(()=>{
        dispatch(delEvent(params))
    })
}

export async function fetchSubmitAttendance(dispatch:AppHRDispatch, user:string, currentEvent:string){
    const formData = new FormData()
    formData.append("username", user)
    
    hrFetcher.post("events/attendance/" + currentEvent + "/submit/", formData).then(response=>{
        dispatch(submitAttendance(user))
    })

    const salaryData = new FormData()
    salaryData.append("username", user)
    salaryData.append("amount", "1")
    hrFetcher.post("blockchain/transact/", salaryData)
}


export const getCurrentEvent = createSelector(
    (state:RootHRState) => state.hrSlice.events.filter(el=> el.slug == state.hrSlice.currentEvent)[0],
    (field)=>field
)
export const getEvents = createSelector(
    (state:RootHRState) => state.hrSlice.events,
    (field)=>field
)
export const getMe = createSelector(
    (state:RootHRState) => state.hrSlice.me,
    (field)=>field
)




export const {
    setEvents,
    setAttendences,
    setCurrentEvent,
    addEvent,
    delEvent,
    updateEvent,
    submitAttendance,
    setMe
} = hrSlice.actions

export default hrSlice.reducer