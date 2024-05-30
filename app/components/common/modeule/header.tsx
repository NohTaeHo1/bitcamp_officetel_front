"use client";

import { useEffect, useState } from "react";
import { PG } from "@/app/components/common/enums/PG";
import { useRouter } from "next/navigation";
import LinkButton, { linkButtonTitles } from "@/app/atom/button/LinkButton";
import Link from "next/link";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { destroyCookie, parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { logout } from "../../user/service/user.service";

const pages = ["카운터", "게시글목록", "사용자목록", "게시판목록"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logoutHandler = () => {
    console.log("로그아웃 적용 전 : " + parseCookies().accessToken);
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null, 'accessToken')
        setShowProfile(false)
        router.push('/')
      })
      .catch((err: any) => {
        console.log('로그아웃 에러 : '+err)
      });
  };
  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  useEffect(() => {
    if (parseCookies().accessToken) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [parseCookies().accessToken]);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="http://localhost:3100/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/user/img/coffee.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Home
            </span>
          </Link>
          {!showProfile && (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
            </button>
          )}
        {showProfile &&
          <div className="flex px-4 py-3 float-end">
            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">name@flowbite.com</span>
            <span 
            onClick={logoutHandler}
            className="block text-sm  text-gray-500 truncate dark:text-gray-400"><a href="#">Logout</a>  </span>
          </div>
        }
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {linkButtonTitles.map((item) => (
                <li key={item.id}>
                  <LinkButton
                    id={item.id}
                    title={item.title}
                    path={item.path}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
