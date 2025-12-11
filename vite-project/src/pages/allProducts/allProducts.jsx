import { useNavigate } from "react-router";
import Layout from "../../components/layout/layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // State for the price filter
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter products based on price
  const filteredProducts = getAllProduct.filter(
    (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
  );

  return (
    <Layout>
      <div className="playfair py-8">
        {/* Heading */}
        <div>
          <h1 className="text-center mb-5 text-2xl text-[#dd3333] font-semibold">
            ALL PRODUCTS
          </h1>
        </div>

        {/* Price Filter */}
        <div className="flex justify-center mb-5">
          <label className="mr-2 text-gray-700">Filter by Price:</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="mr-2"
          />
          <span>Up to Rs. {priceRange[1]}</span>
        </div>

        {/* Main */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap -m-4">
              {filteredProducts.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/productinfo/${id}`)}
                    className="p-4 w-full md:w-1/4"
                  >
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:scale-105">
                      <img
                        className="lg:h-80 h-96 w-full object-cover transition-all duration-300 ease-in-out"
                        src={productImageUrl}
                        alt="product"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-600 mb-1">
                          RS Craftmandu
                        </h2>
                        <h1 className="title-font text-lg font-medium text-[#dd3333] mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          Rs. {price}
                        </h1>
                        <div className="flex justify-center ">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={(event) => {
                                deleteCart(item);
                                event.stopPropagation();
                              }}
                              className="bg-[#dd3333] hover:bg-[#f44444] w-full text-white py-[4px] rounded-lg font-bold transition duration-300 ease-in-out relative flex justify-center items-center"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-white mr-2"
                              />
                              Delete From Cart
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={(event) => {
                                addCart(item);
                                event.stopPropagation();
                              }}
                              className="bg-[#dd3333] hover:bg-[#f44444] w-full text-white py-[4px] rounded-lg font-bold transition duration-300 ease-in-out relative flex justify-center items-center"
                            >
                              <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="text-white mr-2"
                              />
                              Add To Cart
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
