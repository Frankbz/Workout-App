import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user){
            setError("You must log in first");
            console.log(error)
            return;
        }

        const workout = {title, load, reps};

        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {'Content-type': 'application/json',
                      'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify(workout)
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added', json);
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title: </label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Load (in KG): </label>
            <input type="number" required value={load} onChange={(e) => setLoad(e.target.value)} />

            <label>Repetitons: </label>
            <input type="number" required value={reps} onChange={(e) => setReps(e.target.value)} />

            <button>Add exercise</button>
            {error && <div className="error"> {error}</div>}
        </form>
     );
}
 
export default WorkoutForm;