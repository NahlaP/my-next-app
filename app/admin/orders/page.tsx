



// "use client";

// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { Order } from "@/app/types"; 

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const token = useSelector((state: RootState) => state.auth.user?.token);

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [fetchOrders, token]);

//   const updateStatus = async (orderId: string, newStatus: string) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/admin/orders/${orderId}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchOrders();
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading orders...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         <div className="grid gap-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border p-4 rounded-lg shadow-md bg-white">
//                 <p><strong>User:</strong> {order.user?.name}</p>
// <p><strong>Email:</strong> {order.user?.email}</p>

// <p><strong>Total:</strong> ${order.cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>


//               <p><strong>Status:</strong> {order.orderStatus}</p>

//               <div className="mt-2">
//                 <label className="mr-2 font-medium">Change Status:</label>
//                 <select
//                   value={order.orderStatus}
//                   onChange={(e) => updateStatus(order._id, e.target.value)}
//                   className="border px-2 py-1 rounded"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </div>

//               <div className="mt-2">
//                 <h4 className="font-semibold">Items:</h4>
//                 <ul className="list-disc ml-5">
//                   {order.cartItems?.map((item) => (
//                     <li key={item._id}>
//                       {item.name} - {item.quantity} × ${item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;




"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Order } from "@/app/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ORDER_STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.user?.token);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [fetchOrders, token]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    setError(null);
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchOrders();
    } catch (err) {
      setError("Failed to update order status.");
      console.error(err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) return <div className="p-6 text-lg">Loading orders...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const total = order.cartItems?.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ).toFixed(2);

            return (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <p>
                  <strong>User:</strong> {order.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.user?.email}
                </p>

                <p>
                  <strong>Total:</strong> ${total}
                </p>

                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>

                <div className="mt-2">
                  <label className="mr-2 font-medium">Change Status:</label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value as OrderStatus)
                    }
                    disabled={updatingOrderId === order._id}
                    className="border px-2 py-1 rounded"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2">
                  <h4 className="font-semibold">Items:</h4>
                  <ul className="list-disc ml-5">
                    {order.cartItems?.map((item) => (
                      <li key={item._id}>
                        {item.name} - {item.quantity} × ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
