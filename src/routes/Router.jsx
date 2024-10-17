import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ManageUserAddress from "../components/admin/address/ManageUserAddress";
import ManageUser from "../components/admin/user/ManageUser";
import UpdateUser from "../components/admin/user/UpdateUser";
import HomePage from "../components/HomePage";
import AddAddress from "../components/user/address/AddAddress";
import EditAddress from "../components/user/address/EditAddress";
import UserAddress from "../components/user/address/UserAddress";
import Login from "../components/user/auth/Login";
import Logout from "../components/user/auth/Logout";
import Register from "../components/user/auth/Register";
import ViewProfile from "../components/user/profile/ViewProfile";
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
// Function to get the access token from cookies
var adminUrl = "/admin";

const getAccessToken = async () => {
  if (!localStorage.getItem("token")) {
    return false;
  }
  try {
    const data = await api.post("Users/token/check");

    if (data.success) {
      console.log(data);
      return localStorage.getItem("token");
    } else {
      localStorage.removeItem("token");
      console.log(data);
      return false;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

// Function to check if the user is authenticated
const isAuthenticated = async () => {
  const token = await getAccessToken();
  return !!token; // !! la chuyen doi ve kieu boolean
};

// Function to check if the user is admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.roleId >= 3;
};

// Create the router configuration
const router = createBrowserRouter([
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
    path: "/upload-file",
    element: <UploadFile />,
    index: true,
  },
  {
    element: <ProtectedRoute isAuthenticated={await isAuthenticated()} />,
    children: [
      {
        path: "/view-profile",
        element: <ViewProfile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/add-address",
        element: <AddAddress />,
      },
      {
        path: "/user-address",
        element: <UserAddress />,
      },
      {
        path: "/edit-address/:addressId",
        element: <EditAddress />,
      },
      {
        path: "/user-payment",
        element: <UserPayment />,
      },
      {
        path: "/add-payment/",
        element: <AddPayment />,
      },
      {
        path: "/edit-payment/:id",
        element: <EditPayment />,
      },
      {
        path: "/create-order/",
        element: <CreateOrder />,
      },
      {
        path: "/orders",
        element: <UserOrder />,
      },
      {
        path: "/order-detail/:orderId",
        element: <UserOrderDetail />,
      },
      {
        path: "/feedback/:orderId",
        element: <CreateFeedback />,
      },
      {
        path: "/manage-feedback/",
        element: <ManageFeedBack />,
      },
      {
        path: "/edit-feedback/:customerFeedbackId",
        element: <EditFeedback />,
      },
      {
        path: "/add-document/:orderId/:userId",
        element: <AddDocument />,
      },
      {
        path: "/edit-document/:documentId",
        element: <EditDocument />,
      },
      {
        path: "/manage-document/:orderId",
        element: <ManageDocument />,
      },
      {
        path: "/add-notification",
        element: <CreateNotification />,
      },
      {
        path: "/get-notification",
        element: <GetNotification />,
      },

      {
        element: <AdminRoute isAdmin={isAdmin()} />,
        children: [
          {
            path: adminUrl + "/manage-user",
            element: <ManageUser />,
          },
          {
            path: adminUrl + "/update-user/:id",
            element: <UpdateUser />,
          },
          {
            path: adminUrl + "/user-address/:id",
            element: <ManageUserAddress />,
          },
          {
            path: adminUrl + "/manage-koi/",
            element: <ManageKoi />,
          },
          {
            path: adminUrl + "/edit-koi/:koiId",
            element: <EditKoi />,
          },
          {
            path: adminUrl + "/add-koi/",
            element: <CreatKoi />,
          },
          {
            path: adminUrl + "/manage-order-service-detail/",
            element: <ManageOrderServiceDetail />,
          },
          {
            path: adminUrl + "/add-order-service-detail/",
            element: <AddOrderServiceDetail />,
          },
          {
            path: adminUrl + "/update-order-service-detail/:id",
            element: <EditOrderServiceDetail />,
          },
          {
            path: adminUrl + "/manage-payment-type/",
            element: <ManagePaymentType />,
          },
          {
            path: adminUrl + "/edit-payment-type/:id",
            element: <EditPaymentType />,
          },
          {
            path: adminUrl + "/add-payment-type/",
            element: <AddPaymentType />,
          },
          {
            path: adminUrl + "/manage-faq/",
            element: <ManageFaq />,
          },
          {
            path: adminUrl + "/update-faq/:faqId",
            element: <UpdateFaq />,
          },
          {
            path: adminUrl + "/new-faq/",
            element: <NewFaq />,
          },
          {
            path: adminUrl + "/manage-order/",
            element: <ManageOrder />,
          },
          {
            path: adminUrl + "/manage-order-detail/:orderId/",
            element: <ManageOrderDetail />,
          },
          {
            path: adminUrl + "/create-transportation-report/:orderId/",
            element: <CreateTransportationReportDetails />,
          },
          {
            path: adminUrl + "/manage-transportation-report/",
            element: <ManageTransportationReportDetails />,
          },
          {
            path: adminUrl + "/edit-transportation-report/:reportId",
            element: <EditTransportationReportDetails />,
          },
          {
            path: adminUrl + "/edit-blog-news/:postId",
            element: <EditBlogNews />,
          },
          {
            path: adminUrl + "/manage-blog-news/",
            element: <ManageBlogNews />,
          },
          {
            path: adminUrl + "/create-blog-news/",
            element: <CreateBlogNews />,
          },
          {
            path: adminUrl + "/edit-certification/:certificationId",
            element: <EditCertification />,
          },
          {
            path: adminUrl + "/manage-certification/",
            element: <ManageCertification />,
          },
          {
            path: adminUrl + "/create-certification/",
            element: <CreateCertification />,
          },
          {
            path: adminUrl + "/manage-notification/",
            element: <ManageNotification />,
          },
          {
            path: adminUrl + "/manage-order-document/",
            element: <ManageOrderDocument />,
          },
          {
            path: adminUrl + "/create-order-document/:orderId/:orderStatusId",
            element: <CreateOrderDocument />,
          },
          {
            path: adminUrl + "/edit-order-document/:orderId",
            element: <EditOrderDocument />,
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
