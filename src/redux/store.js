import axios from "axios";
import { createStore ,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import { STATUS } from "../components/bugs/Constants";

export const GET_BUGS='GET_BUGS';
export const ADD_BUG='ADD_BUG';
export const REMOVE_BUG='REMOVE_BUG';
export const RESOLVE_BUG='RESOLVE_BUG';
export const EDIT_BUG='EDIT_BUG';
export const LOADING='LOADING';

export const fetchBugs=()=>
{
    return new Promise(async(resolve,reject)=>
    {
        const {data}=await axios.get('http://localhost:3006/bugs');
        resolve(data);
    })
}

export const getBugs=()=>
{
    return async(dispatch)=>
    {
        const data=await fetchBugs();
        dispatch({type:GET_BUGS,payload:data})
    }
}

export const addBug=(bug)=>
{
    return async(dispatch)=>
    {
        const finalInput={...bug,status:STATUS.INPROGRESS,id:Math.floor(Math.random()*10000),date:new Date().toLocaleDateString()}
        const {data}=await axios.post('http://localhost:3006/bugs',finalInput);
        console.log("dispatching");
        console.log(data);
        dispatch({type:ADD_BUG,payload:data});
    }
   
}

export const removeBug=(bug)=>
{
    return  async(dispatch)=>
    {
        const {data}=await axios.delete(`http://localhost:3006/bugs/${bug.id}`);
        dispatch({type:REMOVE_BUG,payload:bug});
    }
}
export const resolveBug=(bug)=>
{
    return async(dispatch)=>{
        const {data}=await axios.put(`http://localhost:3006/bugs/${bug.id}`,{...bug,status:STATUS.COMPLETED})
        dispatch({type:RESOLVE_BUG,payload:data})
    }
}

export const editBug=(bug)=>
{
    return  async(dispatch)=>
    {
        
        const data=await axios.delete(`http://localhost:3006/bugs/${bug.id}`);
        console.log(data);
        dispatch({type:EDIT_BUG,payload:bug});
    }
}




const initialState={
    bugs:[],
    error:'',
    isLoading:false
}



export const reducer=(state=initialState,action)=>
{
    switch(action.type){
        case ADD_BUG:
            console.log(action.payload);
            return {...state,bugs:[...state.bugs,action.payload]}
        case REMOVE_BUG:
            console.log(action.payload)
            const filtered=state.bugs.filter(bug=>bug.id!==action.payload.id)
            console.log(filtered);
            return {...state,bugs:filtered}
        case RESOLVE_BUG:
            const rest=state.bugs.filter(bug=>bug.id!==action.payload.id);
            const resolvedBug=state.bugs.find(bug=>bug.id===action.payload.id);
            const complete={...resolvedBug,status:STATUS.COMPLETED}
            return{...state,bugs:[...rest,complete]}
        case EDIT_BUG:
            const unEdited=state.bugs.filter(bug=>bug.id!==action.payload.id);
            return {...state,bugs:unEdited}
        case GET_BUGS:
            console.log(action.payload);
            return {...state,bugs:[...state.bugs,...action.payload]}
        default:
            return state
    }
}


export const store=createStore(reducer,applyMiddleware(ReduxThunk));