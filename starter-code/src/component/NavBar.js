import React, { useEffect, useRef } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkRef = useRef(null);

  useEffect(() => {
    linkRef.current.focus();
  }, []);
  return (
    <div className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/overview"
              ref={linkRef}
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/manage"
            >
              Manage
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
