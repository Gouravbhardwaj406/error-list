import React, { useState ,useEffect,useContext} from "react";
import { useSelector,useDispatch } from "react-redux";
import { addBug} from "../../redux/store";
import { STATUS } from "./Constants";
import { InputContext,SetInputContext } from "./ListContainer";
import { validateInput } from "./utils";
import axios  from "axios";

export function BugInput({inputRef})
{
    const input= useContext(InputContext);
    const setInput= useContext(SetInputContext)
   
    const dispatch = useDispatch();
    
    

     const submitHandler=()=>
     { 
        const { isValid, message } = validateInput(input);
            if (isValid) {
                setInput({description:'',type:''});
                dispatch(addBug(input));
            }
            else {
                alert(message);
            }

     }


    return (
        <div>
            <div className="new-task">
            <div className="heading">New Bug</div>
            <div className="inputbox">
                <div className="project-name">
                    <div className="projectName">Bug Description</div>
                    <input ref={inputRef} placeholder="Raise your Bug" value={input.description} onChange={e=>setInput({...input,description:e.target.value}) } />
                </div>
                <div className="technology-name">
                    <div className="technologyName">Raised in</div>
                    <select className="inputtechnology" value={input.type} onChange={e=>setInput({...input,type:e.target.value})}>
                        <option></option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="nodejs">Nodejs</option>
                        <option value="dotnet">Dot net</option>
                    </select>
                </div>
                <button className="addButton" onClick={submitHandler}>Add Bug</button>
            </div>
        </div>
        </div>
    )
}