import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection,  query, where, getDocs } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/layout";


const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const googleProvider = new GoogleAuthProvider();
  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });



  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signed Up Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      userSignupFunction();
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Fetch user data from Firestore
      const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // User exists, fetch data
        const userData = querySnapshot.docs[0].data();
        localStorage.setItem("users", JSON.stringify(userData));
        toast.success("Logged In Successfully");
        navigate("/");
      } else {
        // If user does not exist, create a new entry
        const newUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          role: "user",
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
  
        await addDoc(collection(fireDB, "user"), newUser);
        localStorage.setItem("users", JSON.stringify(newUser));
        toast.success("Signed Up Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      toast.error("Login with Google Failed");
    }
  };
  

  return (
    <Layout>
      <div className="playfair flex justify-center items-center h-screen">
        {loading && <Loader />}

        {/* Image Section */}
        <div
          className="hidden lg:flex w-2/3 h-full relative bg-cover bg-center"
          style={{ backgroundImage: "url('./hero.png')" }}
        ></div>

        {/* Login Form  */}
        <div className="login_Form px-8 py-6 lg:w-2/3 flex flex-col justify-center items-center h-full  shadow-md">
          {/* Top Heading  */}
          <div className="mb-2 text-center">
            <h2 className="text-2xl font-bold text-[#dd3333] ">Signup</h2>
            <p className="text-gray-700 mt-2">
              Welcome to RS Craftmandu! Please enter your details.
            </p>
          </div>

          {/* Input One  */}
          <div className="mb-4 w-96 flex mt-4 justify-center">
            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  name: e.target.value,
                });
              }}
              className=" shadow-md border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-5 w-full flex justify-center">
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  email: e.target.value,
                });
              }}
              className=" shadow-md border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              onKeyDown={handleKeyDown}
              className=" shadow-md  border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Re-Enter Password"
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              onKeyDown={handleKeyDown}
              className=" shadow-md  border border-[#dd3333] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5 w-full flex justify-center mt-4">
            <button
              type="button"
              onClick={userSignupFunction}
              className=" bg-[#dd3333] hover:bg-[#f44444] shadow-md w-96 text-white text-center py-2 font-semibold rounded-md "
            >
              SIGNUP
            </button>
          </div>

          <div className="flex items-center justify-center my-3 w-96">
            <div className="border-t border-gray-400 flex-grow mr-2"></div>
            <div className="text-center text-sm text-gray-600">or</div>
            <div className="border-t border-gray-400 flex-grow ml-2"></div>
          </div>
          <div className="mb-5 mt-4 w-96">
            <button
              type="button"
              onClick={signupWithGoogle}
              className="border border-gray-300 w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google Icon"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>


          <div>
            <h2 className=" text-black">
              Already have an account?{" "}
              <Link
                className=" text-[#dd3333] hover:text-[#f44444] underline underline-offset-2 "
                to={"/login"}
              >
                Login
              </Link>
            </h2>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
