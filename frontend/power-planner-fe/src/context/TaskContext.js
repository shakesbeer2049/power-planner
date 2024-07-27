import {useState, createContext} from 'react';

const TaskContext = createContext({});

export const TaskProvider = ({children}) => {

    return(
        <TaskContext.Provider value={{

        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;