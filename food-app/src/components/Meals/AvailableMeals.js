import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/useHttp';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: sendGetRequest } = useHttp();

  useEffect(() => {
    const transformData = (data => {
      const transformedData = [];

      for (let key in data) {
        transformedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      setMeals(transformedData);
    });

    sendGetRequest(
      {
        url: 'your_server_url'
      }, transformData);
  }, [sendGetRequest]);

  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading &&
              <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <div className="spinner"></div>
            </div>
          }
          {(!isLoading && error) && <p style={{ textAlign: 'center' }}>{error}</p>}
          {(!isLoading && !error) && mealsList}
        </ul>
      </Card>
    </section >
  );
}

export default AvailableMeals;