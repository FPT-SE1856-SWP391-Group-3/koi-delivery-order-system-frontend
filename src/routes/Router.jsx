import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import ComponentPath from "./ComponentPath"
import api from "../api/CallAPI"
import path from "path"
import { LazyRoute } from "./LazyRoute"

// Lazy-loaded components
// const ManageUserAddress = lazy(
//     () => import("../components/admin/address/ManageUserAddress")
// )
// const ManageUser = lazy(() => import("../components/admin/user/ManageUser"))
// const UpdateUser = lazy(() => import("../components/admin/user/UpdateUser"))
// const HomePage = lazy(() => import("../components/HomePage"))
// const BlogNews = lazy(() => import("../components/BlogNews"))
// const CustomerSupport = lazy(() => import("../components/CustomerSupport"))
// const Service = lazy(() => import("../components/Service"))
// const Recruitment = lazy(() => import("../components/Recruitment"))
// const AddAddress = lazy(() => import("../components/user/address/AddAddress"))
// const EditAddress = lazy(() => import("../components/user/address/EditAddress"))
// const UserAddress = lazy(() => import("../components/user/address/UserAddress"))
// const Login = lazy(() => import("../components/user/auth/Login"))
// const Logout = lazy(() => import("../components/user/auth/Logout"))
// const Register = lazy(() => import("../components/user/auth/Register"))
// const ViewProfile = lazy(() => import("@components/user/profile/ViewProfile"))
const AdminRoute = lazy(() => import("./AdminRoute"))
const ProtectedRoute = lazy(() => import("./ProtectedRoute"))
// const UserPayment = lazy(() => import("../components/user/payment/UserPayment"))
// const AddPayment = lazy(() => import("../components/user/payment/AddPayment"))
// const EditPayment = lazy(() => import("../components/user/payment/EditPayment"))
// const ManageKoi = lazy(() => import("../components/admin/koi/ManageKoi"))
// const EditKoi = lazy(() => import("../components/admin/koi/EditKoi"))
// const CreatKoi = lazy(() => import("../components/admin/koi/CreateKoi"))
// const ManageOrderServiceDetail = lazy(
//     () =>
//         import(
//             "../components/admin/orderServiceDetail/ManageOrderServiceDetail"
//         )
// )
// const AddOrderServiceDetail = lazy(
//     () => import("../components/admin/orderServiceDetail/AddOrderServiceDetail")
// )
// const EditOrderServiceDetail = lazy(
//     () =>
//         import("../components/admin/orderServiceDetail/EditOrderServiceDetail")
// )
// const ManagePaymentType = lazy(
//     () => import("../components/admin/payment/ManagePaymentMethod")
// )
// const EditPaymentType = lazy(
//     () => import("../components/admin/payment/EditPaymentMethod")
// )
// const AddPaymentType = lazy(
//     () => import("../components/admin/payment/AddPaymentMethod")
// )
// const ManageFaq = lazy(() => import("../components/admin/faq/ManageFaq"))
// const UpdateFaq = lazy(() => import("../components/admin/faq/UpdateFaq"))
// const NewFaq = lazy(() => import("../components/admin/faq/NewFaq"))
// const CreateOrder = lazy(() => import("../components/user/order/CreateOrder"))
// const UserOrder = lazy(() => import("../components/user/order/UserOrder"))
// const UserOrderDetail = lazy(
//     () => import("../components/user/order/UserOrderDetail")
// )
// const ManageOrder = lazy(() => import("../components/admin/order/ManageOrder"))
// const ManageOrderDetail = lazy(
//     () => import("../components/admin/order/ManageOrderDetail")
// )
// const CreateFeedback = lazy(
//     () => import("../components/user/feedback/CreateFeedback")
// )
// const ManageFeedBack = lazy(
//     () => import("../components/user/feedback/ManageFeedback")
// )
// const EditFeedback = lazy(
//     () => import("../components/user/feedback/EditFeedback")
// )
// const AddDocument = lazy(
//     () => import("../components/user/document/AddDocument")
// )
// const CreateTransportationReportDetails = lazy(
//     () => import("../components/admin/report/CreateTransportationReportDetails")
// )
// const ManageTransportationReportDetails = lazy(
//     () => import("../components/admin/report/ManageTransportationReportDetails")
// )
// const EditProfile = lazy(() => import("../components/user/profile/EditProfile"))
// const EditTransportationReportDetails = lazy(
//     () => import("../components/admin/report/EditTransportationReportDetails")
// )
// const EditBlogNews = lazy(
//     () => import("../components/admin/blogandnews/EditBlogNews")
// )
// const ManageBlogNews = lazy(
//     () => import("../components/admin/blogandnews/ManageBlogNews")
// )
// const CreateBlogNews = lazy(
//     () => import("../components/admin/blogandnews/CreateBlogNews")
// )
// const UploadFile = lazy(() => import("../components/test/UploadFile"))
// const ManageCertification = lazy(
//     () => import("../components/admin/certification/ManageCertification")
// )
// const EditCertification = lazy(
//     () => import("../components/admin/certification/EditCertification")
// )
// const CreateCertification = lazy(
//     () => import("../components/admin/certification/CreateCertification")
// )
// const EditDocument = lazy(
//     () => import("../components/user/document/EditDocument")
// )
// const ManageDocument = lazy(
//     () => import("../components/user/document/ManageDocument")
// )
// const CreateNotification = lazy(
//     () => import("../components/admin/notification/CreateNotification")
// )
// const ManageNotification = lazy(
//     () => import("../components/admin/notification/ManageNotification")
// )
// const GetNotification = lazy(
//     () => import("../components/user/notification/GetNotification")
// )
// const UpdatePassword = lazy(
//     () => import("../components/user/profile/UpdatePassword")
// )
// const ManageOrderDocument = lazy(
//     () => import("../components/admin/order/OrderDocument")
// )
// const EditOrderDocument = lazy(
//     () => import("../components/admin/order/EditOrderDocument")
// )
// const CreateOrderDocument = lazy(
//     () => import("../components/admin/order/CreateOrderDocument")
// )
// const UserDashboard = lazy(
//     () => import("@components/user/dashboard/UserDashboard")
// )
// const AdminDashboard = lazy(
//     () => import("@components/admin/dashboard/AdminDashboard")
// )
// const CreateOrderInter = lazy(
//     () => import("../components/user/order/CreateOrderInter")
// )
// const ChoosePayment = lazy(
//     () => import("../components/user/payment/ChoosePayment")
// )
// const CallBackPayment = lazy(
//     () => import("../components/user/payment/CallBackPayment")
// )
// const Dashboard = lazy(() => import("../components/user/dashboard/Dashboard"))
// const ViewOrders = lazy(() => import("../components/user/profile/ViewOrders"))
// const ManageRoute = lazy(() => import("../components/admin/order/ManageRoute"))
// const ForgetPassword = lazy(
//     () => import("../components/user/auth/ForgetPassword")
// )
// const ResetPassword = lazy(
//     () => import("../components/user/auth/ResetPassword")
// )
// const CreateRoute = lazy(() => import("../components/admin/order/CreateRoute"))
// const ViewFeedback = lazy(
//     () => import("../components/admin/feedback/ManageFeedback")
// )
// const ValidateEmailCallBack = lazy(
//     () => import("../components/user/auth/ValidateEmailCallBack")
// )
// const ManageDeliverOrder = lazy(
//     () => import("../components/admin/order/ManageDeliverOrder")
// )
// Variables
var adminUrl = "/admin"

