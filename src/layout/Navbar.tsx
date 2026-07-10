import { Link } from "react-router-dom";
import { navLinks } from "../constants/Navigation";
// import logo from "../assets/logo.png";
// import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-8">
        {/* ================= Logo ================= */}
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold text-slate-800">
            Darul Huda
          </Link>
        </div>

        {/* ================= Navigation Links ================= */}
        <div className="ml-16 flex items-center gap-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition-colors duration-200 hover:text-amber-600"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* ================= Right Side ================= */}
        <div className="ml-auto flex items-center gap-4">
          {/* Search */}
          <Link
            to="/search"
            className="rounded-full border border-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-100"
          >
            Search
            {/* <Search size={18} /> */}
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-xl border border-gray-200 px-6 py-2 font-medium transition duration-200 hover:bg-gray-50"
          >
            Login
          </Link>

          {/* Sign Up */}
          <Link
            to="/signup"
            className="rounded-xl bg-violet-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-violet-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import { navLinks } from "../constants/Navigation";
// import { Link } from "react-router-dom";
// // import Search from "../components/common/Search/Search";
// // import logo from "../assets/logo.png";

// const Navbar = () => {
//   return (
//     <nav className="border-b bg-white shadow-sm">
//       <div className="flex gap-6 bg-amber-200 p-4 text-lg font-semibold text-gray-700">
//         <div className="flex items-center gap-2">
//           <Link to="/" className="text-xl font-bold">
//             Darul Huda
//           </Link>
//         </div>

//         {/* used for navigation links */}
//         {navLinks.map((link) => (
//           <Link key={link.path} to={link.path}>
//             {link.title}
//           </Link>
//         ))}

//         {/* <div className="flex items-center gap-4"> */}
//         <Link
//           to="/Search"
//           className="rounded-bl-lg border-amber-900/100 px-4 py-2"
//         >
//           Search
//         </Link>

//         <Link to="/login" className="rounded-lg border px-4 py-2">
//           Login
//         </Link>
//         <Link to="/signup" className="rounded-lg border px-4 py-2">
//           Sign Up
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
