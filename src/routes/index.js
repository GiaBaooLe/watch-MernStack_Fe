import ProfilePage from "../pages/ProfilePage/ProfilePage";
import DetailPage from "../pages/DetailPage/DetailPage";
import WatchPage from "../pages/WatchPage/WatchPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ManageWatchPage from "../pages/ManagePage/ManageWatchPage";
import ManageBrandPage from "../pages/ManagePage/ManageBrandPage";
import ManageAccountPage from "../pages/ManagePage/ManageAccountPage";
import ChangePassword from "../pages/ProfilePage/ChangePassword";

export const routes = [
  {
    path: "/",
    page: WatchPage,
    isShowHeader: true,
  },
  {
    path: "/watch",
    page: WatchPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/detail/:id",
    page: DetailPage,
    isShowHeader: true,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: true,
  },
  {
    path: "/register",
    page: RegisterPage,
    isShowHeader: true,
  },
  {
    path: "/watch/manage-watch",
    page: ManageWatchPage,
    isShowHeader: true,
  },
  {
    path: "/brand/manage-brand",
    page: ManageBrandPage,
    isShowHeader: true,
  },
  {
    path: "/account/manage-account",
    page: ManageAccountPage,
    isShowHeader: true,
  },
  {
    path: "/profile/change-password",
    page: ChangePassword,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
