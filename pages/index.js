import Layout from "../components/Layout"
import NavBar from '../components/Navigation/NavBar';
import Product from '../components/Product/DisplayProduct'
import allProducts from '../data/products';

export default function Home() {
    return(
        <Layout>
            <NavBar/>
            <Product product={allProducts[0]}/>
        </Layout>
    )
}