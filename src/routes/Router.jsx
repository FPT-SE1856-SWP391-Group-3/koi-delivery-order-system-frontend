import { createBrowserRouter } from "react-router-dom";
import ManageUserAddress from "../components/admin/address/ManageUserAddress";
import ManageUser from "../components/admin/user/ManageUser";
import UpdateUser from "../components/admin/user/UpdateUser";
import HomePage from "../components/HomePage";
import BlogNews from "../components/BlogNews";
import CustomerSupport from "../components/CustomerSupport";
import Service from "../components/Service";
import Recruitment from "../components/Recruitment";
import AddAddress from "../components/user/address/AddAddress";
import EditAddress from "../components/user/address/EditAddress";
import UserAddress from "../components/user/address/UserAddress";
import Login from "../components/user/auth/Login";
import Logout from "../components/user/auth/Logout";
import Register from "../components/user/auth/Register";
import ViewProfile from "@components/user/profile/ViewProfile";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import UserPayment from "../components/user/payment/UserPayment";
import AddPayment from "../components/user/payment/AddPayment";
import EditPayment from "../components/user/payment/EditPayment";
import ManageKoi from "../components/admin/koi/ManageKoi";
import EditKoi from "../components/admin/koi/EditKoi";
import CreatKoi from "../components/admin/koi/CreateKoi";
import ManageOrderServiceDetail from "../components/admin/orderServiceDetail/ManageOrderServiceDetail";
import AddOrderServiceDetail from "../components/admin/orderServiceDetail/AddOrderServiceDetail";
import EditOrderServiceDetail from "../components/admin/orderServiceDetail/EditOrderServiceDetail";
import ManagePaymentType from "../components/admin/payment/ManagePaymentMethod";
import EditPaymentType from "../components/admin/payment/EditPaymentMethod";
import AddPaymentType from "../components/admin/payment/AddPaymentMethod";
import ManageFaq from "../components/admin/faq/ManageFaq";
import UpdateFaq from "../components/admin/faq/UpdateFaq";
import NewFaq from "../components/admin/faq/NewFaq";
import CreateOrder from "../components/user/order/CreateOrder";
import UserOrder from "../components/user/order/UserOrder";
import UserOrderDetail from "../components/user/order/UserOrderDetail";
import ManageOrder from "../components/admin/order/ManageOrder";
import ManageOrderDetail from "../components/admin/order/ManageOrderDetail";
import CreateFeedback from "../components/user/feedback/CreateFeedback";
import ManageFeedBack from "../components/user/feedback/ManageFeedback";
import EditFeedback from "../components/user/feedback/EditFeedback";
import AddDocument from "../components/user/document/AddDocument";
import CreateTransportationReportDetails from "../components/admin/report/CreateTransportationReportDetails";
import ManageTransportationReportDetails from "../components/admin/report/ManageTransportationReportDetails";
import EditProfile from "../components/user/profile/EditProfile";
import EditTransportationReportDetails from "../components/admin/report/EditTransportationReportDetails";
import EditBlogNews from "../components/admin/blogandnews/EditBlogNews";
import ManageBlogNews from "../components/admin/blogandnews/ManageBlogNews";
import CreateBlogNews from "../components/admin/blogandnews/CreateBlogNews";
import UploadFile from "../components/test/UploadFile";
import ManageCertification from "../components/admin/certification/ManageCertification";
import EditCertification from "../components/admin/certification/EditCertification";
import CreateCertification from "../components/admin/certification/CreateCertification";
import api from "../api/CallAPI";
import EditDocument from "../components/user/document/EditDocument";
import ManageDocument from "../components/user/document/ManageDocument";
import CreateNotification from "../components/admin/notification/CreateNotification";
import ManageNotification from "../components/admin/notification/ManageNotification";
import GetNotification from "../components/user/notification/GetNotification";
import UpdatePassword from "../components/user/profile/UpdatePassword";
import ManageOrderDocument from "../components/admin/order/OrderDocument";
import EditOrderDocument from "../components/admin/order/EditOrderDocument";
import CreateOrderDocument from "../components/admin/order/CreateOrderDocument";
import ComponentPath from "./ComponentPath";
import UserDashboard from "@components/user/dashboard/UserDashboard";
import AdminDashboard from "@components/admin/dashboard/AdminDashboard";
import { useEffect } from "react";
import CreateOrderInter from "../components/user/order/CreateOrderInter";
import ChoosePayment from "../components/user/payment/ChoosePayment";
import CallBackPayment from "../components/user/payment/CallBackPayment";
import Dashboard from "../components/user/dashboard/Dashboard";

