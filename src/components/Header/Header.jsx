import React from "react";
import { LogOutBtn, Logo, Container } from "../index";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../../store/authSlice";

function Header() {
  const dispatch=useDispatch()
  const authStatus = useSelector((state) => state.auth.status);
  const themeMode=useSelector((state)=>state.auth.theme)
  const navigate = useNavigate();
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className={`py-3 shadow ${themeMode === 'dark' ? 'bg-gray-800' : 'bg-blue-400'}`}>
      <Container bg={"bg-gray-800"}>
        <nav className="flex dark:bg-gray-800">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" textcolor='text-white'/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="hidden md:inline-block">

                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 duration-200  hover:bg-blue-200 dark:hover:bg-black rounded-full text-white ${
                        isActive
                          ? "bg-blue-200 rounded-full text-blue-700 dark:bg-black"
                          : "text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            <li className="relative -top-1 pl-[2px]">
              <button className="pt-3" onClick={handleThemeToggle}>{themeMode==="light"?
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            ):
              (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="gray" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
              </svg>
              )
              }</button>
            </li>
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
