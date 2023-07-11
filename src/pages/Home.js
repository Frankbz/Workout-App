import { useEffect } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext";

// components
import WorkoutDetails from '../compoents/WorkoutDetails';
import WorkoutForm from '../compoents/WorkoutForm';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    // fetch workouts from the backend
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {'Authorization': `Bearer ${user.token}`}});
            const json = await response.json();
            if (response.ok){
                dispatch({type: "SET_WORKOUTS", payload: json});
            }
        } 
        if (user) {
            fetchWorkouts()
        }
        
    }, [dispatch, user])
    
    return ( 
        <div className="home">
            <div className="workouts">
                {/* only when workouts is not null we map through it*/}
                { workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id}  workout={workout} />
                ))}
            </div>
            <WorkoutForm/>
        </div>
     );
}
 
export default Home;