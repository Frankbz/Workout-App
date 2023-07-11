import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
    // payload is the workouts we could like to perform action on
    switch(action.type){
        // reset the all workouts
        case "SET_WORKOUTS":
            return { workouts: action.payload } // payload would be an arry of all workouts [{},{}]
        // add a new workout

        case "CREATE_WORKOUT":
            return { workouts: [action.payload, ...state.workouts.reverse()] }
            // add action.payload to orginal workouts (add to top)

        case "DELETE_WORKOUT":
            return {workouts: state.workouts.filter((w) => w._id !== action.payload._id)}
            // left with workouts - the one we want to delete

        default:
            return state
    }
}

const WorkoutContextProvider = ({children}) => {  //children is decstruct from props
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})

    return ( 
        <WorkoutContext.Provider value={{...state, dispatch}}> {/* we pass in a copy of database to children */}
            {children}
        </WorkoutContext.Provider>
     );
}
 
export default WorkoutContextProvider;


