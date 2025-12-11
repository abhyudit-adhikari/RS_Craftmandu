import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setSettingsDropdownOpen(false);
  };
  const toggleSettingsDropdown = () => {
    setSettingsDropdownOpen((prev) => !prev);
  };
  const closeDropdowns = () => {
    setDropdownOpen(false);
    setSettingsDropdownOpen(false);
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveChanges = () => {
    alert(`Saving changes for Name: ${newName}, Email: ${newEmail}`);
    toggleModal();
  };

  const handleDeleteAccount = async () => {
    try {
      const userDocRef = doc(fireDB, "user", user.uid);
      await deleteDoc(userDocRef);

      localStorage.removeItem("users");
      toast.success("Account deleted successfully");
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account: ", error);
      alert("An error occurred while deleting your account. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
  const navListLeft = (
    <ul className="flex flex-col lg:flex-row lg:space-x-10 text-black font-medium text-md"></ul>
  );  

  const navListRight = (
    <ul className="flex flex-row ml-5 lg:flex-row lg:space-x-10 text-black font-medium text-md">
      <li>
        <Link to="/about" className="hover:text-[#dd3333] transition-colors duration-200">
          About Us
        </Link>
      </li>
      {user && (
        <li className="relative  cursor-pointer ">
          <i
            className="fas fa-user-circle text-2xl hover:text-[#dd3333]"
            onClick={toggleDropdown}
          ></i>
          {dropdownOpen && (
            <ul className="absolute top-12 left-0 transform -translate-x-1/2 bg-white shadow-lg rounded-md w-32 text-md">
              <li>
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  }
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <span
                  onClick={toggleSettingsDropdown}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  Settings
                </span>
                {settingsDropdownOpen && (
                  <ul className="absolute top-2 right-full mr-2 bg-white shadow-lg rounded-md w-32">
                    <li>
                      <span
                        onClick={toggleModal}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                      >
                        Edit Profile
                      </span>
                    </li>
                    <hr></hr>
                    <li>
                      <span
                        onClick={toggleDeleteModal}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                      >
                        Delete Account
                      </span>
                    </li>
                  </ul>
                )}
              </li>
              <hr></hr>
              <li onClick={logout} className="cursor-pointer">
                <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Logout
                </span>
              </li>
            </ul>
          )}
        </li>
      )}
      {!user && (
        <li>
          <Link to={"/login"} className="hover:text-[#dd3333]">
            <i className="fas fa-sign-in-alt text-2xl"></i>
          </Link>
        </li>
      )}
      <li className="ml-4">
        <Link to={"/cart"} className="hover:text-[#dd3333]">
          <i className="fas fa-shopping-cart text-2xl">
            <span className="text-xs">({cartItems.length})</span>
          </i>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-white sticky top-0 shadow-md z-50">
      <div className="playfair flex justify-between items-center py-3 px-5 lg:px-10">
        <Link to={"/"}>
          <img src="/rslogo.png" alt="Logo" className="h-12" />
        </Link>
        <button className="lg:hidden text-2xl" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="hidden lg:flex items-center space-x-12">
          {navListLeft}
          <SearchBar />
          {navListRight}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden px-5 py-3 space-y-2 bg-white flex flex-col items-center">
  <div className="flex items-center">
    {navListLeft}
    <SearchBar />
    {navListRight}
  </div>
</div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-[#f9f9f9] border-2 border-[#dd3333] shadow-md rounded-lg w-1/3 p-6">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-semibold text-center text-[#dd3333] mb-6">
              Edit Your Profile
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-[#dd3333] font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-[#dd3333] shadow-md rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-[#dd3333] font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your New E-mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 border border-[#dd3333] shadow-md rounded-md"
              />
            </div>
            <button
              className="w-full py-3 bg-[#dd3333] text-white rounded-md font-semibold hover:bg-[#ff4444]"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-[#f9f9f9] border-2 border-[#dd3333] shadow-md rounded-lg w-1/3 p-6">
            <button
              onClick={toggleDeleteModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-semibold text-center text-[#dd3333] mb-6">
              Delete Your Account?
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteAccount} // Call delete function
                className="px-4 py-2 bg-[#dd3333] text-white rounded-md font-semibold hover:bg-[#ff4444]"
              >
                Delete
              </button>
              <button
                onClick={toggleDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
