import React, { useState, useEffect, useRef } from "react";

import { BugInput } from "./BugInput";
import { ACTIONS, STATUS } from "./Constants";
import { Bug } from "./bug";

import { validateInput} from "./utils";
export const InputContext=React.createContext()
export const SetInputContext=React.createContext();
export function ListContainer() {

    const [input,setInput]=useState({description:'',type:''});
    return (
        <InputContext.Provider value={input}>
            <SetInputContext.Provider value={setInput}>
            <div className="main-body">
           
            <BugInput />
            <div className="tasks">
                <div className="heading">Bugs list</div>
                <div className="display-heading">
                    <div className="box1">Bug Description</div>
                    <div className="box2">Raised in</div>
                    <div className="box3">status</div>
                    <div className="box4">Raised on</div>
                    <div className="action-heading">Actions</div>
                </div>
                <div className="display-box">
                    <div className='task-list'>
                        {/* <Bug bugs={bugs} optionHandler={optionHandler}  /> */}
                        <Bug />
                    </div>                   
                </div>
            </div>
        </div>
            </SetInputContext.Provider>
            
        </InputContext.Provider>
        


    )
}