const page = () => {
  return (
    <div>
      <p>menu list</p>
    </div>
  );
};

export default page;
// ("use client");
// import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import { Switch } from "@/components/ui/switch"; // or any toggle component

// export default function MenuList() {
//   const [foods, setFoods] = useState([]);

//   useEffect(() => {
//     axios.get("/food/list").then((res) => setFoods(res.data));
//   }, []);

//   const handleToggle = async (id: string) => {
//     // optimistic update — flip UI instantly, then confirm with server
//     setFoods((prev) =>
//       prev.map((f) => (f._id === id ? { ...f, available: !f.available } : f)),
//     );

//     try {
//       const res = await axios.patch(`/${id}/toggle-availability`);
//       // sync with actual server value in case it differs
//       setFoods((prev) =>
//         prev.map((f) =>
//           f._id === id ? { ...f, available: res.data.available } : f,
//         ),
//       );
//     } catch (err) {
//       // revert on failure
//       setFoods((prev) =>
//         prev.map((f) => (f._id === id ? { ...f, available: !f.available } : f)),
//       );
//     }
//   };

//   return (
//     <table>
//       <tbody>
//         {foods.map((food) => (
//           <tr key={food._id}>
//             <td>{food.name}</td>
//             <td>₹{food.price}</td>
//             <td>
//               <Switch
//                 checked={food.available}
//                 onCheckedChange={() => handleToggle(food._id)}
//               />
//             </td>
//             <td>
//               <a href={`/partner/dashboard/menu/edit/${food._id}`}>Edit</a>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
