import {WorkoutContext} from '../context/WorkoutContext'; // export several things from a file need {}; default doesn't 
import { useContext } from 'react';

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    // check if context is null (when it is not in range of children)
    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider');
    }

    return context;
}
 
export default useWorkoutsContext;
