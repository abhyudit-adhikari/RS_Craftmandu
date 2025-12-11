
import { useContext, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const CategoryPage = () => {
    const {categoryname} = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
    
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // add to cart function
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to Cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from Cart")
    }

    useEffect(() => {
    
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);



    return (
        <Layout>
  <div className="playfair mt-10">
    <div className="">
      <h1 className="text-center mb-5 text-2xl font-semibold text-[#dd3333] first-letter:uppercase">
        {categoryname}
      </h1>
    </div>

    {loading ? (
      <div className="flex justify-left">
        <Loader />
      </div>
    ) : (
      <section className="text-gray-600 body-font">
        {/* main 2 */}
        <div className="container px-5 py-5 mx-auto">
          {/* main 3 */}
          <div className="flex flex-wrap -m-4">
            {filterProduct.length > 0 ? (
              <>
                {filterProduct.map((item, index) => {
                  const { id, title, price, productImageUrl } = item;
                  return (
                    <div key={index} className="p-4 w-full md:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-80 h-96 w-full"
                          src={productImageUrl}
                          alt="image"
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

                          <div className="flex justify-center">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => deleteCart(item)}
                                className="bg-[#dd3333] hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold transition duration-300 ease-in-out relative flex justify-center items-center"
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
                                onClick={() => addCart(item)}
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
              </>
            ) : (
              <div>
                <div className="flex justify-center">
                  <img
                    className="mb-2"
                    src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                    alt=""
                  />
                </div>
                <h1 className="text-black text-xl">
                  No {categoryname} product found!
                </h1>
              </div>
            )}
          </div>
        </div>
      </section>
    )}
  </div>
</Layout>


     
    );
}

export default CategoryPage;