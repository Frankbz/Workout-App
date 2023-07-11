const ExerciseCard = ({exercises}) => {
    return ( 
        <div className="exercise-container">
        {exercises.map((exercise) => (
            <div className="exercise-card" key={exercise.id}>
            <div className="target-muscle">{exercise.target}</div>
            <div className="image-container">
                <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
            </div>
            <h2 className="exercise-name">{exercise.name}</h2>
            </div>
        ))}
        </div>
     );
}
 
export default ExerciseCard;