import React  ,{useEffect}from 'react'
import FilterOption from './FilterOption'
import {useSelector,useDispatch} from'react-redux';
import axios from 'axios';
import { fetchBugs, getBugs } from '../../redux/store';

export function Bug() {
    const bugs=useSelector((state)=>state.bugs);
    const dispatch=useDispatch();
     
   
    useEffect(()=>
    {
        console.log("updating component content")
        dispatch(getBugs());  
    },[]);
    
    return bugs.map((bug)=>
    (
        <div key={bug.id} className='heading1'>
            <div className='box11'>{bug.description}</div>
            <div className='box21'>{bug.type}</div>
            <div className='box31'>{bug.status}</div>
            <div className='box41'>{bug.date}</div>
            <FilterOption bug={bug} filter={bug.status} />
        </div>
    ))
}

