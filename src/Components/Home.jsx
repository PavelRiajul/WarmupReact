import { Link, useLocation } from "react-router-dom"
import Nav from "./Nav"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../utils/Context"
import Loading from "./Loading";
import axios from "../utils/axios";
function Home() {
  const [products] =  useContext(ProductContext);
  const {search}= useLocation();
  const category =decodeURIComponent(search.split("=")[1]);
  
const [filterProducts, setfilterProducts] = useState(null)

const getProductsCategory=async () =>{
  try{
    const {data} = await axios.get(`/products/category/${category}`)
    setfilterProducts(data)
  }catch(e){
    console.log(e)
  }
};


useEffect(()=>{
  if(!filterProducts || category == 'undefined' ) 
    setfilterProducts(products);
if(category != 'undefined') getProductsCategory();
},[category,products])

//console.log(filterProducts)

  return ( products ?
    <>
    <Nav/>
      <div className="h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto" >
        
       {filterProducts&& filterProducts.map((p,i)=>(
        <Link key={i} to={`/details/${p.id}`} 
        className=" mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex justify-center items-center flex-col">

        <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center" 
        style={{
            backgroundImage:`url(${p.image})`}}></div>
        <h1 className="hover:text-blue-300">{p.title}</h1>
      </Link>
       ))}

    


</div>
    </>
  : <Loading/>
  )
}

export default Home