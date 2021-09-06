import classes from './MealsSummary.module.css';

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious food, delivered to you</h2>
      <p>Choose one of our classics or try something new.</p>
      <p>All of our dishes are served to order with the highest quality ingredients.</p>
    </section>
  );
}

export default MealsSummary;