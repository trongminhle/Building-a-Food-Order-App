import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem";

const requestConfig = {};

function Meals() {
   const { data, isLoading, error } = useHttp("http://localhost:3000/meals", requestConfig, []);

   if (isLoading) {
      return <p>Fetching meals...</p>;
   }

   console.log(data);

   return (
      <ul id="meals">
         {data.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
         ))}
      </ul>
   );
}

export default Meals;
