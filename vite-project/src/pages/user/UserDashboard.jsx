import { useContext, useState } from "react";
import Layout from "../../components/layout/layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import '@fortawesome/fontawesome-free/css/all.min.css';


const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, getAllOrder } = context
    // console.log(getAllOrder)

    // console.log(user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');
    const [newEmail, setNewEmail] = useState(user?.email || '');

    // Function to open and close the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to handle Save Changes
    const handleSaveChanges = () => {
        // Assuming user object is updated in localStorage
        localStorage.setItem('users', JSON.stringify({ ...user, name: newName, email: newEmail }));
        toggleModal(); // Close the modal after saving
        // Add any additional actions like API call to save the updated details
    };

    return (
        <Layout>
            <div className="playfair container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className="  py-5 rounded-xl border border-[#dd3333]">
                        {/* image  */}
                        <div className="flex justify-center">
                            <i class="fas fa-user fa-4x" ></i>
                        </div>
                        {/* text  */}
                        <div className="">
                            {/* Name  */}
                            <h1 className=" text-center text-lg mt-4">
                                <span className=" text-[#dd3333] font-semibold">Name : </span>
                                {user?.name}
                            </h1>

                            {/* Email  */}
                            <h1 className=" text-center text-lg">
                                <span className=" text-[#dd3333] font-semibold">Email : </span>
                                {user?.email}
                            </h1>

                            {/* Date  */}
                            <h1 className=" text-center text-lg">
                                <span className=" text-[#dd3333] font-semibold">Date Joined : </span>
                                {user?.date}
                            </h1>

                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={toggleModal}
                                className="text-[#dd3333] hover:text-[#f44444] font-semibold underline"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                <div className="bottom">
                    {/* main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text  */}
                        <h2 className=" playfair text-2xl lg:text-3xl text-[#dd3333] font-bold">Order Details</h2>

                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {/* main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            // console.log(order);
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        // console.log('item', item);
                                        const { id, date, quantity, price, title, productImageUrl, category } = item
                                        // console.log('order', order)
                                        const { status } = order
                                        return (
                                            <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-[#e88686] md:flex-row">
                                                {/* main 3  */}
                                                <div className="w-full border-r border-[#dd3333] md:max-w-xs">
                                                    {/* left  */}
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-[#dd3333]">Order Id</div>
                                                                <div className="text-sm font-medium text-gray-900">#{id}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-[#dd3333]">Order Placed On</div>
                                                                <div className="text-sm font-medium text-gray-900">{date}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-[#dd3333]">Delivery Date</div>
                                                                <div className="text-sm font-medium text-gray-900">Please check your email!😄</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-[#dd3333]">Total Amount</div>
                                                                <div className="text-sm font-medium text-gray-900">Rs. {price * quantity}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-[#dd3333]">Order Status</div>
                                                                <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* right  */}
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                        <ul className="-my-7 divide-y divide-gray-200">
                                                            <li
                                                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                                            >
                                                                <div className="flex flex-1 items-stretch">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                            src={productImageUrl}
                                                                            alt="img"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                        </div>

                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className="text-right text-sm font-bold text-gray-900">Rs. {price}</p>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}

                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-[#f9f9f9] border-2 border-[#dd3333] shadow-md rounded-lg w-1/3 p-6">
                        <button
                                onClick={toggleModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            {/* Modal Title */}
                            <h2 className="text-2xl font-semibold text-center text-[#dd3333] mb-6">Edit Your Profile</h2>
                            {/* Name Input */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm text-[#dd3333] font-semibold">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your New Name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-2 border border-[#dd3333] shadow-md rounded-md"
                                />
                            </div>
                            {/* Email Input */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm text-[#dd3333] font-semibold"> Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Your New E-mail"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full p-2 border  border-[#dd3333] shadow-md rounded-md"
                                />
                            </div>
                            {/* Change Password Input */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm text-[#dd3333] font-semibold">New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Your New Password"
                                    className="w-full p-2 border  border-[#dd3333] shadow-md rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-sm text-[#dd3333] font-semibold">Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Re-Enter Your New Password"
                                    className="w-full p-2 border  border-[#dd3333] shadow-md rounded-md"
                                />
                            </div>
                            {/* Action Buttons */}
                            <div className="flex flex-col">
                                {/* Save Changes Button */}
                                <button
                                    className="w-full  py-3 bg-[#88C273] text-white rounded-md font-semibold hover:bg-[#A0D683]"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                {/* Delete Account Button */}
                             
                                    <button
                                        className="w-full mt-4 py-2 bg-[#dd3333] text-white font-semibold rounded-md hover:bg-[#ff4444]"
                                        onClick={() => alert('Delete account functionality')}
                                    >
                                        Delete Account
                                    </button>
                             


                            </div>
                            {/* Close Modal */}
                            <button
                                onClick={toggleModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default UserDashboard;