// Function to get the access token from cookies
var adminUrl = "/admin";

// // Function to check if the user is authenticated
// const isAuthenticated = async () => {
//   const token = await getAccessToken();
//   return !!token; // !! la chuyen doi ve kieu boolean
// };

// Function to check if the user is admin
const isAdmin = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.roleId >= 3;
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/ChoosePayment",
    element: <ChoosePayment />,
  },
  {
    path: "/CallBackPayment",
    element: <CallBackPayment />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "/news",
    element: <BlogNews />,
    index: true,
  },
  {
    path: "/customer-support",
    element: <CustomerSupport />,
    index: true,
  },
  {
    path: "/services",
    element: <Service />,
    index: true,
  },
  {
    path: "/recruitment",
    element: <Recruitment />,
    index: true,
  },
  // {
  //   path: ComponentPath.uploadFile,
  //   element: <UploadFile />,
  //   index: true,
  // },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ComponentPath.user.dashboard,
        element: <UserDashboard />,
      },
      {
        path: ComponentPath.user.payment.createPayment,
        element: <AddPayment />,
      },
      {
        path: ComponentPath.user.user.updatePassword,
        element: <UpdatePassword />,
      },
      {
        path: "/CreateOrderInter",
        element: <CreateOrderInter />,
      },
      {
        path: ComponentPath.user.order.createOrder,
        element: <CreateOrder />,
      },
      {
        path: ComponentPath.user.profile.viewProfile,
        element: <ViewProfile />,
      },
      {
        path: ComponentPath.user.profile.editProfile,
        element: <EditProfile />,
      },
      {
        path: ComponentPath.user.profile.updatePassword,
        element: <UpdatePassword />,
      },
      {
        path: ComponentPath.user.address.createAddress,
        element: <AddAddress />,
      },
      {
        path: ComponentPath.user.address.viewAddress,
        element: <UserAddress />,
      },
      {
        path: ComponentPath.user.address.editAddress + ":addressId",
        element: <EditAddress />,
      },
      {
        path: ComponentPath.user.payment.viewPayment,
        element: <UserPayment />,
      },
      {
        path: ComponentPath.user.payment.createPayment,
        element: <AddPayment />,
      },
      {
        path: ComponentPath.user.payment.editPayment + ":paymentId",
        element: <EditPayment />,
      },
      {
        path: ComponentPath.user.order.createOrder,
        element: <CreateOrder />,
      },
      {
        path: ComponentPath.user.order.viewOrder,
        element: <UserOrder />,
      },
      {
        path: ComponentPath.user.order.orderDetai.viewOrderDetail + ":orderId",
        element: <UserOrderDetail />,
      },
      {
        path: ComponentPath.user.feedback.createFeedback + ":orderId",
        element: <CreateFeedback />,
      },
      {
        path: ComponentPath.user.feedback.manageFeedback,
        element: <ManageFeedBack />,
      },
      {
        path: ComponentPath.user.feedback.editFeedback + ":customerFeedbackId",
        element: <EditFeedback />,
      },
      {
        path: ComponentPath.user.document.createDocument + ":orderId/:userId",
        element: <AddDocument />,
      },
      {
        path: ComponentPath.user.document.editDocument + ":documentId",
        element: <EditDocument />,
      },
      {
        path: ComponentPath.user.document.manageDocument + ":orderId",
        element: <ManageDocument />,
      },
      {
        path: ComponentPath.user.notification.createNotification,
        element: <CreateNotification />,
      },
      {
        path: ComponentPath.user.dashboard,
        element: <UserDashboard />,
      },
      {
        path: ComponentPath.user.notification.viewNotification,
        element: <GetNotification />,
      },
      {
        path: ComponentPath.user.notification.viewNotification,
        element: <GetNotification />,
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: ComponentPath.admin.user.manageUser,
            element: <ManageUser />,
          },
          {
            path: ComponentPath.admin.user.editUser + ":id",
            element: <UpdateUser />,
          },
          {
            path: ComponentPath.admin.address.manageUserAddress + ":id",
            element: <ManageUserAddress />,
          },
          {
            path: ComponentPath.admin.koi.manageKoi,
            element: <ManageKoi />,
          },
          {
            path: ComponentPath.admin.koi.editKoi + ":koiId",
            element: <EditKoi />,
          },
          {
            path: ComponentPath.admin.koi.createKoi,
            element: <CreatKoi />,
          },
          {
            path: ComponentPath.admin.order.service.manageOrderService,
            element: <ManageOrderServiceDetail />,
          },
          {
            path: ComponentPath.admin.order.service.createOrderService,
            element: <AddOrderServiceDetail />,
          },
          {
            path: ComponentPath.admin.order.service.editOrderService + ":id",
            element: <EditOrderServiceDetail />,
          },
          {
            path: ComponentPath.admin.payment.managePaymentType,
            element: <ManagePaymentType />,
          },
          {
            path: ComponentPath.admin.payment.editPaymentType + ":id",
            element: <EditPaymentType />,
          },
          {
            path: ComponentPath.admin.payment.addPaymentType,
            element: <AddPaymentType />,
          },
          {
            path: ComponentPath.admin.faq.manageFaq,
            element: <ManageFaq />,
          },
          {
            path: ComponentPath.admin.faq.editFaq + ":faqId",
            element: <UpdateFaq />,
          },
          {
            path: ComponentPath.admin.faq.createFaq,
            element: <NewFaq />,
          },
          {
            path: ComponentPath.admin.order.manageOrder,
            element: <ManageOrder />,
          },
          {
            path: ComponentPath.admin.order.manageOrderDetail + ":orderId",
            element: <ManageOrderDetail />,
          },
          {
            path: ComponentPath.admin.report.createReport + ":orderId",
            element: <CreateTransportationReportDetails />,
          },
          {
            path: ComponentPath.admin.report.manageReport,
            element: <ManageTransportationReportDetails />,
          },
          {
            path: ComponentPath.admin.report.editReport + ":reportId",
            element: <EditTransportationReportDetails />,
          },
          {
            path: ComponentPath.admin.blogNews.editBlogNews + ":postId",
            element: <EditBlogNews />,
          },
          {
            path: ComponentPath.admin.blogNews.manageBlogNews,
            element: <ManageBlogNews />,
          },
          {
            path: ComponentPath.admin.blogNews.createBlogNews,
            element: <CreateBlogNews />,
          },
          {
            path:
              ComponentPath.admin.certification.editCertification +
              ":certificationId",
            element: <EditCertification />,
          },
          {
            path: ComponentPath.admin.certification.manageCertification,
            element: <ManageCertification />,
          },
          {
            path: ComponentPath.admin.certification.createCertification,
            element: <CreateCertification />,
          },
          {
            path: ComponentPath.admin.notification.manageNotification,
            element: <ManageNotification />,
          },
          {
            path: ComponentPath.admin.order.document.manageOrderDocument,
            element: <ManageOrderDocument />,
          },
          {
            path:
              ComponentPath.admin.order.document.createOrderDocument +
              ":orderId/:orderStatusId",
            element: <CreateOrderDocument />,
          },
          {
            path:
              ComponentPath.admin.order.document.editOrderDocument + ":orderId",
            element: <EditOrderDocument />,
          },
          {
            path: ComponentPath.admin.dashboard,
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
