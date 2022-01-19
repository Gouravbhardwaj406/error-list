import React,{useContext} from 'react'
import { editBug, removeBug, resolveBug, } from '../../redux/store';
import { ACTIONS, STATUS } from './Constants'
import {useDispatch} from 'react-redux';
import { SetInputContext } from './ListContainer';



function FilterOption({bug,filter}) {
    
    
    const setInput=useContext(SetInputContext);

   
    const dispatch = useDispatch()
    const optionHandler = (data, option) => {
       
        if (option === ACTIONS.COMPLETED) {
            console.log('task completed')
            completeHandler(data);
        }
        else if (option === ACTIONS.EDIT) {
            console.log('edit bug');
            editHandler(data);
        }
        else if (option === ACTIONS.REMOVE) {
            console.log('performing remove')
            removeHandler(data);
        }
    }


     const removeHandler = (data) => {
        dispatch(removeBug(data))
    }

    const editHandler = (data) => {
        setInput({description:data.description,type:data.type})
        
       dispatch(editBug(data))
    }

    const completeHandler = (data) => {
        dispatch(resolveBug(data));
        
    }


    
  

   



    if(filter===STATUS.INPROGRESS)
    {
        return(
      
            <select className='complete3' onChange={(e)=>optionHandler(bug,e.target.value)}>
                    <option >choose</option>
                    <option>completed</option>
                    <option>edit</option>
                    <option>remove</option>
                </select>
    )
    }
    else{
        return(
      
            <button className='addButton1' onClick={()=>optionHandler(bug,ACTIONS.REMOVE)}>remove</button>
    )
    }

   
   
   
}

export default FilterOption