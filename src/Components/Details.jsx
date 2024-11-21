import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import axios from "../utils/axios";
import Loading from "./Loading";
function Details() {
  const [product,setProduct]=useState(null)
const {id}=useParams()
  const getSingleProduct = async()=>{
    try{
     const {data} = await axios.get(`products/${id}`)
     setProduct(data)
    }catch(e){
      console.log(e)
    }
};

useEffect(()=>{
  getSingleProduct()
},[])

  return ( product ?
    <div className="w-[70%] flex justify-center items-center gap-10  h-full m-auto p-[10%] ">
        <img className=" w-[40%] h-[80%] object-contain " src={`${product.image}`} alt="" />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">{product.price}</h2>
        <p className="mb-5">{product.description}</p>
        <Link className="py-2 mr-5 px-6 border rounded border-blue-200 text-blue-300">Edit</Link>
        <Link className="py-2 px-6 border rounded border-trd-200 text-red-300">Delete</Link>
      </div>
    </div>
    :<Loading/>
  )
}

export default Details