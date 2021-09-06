import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 60,
    title: 'French I',
    description: 'French'
  },
  {
    id: 'p2',
    price: 50,
    title: 'French II',
    description: 'French 2'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Available Products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(d => (
          <ProductItem
            key={d.id}
            id={d.id}
            title={d.title}
            price={d.price}
            description={d.description}
          />)
        )}
      </ul>
    </section>
  );
};

export default Products;
