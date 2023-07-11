import { useState } from 'react';
import { exerciseOption, fetchData } from '../utils/fetchData';
import ExerciseCard from '../compoents/ExerciseCard';


const url = 'https://exercisedb.p.rapidapi.com/exercises';

const Explore = () => {
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);    


    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if (search){
            const exercisesData = await fetchData(url, exerciseOption);
            const searchedExercises = exercisesData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
            )
            setSearch('');
            setExercises(searchedExercises);
            console.log(searchedExercises)
            }

        } catch (error) {
            console.error(error);
        } 
    }
    return ( 
        <div>
            <form className="search" onSubmit={handleSearch}>
                <div className="search-bar">
                    <input 
                    className="input" 
                    type="text" 
                    placeholder="Enter the exercise you would like to explore" 
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                    <button className="search-btn">Search</button>
                </div>
            
        </form>
        <ExerciseCard exercises={exercises} />
      </div>
     );
}
 
export default Explore;