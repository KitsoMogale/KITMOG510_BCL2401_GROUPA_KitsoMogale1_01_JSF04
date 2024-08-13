import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

export default pinia;

export const mainStore = defineStore('mainstore',{
     state: ()=>({

        products: [],
        originalProducts: [],
        loading: false,
        error: false,
        sorting: "default",
        searchTerm: "",
        filterItem: "All categories",
        loggedin: localStorage.getItem('token')?true:false,
        cartcount: localStorage.getItem('cartcount')&& localStorage.getItem('token')?localStorage.getItem('cartcount'):0,
        total:localStorage.getItem('total')?Number(localStorage.getItem('total')):0,
     }),

     actions: {

      setTotal(num){
        this.total = num;
      },

      setCartCount(num){
       this.cartcount= num;
      },

      setLoggedin(bool){
        this.loggedin = bool;
      },
        setSorting (sorting) {
            this.sorting = sorting;
          },
        
          setSearchTerm (searchTerm) {
            this.searchTerm = searchTerm;
          },
        
          setFilterItem (category) {
            this.filterItem = category;
          },

         async fetchProducts() {
            if (this.filterItem !== "All categories") {
              try {
                this.loading = true;
                const response = await fetch(  `https://fakestoreapi.com/products/category/${this.filterItem}`);
                if (!response.ok) {
                  throw new Error(
                    "Data fetching failed, please check your network connection"
                  );
                }
                const data = await response.json();
              
                 this.products = data;
                  this.originalProducts = JSON.parse(JSON.stringify(data));
                  this.loading = false;
            
              } catch (error) {
                this.error = error;
              } finally {
                this.sortProducts();
                this.searchProducts();
              }
            } else {
              try {
                this.loading = true;
                const response = await fetch(`https://fakestoreapi.com/products`);
                if (!response.ok) {
                  throw new Error(
                    "Data fetching failed :( , please check your network connection and reload."
                  );
                }
                const data = await response.json();
              
                  this.products= data;
                  this.originalProducts= JSON.parse(JSON.stringify(data));
                  this.loading= false;
               
              } catch (error) {
                this.error = error;
              } finally {
                this.sortProducts();
                this.searchProducts();
              }
            }
          },
        
          sortProducts () {
            if (this.sorting !== "default") {
               console.log(this.sorting)
                this.products= this.products.sort((a, b) =>
                  this.sorting === "low" ? a.price - b.price : b.price - a.price
                );
            } else {
              const { originalProducts } = this;
              this.products= JSON.parse(JSON.stringify(originalProducts)) 
            }
          },
        
          searchProducts() {
            const { originalProducts } = this;
            if (this.searchTerm.trim() !== "") {
              const filteredProducts = originalProducts.filter((product) =>
                product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
              );
              
                this.products= JSON.parse(JSON.stringify(filteredProducts));
             
            }
          },
     }
    
    })