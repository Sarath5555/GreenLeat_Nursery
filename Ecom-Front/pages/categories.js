import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Category} from "@/models/Category";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";



async function matchCategoriesAndProducts() {
  
}



export default function CategoriesPage({products, categories}) {
    return (
      <>
        <Header />
        <Center>
        {categories?.length > 0 && categories.map(category => (
           <div key={category.id}>
              <h2>{category.name}</h2>
              {products?.length > 0 && products.filter(product => product.category === category._id).map(product => (
                 <ProductBox key = {product._id} {...product} />
              ))
        }
          </div>
      ))}
        </Center>
      </>
    );
  }

export async function getServerSideProps() {
    await mongooseConnect();
    const categories = await Category.find({}, null, {sort:{'_id':-1}});
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props:{
        categories: JSON.parse(JSON.stringify(categories)),
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  }