import { Timestamp, addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/layout";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageFiles: [],
    category: "",
    productCode: "",
    size: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Category State
  const [categoryList, setCategoryList] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // --- FETCH CATEGORIES FROM FIREBASE ---
  useEffect(() => {
    const q = query(collection(fireDB, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let categoriesArray = [];
      querySnapshot.forEach((doc) => {
        categoriesArray.push({ ...doc.data(), id: doc.id });
      });
      setCategoryList(categoriesArray);
    });
    return () => unsubscribe();
  }, []);

  // --- FUNCTION TO ADD NEW CATEGORY ---
  const addCategoryFunction = async () => {
    if (newCategory === "") {
      return toast.error("Please enter a category name");
    }
    setLoading(true);
    try {
      const categoryRef = collection(fireDB, "categories");
      await addDoc(categoryRef, {
        name: newCategory,
        time: Timestamp.now(),
      });
      toast.success("Category Added Successfully");
      setNewCategory(""); // Clear input
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add category");
    }
  };

  // Handle file selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setProduct({
        ...product,
        productImageFiles: filesArray,
      });
    }
  };

  // Add Product Function
  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.productImageFiles.length === 0 ||
      product.category === "" ||
      product.description === "" ||
      product.productCode === "" ||
      product.size === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    setIsButtonDisabled(true);

    try {
      const storage = getStorage();
      const imageUrls = [];

      await Promise.all(
        product.productImageFiles.map(async (file) => {
          const storageRef = ref(storage, `products/${file.name + Date.now()}`);
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
        })
      );

      const newProduct = {
        ...product,
        productImageUrls: imageUrls,
        productImageUrl: imageUrls[0], 
        productImageFiles: null,
      };

      const productRef = collection(fireDB, "products");
      await addDoc(productRef, newProduct);

      toast.success("Added product successfully!");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      setIsButtonDisabled(false);
      toast.error("Failed to add product!");
    }
  };

  return (
    <Layout>
      <div className="playfair">
        <div
          className="relative flex justify-center items-center min-h-screen py-10"
          style={{
            backgroundImage: "url('src/components/heroSection/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#f9f9f9]"></div>

          {loading && <Loader />}

          <div className=" bg-[#f2f0ef] relative z-10 px-8 py-6 border border-[#dd3333] rounded-xl shadow-md bg-white">
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-[#dd3333] ">
                ADD PRODUCT
              </h2>
            </div>

            {/* Product Title */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                placeholder="Product Title"
                className=" border text-gray-800 border-[#dd3333] px-2 py-2 w-96 rounded-md shadow-md outline-none placeholder-gray-600"
              />
            </div>

            {/* Price (Admin Only) */}
            <div className="mb-3">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="Product Price"
                className="border text-gray-800 border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none shadow-md placeholder-gray-600"
              />
            </div>

            {/* Image File Input */}
            <div className="mb-3">
              <input
                type="file"
                multiple
                name="productImageFiles"
                onChange={handleImageChange}
                className=" border text-gray-800 border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none shadow-md"
              />
              <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
            </div>

            {/* --- NEW CATEGORY SECTION --- */}
            <div className="mb-3 bg-white p-2 border border-dashed border-gray-400 rounded-md">
                <label className="text-sm text-gray-600 mb-1 block">Create New Category:</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g. Valentines"
                        className="w-full px-2 py-1 text-gray-800 border border-gray-300 rounded-md outline-none"
                    />
                    <button 
                        onClick={addCategoryFunction}
                        type="button"
                        className="bg-gray-700 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-900"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Product Category Dropdown */}
            <div className="mb-3">
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full px-1 py-2 text-gray-800  border border-[#dd3333] rounded-md outline-none  "
              >
                <option value="">Select Product Category</option>
                {categoryList.length > 0 ? (
                    categoryList.map((value, index) => {
                        const { name } = value;
                        return (
                            <option className="first-letter:uppercase" key={index} value={name}>
                                {name}
                            </option>
                        );
                    })
                ) : (
                    <option disabled>No categories found. Add one above!</option>
                )}
              </select>
            </div>

            {/* Product Code */}
            <div className="mb-3">
              <input
                type="text"
                name="productCode"
                value={product.productCode}
                onChange={(e) => setProduct({ ...product, productCode: e.target.value })}
                placeholder="Product Code"
                className=" border text-gray-800 border-[#dd3333] px-2 py-2 w-96 rounded-md shadow-md outline-none placeholder-gray-600"
              />
            </div>

            {/* Size */}
            <div className="mb-3">
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={(e) => setProduct({ ...product, size: e.target.value })}
                placeholder="Product Size"
                className="border text-gray-800 border-[#dd3333] px-2 py-2 w-96 rounded-md shadow-md outline-none placeholder-gray-600"
              />
            </div>

            {/* Product Description */}
            <div className="mb-3">
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                name="description"
                placeholder="Product Description"
                rows="5"
                className="w-full px-2 py-1 text-gray-800 border border-[#dd3333] shadow-md rounded-md outline-none placeholder-gray-600 "
              ></textarea>
            </div>

            {/* Add Product Button */}
            <div className="mb-3">
              <button
                onClick={addProductFunction}
                type="button"
                className="bg-[#dd3333] hover:bg-[#f44444] w-full shadow-md text-white text-center py-2 font-bold rounded-md "
                disabled={isButtonDisabled}
              >
                ADD PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductPage;