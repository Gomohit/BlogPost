import React from "react";
import { LogOutBtn, Logo, Container } from "../index";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const navigate = useNavigate();

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
    <header className="py-3 shadow bg-blue-400">
      <Container>
        <nav className="flex">
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
                      `inline-block px-6 py-2 duration-200  hover:bg-blue-200 rounded-full text-white ${
                        isActive
                          ? "bg-blue-200 rounded-full text-blue-700"
                          : "text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
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
