import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
      .slice(0,4)
      .map(({ id, title, description, category, image, price }) => (
        <Product
          key={id}
          id={id}
          title={title}
          description={description}
          category={category}
          image={image}
          price={price}
        />
      ))}
      <img className="md:col-span-full" 
      src="https://links.papareact.com/dyz" />
      <div className="md:col-span-2">
      {products
      .slice(4,5)
      .map(({ id, title, description, category, image, price }) => (
        <Product
          key={id}
          id={id}
          title={title}
          description={description}
          category={category}
          image={image}
          price={price}
        />
      ))}
      </div>
      {products
      .slice(5,products.length)
      .map(({ id, title, description, category, image, price }) => (
        <Product
          key={id}
          id={id}
          title={title}
          description={description}
          category={category}
          image={image}
          price={price}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
