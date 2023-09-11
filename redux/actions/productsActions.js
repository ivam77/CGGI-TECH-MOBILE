import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const read_products = createAsyncThunk(
    'read_products',async () => {
        console.log()
        try {
            let {data} = await axios.get("https://mobile-cggi.onrender.com/api/products")
            return data.response
        } catch (error) {
            console.log(error)
            return null;
        }
    }
)
const read_pag_appliances=createAsyncThunk(
    'read_pag_appliances',async (page) => {
        
        try {
            let {data} = await axios.get(`https://mobile-cggi.onrender.com/api/products/appliances?page=${page}`)
            console.log(data)
            return {
                products: data.response, 
                prevPage: data.prev,      
                nextPage: data.next,     
                totalPages: data.totalDocuments,
                currentPage:data.currentPage 
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)
const read_pag_techs=createAsyncThunk(
    'read_pag_techs',async (page) => {
        
        try {
            let {data} = await axios.get(`https://mobile-cggi.onrender.com/api/products/techs?page=${page}`)
            console.log(data)
            return {
                products: data.response, // Datos de productos y electrodomésticos
                prevPage: data.prev,      // Valor prev
                nextPage: data.next,      // Valor next
                totalPages: data.totalDocuments,
                currentPage:data.currentPage // Total de páginas
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)
const read_pag_gamers=createAsyncThunk(
    'read_pag_gamers',async (page) => {
        
        try {
            let {data} = await axios.get(`https://mobile-cggi.onrender.com/api/products/gamers?page=${page}`)
            console.log(data)
            return {
                products: data.response, 
                prevPage: data.prev,      
                nextPage: data.next,      
                totalPages: data.totalDocuments,
                currentPage:data.currentPage
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)

const update_product = createAsyncThunk(
    'update',
    async (product) => {
      try {
        const response = await axios.put( `https://mobile-cggi.onrender.com/api/products/${product._id}`, product );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  const delete_product = createAsyncThunk(
    'delete',
    async (productId) => {
      try {
        const response = await axios.delete(`https://mobile-cggi.onrender.com/api/products/${productId}`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
);


const productsActions = { read_products, read_pag_appliances, read_pag_techs, read_pag_gamers, update_product, delete_product }
export default productsActions