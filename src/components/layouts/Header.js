import React from "react";
import Button from "components/button/Button";
import { useAuth } from "contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const navLink = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;
  .container {
    display: flex;
    align-items: center;
  }
  .header-main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 20px;
    list-style: none;
    font-weight: 500;
  }
  .header-right {
    margin-left: auto;
    display: flex;
  }
  .search {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 8px;
    /* max-width: 320px; */
    width: 100%;
    padding: 8px 15px;
  }
  .search-input {
    flex: 1;
    padding-right: 20px;
  }
  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const ButtonSignUp = styled(Button)`
  width: 150px;
  height: auto;
  padding: 10px;
  margin-left: 10px;
`;

function getLastName(name) {
  if(!name) return ""
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
function Header() {
  const { userInfo } = useAuth(); // trong context Api;
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="" className="logo" />
          </NavLink>
          <ul className="menu">
            {navLink.map((item, index) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="header-right">
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts ... "
            />
            <span className="search-icon">
              <svg
                width={18}
                height={17}
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {
            !userInfo ? (
              <div className="sign-up">
            <ButtonSignUp type="button">
              <NavLink to={"/sign-up"}>
                Sign Up
              </NavLink>
              
            </ButtonSignUp>
          </div>
            ) : (
              <>
                <div className="">
                  {getLastName(userInfo?.displayName)}
                </div>
                <Link to="dashboard"  className="bg-green-300 flex items-center justify-center ml-3">Dashboard</Link>
              </>
            )
          }
          
        </div>
      </div>
    </HeaderStyles>
  );
}

export default Header;
