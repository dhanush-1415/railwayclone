// import { motion } from "framer-motion";
// import { FiGithub } from "react-icons/fi";
// import { SiPostgresql, SiRedis, SiMongodb, SiMysql } from "react-icons/si";
// import { FaCube } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import { BsBoxes } from "react-icons/bs";

// export default function NewProjectPage() {
//   const items = [
//     {
//       icon: <FiGithub className="text-white text-xl" />, 
//       label: "Deploy from GitHub repo"
//     },
//     {
//       icon: <FaCube className="text-purple-400 text-xl" />, 
//       label: "Deploy a template"
//     },
//     {
//       icon: <SiPostgresql className="text-blue-400 text-xl" />, 
//       label: "Deploy PostgreSQL"
//     },
//     {
//       icon: <SiRedis className="text-red-400 text-xl" />, 
//       label: "Deploy Redis"
//     },
//     {
//       icon: <SiMongodb className="text-green-500 text-xl" />, 
//       label: "Deploy MongoDB"
//     },
//     {
//       icon: <SiMysql className="text-sky-400 text-xl" />, 
//       label: "Deploy MySQL"
//     },
//     {
//       icon: <AiOutlinePlus className="text-green-300 text-xl" />, 
//       label: "Empty project"
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-[#0e0e17] bg-[radial-gradient(#2e2e3f_1px,transparent_0)] bg-[size:20px_20px] text-white flex flex-col items-center justify-center px-4 py-10">
//       <div className="flex flex-col items-center gap-3 mb-10">
//         <div className="text-purple-500 text-2xl flex gap-1">
//           <BsBoxes />
//           <AiOutlinePlus />
//         </div>
//         <h1 className="text-4xl font-bold">New Project</h1>
//         <p className="text-gray-400">Deploy your app to production effortlessly</p>
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.4 }}
//         className="bg-[#171721] w-full max-w-md rounded-xl shadow-lg overflow-hidden"
//       >
//         <div className="p-4 border-b border-gray-700 text-gray-400">
//           What can we help with?
//         </div>
//         <ul className="divide-y divide-gray-700">
//           {items.map((item, idx) => (
//             <li key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f2b] cursor-pointer">
//               {item.icon}
//               <span className="text-sm text-white">{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     </main>
//   );
// }



import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { SiPostgresql, SiRedis, SiMongodb, SiMysql } from "react-icons/si";
import { FaCube } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { useState } from "react";
import Header from "../components/Header";

export default function NewProjectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const allItems = [
    {
      icon: <FiGithub className="text-white text-xl" />, 
      label: "Deploy from GitHub repo"
    },
    {
      icon: <FaCube className="text-purple-400 text-xl" />, 
      label: "Deploy a template"
    },
    {
      icon: <SiPostgresql className="text-blue-400 text-xl" />, 
      label: "Deploy PostgreSQL"
    },
    {
      icon: <SiRedis className="text-red-400 text-xl" />, 
      label: "Deploy Redis"
    },
    {
      icon: <SiMongodb className="text-green-500 text-xl" />, 
      label: "Deploy MongoDB"
    },
    {
      icon: <SiMysql className="text-sky-400 text-xl" />, 
      label: "Deploy MySQL"
    },
    {
      icon: <AiOutlinePlus className="text-green-300 text-xl" />, 
      label: "Empty project"
    },
  ];

  const filteredItems = allItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0e0e17] bg-[radial-gradient(#2e2e3f_1px,transparent_0)] bg-[size:20px_20px] text-white flex flex-col items-center justify-center px-4 py-10">
      <Header projectView={false} />
      <div className="flex flex-col items-center gap-3 mt-20 mb-10">
        <div className="text-app-accent-purple text-2xl flex gap-1">
          <BsBoxes />
          <AiOutlinePlus />
        </div>
        <h1 className="text-4xl font-bold">New Project</h1>
        <p className="text-gray-400">Deploy your app to production effortlessly</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-[#171721] w-full max-w-md rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b border-app-border">
          <input
            type="text"
            placeholder="Search deployment options..."
            className="w-full bg-[#1f1f2b] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <ul className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f1f2b] cursor-pointer">
                {item.icon}
                <span className="text-sm text-white">{item.label}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-400 text-sm">
              No matching options found
            </li>
          )}
        </ul>
      </motion.div>
    </main>
  );
}