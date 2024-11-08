import { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <header className="flex sticky top-0 z-50 justify-between ml-2 rounded-[6px]  mt-2 px-8 secondary_bg items-center ">
      <div className="flex gap-2 items-center ">
        {/* <FaAngleLeft className="bg-white/10 text-3xl p-1  rounded-[50%] " />
        <FaAngleRight className="bg-white/10 text-3xl p-1  rounded-[50%] " /> */}
        <div className="flex items-center h-20">
          <Link to={"/"} className="flex items-center gap-6 mr-10">
            <BiSolidHome className="font-bold text-2xl" />
            {/* <span className="text-lg">Home</span> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