// Function to check if the user is admin
const isAdmin = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user && user.roleId >= 3
}

// Create the router configuration
const router = createBrowserRouter([
    {
        path: "/dashboard",
        lazy: LazyRoute("../components/user/dashboard/Dashboard"),
    },
    {
        path: ComponentPath.payment.paymentChoose,
        lazy: LazyRoute("../components/user/payment/ChoosePayment"),
    },
    {
        path: ComponentPath.payment.paymentCallBack,
        lazy: LazyRoute("../components/user/payment/CallBackPayment"),
    },
    {
        path: ComponentPath.user.user.validateEmail,
        lazy: LazyRoute("../components/user/auth/ValidateEmailCallBack"),
    },
    {
        path: "/login",
        lazy: LazyRoute("../components/user/auth/Login"),
    },
    {
        path: "/register",
        lazy: LazyRoute("../components/user/auth/Register"),
    },
    {
        path: "/logout",
        lazy: LazyRoute("../components/user/auth/Logout"),
    },
    {
        path: "/",
        lazy: LazyRoute("../components/HomePage"),
        index: true,
    },
    {
        path: "/news",
        lazy: LazyRoute("../components/BlogNews"),
    },
    {
        path: "/customer-support",
        lazy: LazyRoute("../components/CustomerSupport"),
        index: true,
    },
    {
        path: "/services",
        lazy: LazyRoute("../components/Service"),
        index: true,
    },
    {
        path: "/recruitment",
        lazy: LazyRoute("../components/Recruitment"),
        index: true,
    },
    {
        path: ComponentPath.user.user.forgetPassword,
        lazy: LazyRoute("../components/user/auth/ForgetPassword"),
    },
    {
        path: ComponentPath.user.user.resetPassword,
        lazy: LazyRoute("../components/user/auth/ResetPassword"),
    },
    {
        element: (
            <Suspense>
                <ProtectedRoute />
            </Suspense>
        ),
        children: [
            {
                path: ComponentPath.user.dashboard,
                lazy: LazyRoute("../components/user/dashboard/UserDashboard"),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: LazyRoute("../components/user/payment/AddPayment"),
            },
            {
                path: ComponentPath.user.user.updatePassword,
                lazy: LazyRoute("../components/user/profile/UpdatePassword"),
            },
            {
                path: "/CreateOrderInter",
                lazy: LazyRoute("../components/user/order/CreateOrderInter"),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: LazyRoute("../components/user/order/CreateOrder"),
            },
            {
                path: ComponentPath.user.profile.viewProfile,
                lazy: LazyRoute("../components/user/profile/ViewProfile"),
            },
            {
                path: ComponentPath.user.profile.editProfile,
                lazy: LazyRoute("../components/user/profile/EditProfile"),
            },
            {
                path: ComponentPath.user.profile.updatePassword,
                lazy: LazyRoute("../components/user/profile/UpdatePassword"),
            },
            {
                path: ComponentPath.user.address.createAddress,
                lazy: LazyRoute("../components/user/address/AddAddress"),
            },
            {
                path: ComponentPath.user.address.viewAddress,
                lazy: LazyRoute("../components/user/address/UserAddress"),
            },
            {
                path: ComponentPath.user.address.editAddress + ":addressId",
                lazy: LazyRoute("../components/user/address/EditAddress"),
            },
            {
                path: ComponentPath.user.payment.viewPayment,
                lazy: LazyRoute("../components/user/payment/UserPayment"),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: LazyRoute("../components/user/payment/AddPayment"),
            },
            {
                path: ComponentPath.user.payment.editPayment + ":paymentId",
                lazy: LazyRoute("../components/user/payment/EditPayment"),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: LazyRoute("../components/user/order/CreateOrder"),
            },
            {
                path: ComponentPath.user.order.viewOrder,
                lazy: LazyRoute("../components/user/order/UserOrder"),
            },
            {
                path:
                    ComponentPath.user.order.orderDetai.viewOrderDetail +
                    ":orderId",
                lazy: LazyRoute("../components/user/order/UserOrderDetail"),
            },
            {
                path: ComponentPath.user.feedback.createFeedback + ":orderId",
                lazy: LazyRoute("../components/user/feedback/CreateFeedback"),
            },
            {
                path: ComponentPath.user.feedback.viewFeedback,
                lazy: LazyRoute("../components/user/feedback/ManageFeedback"),
            },
            {
                path:
                    ComponentPath.user.feedback.editFeedback +
                    ":customerFeedbackId",
                lazy: LazyRoute("../components/user/feedback/EditFeedback"),
            },
            {
                path:
                    ComponentPath.user.document.createDocument +
                    ":orderId/:userId",
                lazy: LazyRoute("../components/user/document/AddDocument"),
            },
            {
                path: ComponentPath.user.document.editDocument + ":documentId",
                lazy: LazyRoute("../components/user/document/EditDocument"),
            },
            {
                path: ComponentPath.user.document.viewDocument + ":orderId",
                lazy: LazyRoute("../components/user/document/ManageDocument"),
            },
            {
                path: ComponentPath.user.notification.createNotification,
                lazy: LazyRoute("../components/admin/notification/CreateNotification"),
            },
            {
                path: ComponentPath.user.dashboard,
                lazy: LazyRoute("../components/user/dashboard/UserDashboard"),
            },
            {
                path: ComponentPath.user.notification.viewNotification,
                lazy: LazyRoute("../components/user/notification/GetNotification"),
            },
            {
                element: (
                    <Suspense>
                        <AdminRoute />
                    </Suspense>
                ),
                children: [
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        lazy: LazyRoute("../components/admin/order/ManageDeliverOrder"),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: LazyRoute("../components/admin/dashboard/AdminDashboard"),
                    },
                    {
                        path: ComponentPath.admin.route.routingRoute,
                        lazy: LazyRoute("../components/admin/order/ManageRoute"),
                    },
                    {
                        path: ComponentPath.admin.feedback.manageFeedback,
                        lazy: LazyRoute("../components/admin/feedback/ManageFeedback"),
                    },
                    {
                        path: ComponentPath.admin.route.manageRoute,
                        lazy: LazyRoute("../components/admin/order/CreateRoute"),
                    },
                    {
                        path: ComponentPath.admin.user.manageUser,
                        lazy: LazyRoute("../components/admin/user/ManageUser"),
                    },
                    {
                        path: ComponentPath.admin.user.editUser + ":id",
                        lazy: LazyRoute("../components/admin/user/UpdateUser"),
                    },
                    {
                        path:
                            ComponentPath.admin.address.manageUserAddress +
                            ":id",
                        lazy: LazyRoute("../components/admin/address/ManageUserAddress"),
                    },
                    {
                        path: ComponentPath.admin.koi.manageKoi,
                        lazy: LazyRoute("../components/admin/koi/ManageKoi"),
                    },
                    {
                        path: ComponentPath.admin.koi.editKoi + ":koiId",
                        lazy: LazyRoute("../components/admin/koi/EditKoi"),
                    },
                    {
                        path: ComponentPath.admin.koi.createKoi,
                        lazy: LazyRoute("../components/admin/koi/CreateKoi"),
                    },
                    {
                        path: ComponentPath.admin.order.service.manageOrderService,
                        lazy: LazyRoute("../components/admin/orderServiceDetail/ManageOrderServiceDetail"),
                    },
                    {
                        path: ComponentPath.admin.order.service.createOrderService,
                        lazy: LazyRoute("../components/admin/orderServiceDetail/AddOrderServiceDetail"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.service.editOrderService +
                            ":id",
                        lazy: LazyRoute("../components/admin/orderServiceDetail/EditOrderServiceDetail"),
                    },
                    {
                        path: ComponentPath.admin.payment.managePaymentType,
                        lazy: LazyRoute("../components/admin/payment/ManagePaymentMethod"),
                    },
                    {
                        path: ComponentPath.admin.payment.editPaymentType + ":id",
                        lazy: LazyRoute("../components/admin/payment/EditPaymentMethod"),
                    },
                    {
                        path: ComponentPath.admin.payment.addPaymentType,
                        lazy: LazyRoute("../components/admin/payment/AddPaymentMethod"),
                    },
                    {
                        path: ComponentPath.admin.faq.manageFaq,
                        lazy: LazyRoute("../components/admin/faq/ManageFaq"),
                    },
                    {
                        path: ComponentPath.admin.faq.editFaq + ":faqId",
                        lazy: LazyRoute("../components/admin/faq/UpdateFaq"),
                    },
                    {
                        path: ComponentPath.admin.faq.createFaq,
                        lazy: LazyRoute("../components/admin/faq/NewFaq"),
                    },
                    {
                        path: ComponentPath.admin.order.manageOrder,
                        lazy: LazyRoute("../components/admin/order/ManageOrder"),
                    },
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        lazy: LazyRoute("../components/admin/order/ManageDeliverOrder"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.manageOrderDetail +
                            ":orderId",
                        lazy: LazyRoute("../components/admin/order/ManageOrderDetail"),
                    },
                    {
                        path:
                            ComponentPath.admin.report.createReport +
                            ":orderId",
                        lazy: LazyRoute("../components/admin/report/CreateTransportationReportDetails"),
                    },
                    {
                        path: ComponentPath.admin.report.manageReport,
                        lazy: LazyRoute("../components/admin/report/ManageTransportationReportDetails"),
                    },
                    {
                        path:
                            ComponentPath.admin.report.editReport +
                            ":reportId",
                        lazy: LazyRoute("../components/admin/report/EditTransportationReportDetails"),
                    },
                    {
                        path:
                            ComponentPath.admin.blogNews.editBlogNews +
                            ":postId",
                        lazy: LazyRoute("../components/admin/blogandnews/EditBlogNews"),
                    },
                    {
                        path: ComponentPath.admin.blogNews.manageBlogNews,
                        lazy: LazyRoute("../components/admin/blogandnews/ManageBlogNews"),
                    },
                    {
                        path: ComponentPath.admin.blogNews.createBlogNews,
                        lazy: LazyRoute("../components/admin/blogandnews/CreateBlogNews"),
                    },
                    {
                        path:
                            ComponentPath.admin.certification.editCertification +
                            ":certificationId",
                        lazy: LazyRoute("../components/admin/certification/EditCertification"),
                    },
                    {
                        path: ComponentPath.admin.certification.manageCertification,
                        lazy: LazyRoute("../components/admin/certification/ManageCertification"),
                    },
                    {
                        path: ComponentPath.admin.certification.createCertification,
                        lazy: LazyRoute("../components/admin/certification/CreateCertification"),
                    },
                    {
                        path: ComponentPath.admin.notification.manageNotification,
                        lazy: LazyRoute("../components/admin/notification/ManageNotification"),
                    },
                    {
                        path: ComponentPath.admin.order.document.manageOrderDocument,
                        lazy: LazyRoute("../components/admin/order/OrderDocument"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document.createOrderDocument +
                            ":orderId/:orderStatusId",
                        lazy: LazyRoute("../components/admin/order/CreateOrderDocument"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document.editOrderDocument +
                            ":orderId",
                        lazy: LazyRoute("../components/admin/order/EditOrderDocument"),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: LazyRoute("../components/admin/dashboard/AdminDashboard"),
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
