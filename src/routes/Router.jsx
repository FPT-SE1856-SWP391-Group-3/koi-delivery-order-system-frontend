import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import ComponentPath from "./ComponentPath"
import api from "../api/CallAPI"
import path from "path"
import { LazyRoute } from "./LazyRoute"

const AdminRoute = lazy(() => import("./AdminRoute"))
const ProtectedRoute = lazy(() => import("./ProtectedRoute"))

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
                lazy: LazyRoute(
                    "../components/admin/notification/CreateNotification"
                ),
            },
            {
                path: ComponentPath.user.dashboard,
                lazy: LazyRoute("../components/user/dashboard/UserDashboard"),
            },
            {
                path: ComponentPath.user.notification.viewNotification,
                lazy: LazyRoute(
                    "../components/user/notification/GetNotification"
                ),
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
                        lazy: LazyRoute(
                            "../components/admin/order/ManageDeliverOrder"
                        ),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: LazyRoute(
                            "../components/admin/dashboard/AdminDashboard"
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.routingRoute,
                        lazy: LazyRoute(
                            "../components/admin/order/ManageRoute"
                        ),
                    },
                    {
                        path: ComponentPath.admin.feedback.manageFeedback,
                        lazy: LazyRoute(
                            "../components/admin/feedback/ManageFeedback"
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.manageRoute,
                        lazy: LazyRoute(
                            "../components/admin/order/CreateRoute"
                        ),
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
                        lazy: LazyRoute(
                            "../components/admin/address/ManageUserAddress"
                        ),
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
                        path: ComponentPath.admin.order.service
                            .manageOrderService,
                        lazy: LazyRoute(
                            "../components/admin/orderServiceDetail/ManageOrderServiceDetail"
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .createOrderService,
                        lazy: LazyRoute(
                            "../components/admin/orderServiceDetail/AddOrderServiceDetail"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.service.editOrderService +
                            ":id",
                        lazy: LazyRoute(
                            "../components/admin/orderServiceDetail/EditOrderServiceDetail"
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.managePaymentType,
                        lazy: LazyRoute(
                            "../components/admin/payment/ManagePaymentMethod"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.payment.editPaymentType + ":id",
                        lazy: LazyRoute(
                            "../components/admin/payment/EditPaymentMethod"
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.addPaymentType,
                        lazy: LazyRoute(
                            "../components/admin/payment/AddPaymentMethod"
                        ),
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
                        lazy: LazyRoute(
                            "../components/admin/order/ManageOrder"
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        lazy: LazyRoute(
                            "../components/admin/order/ManageDeliverOrder"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.manageOrderDetail +
                            ":orderId",
                        lazy: LazyRoute(
                            "../components/admin/order/ManageOrderDetail"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.createReport +
                            ":orderId",
                        lazy: LazyRoute(
                            "../components/admin/report/CreateTransportationReportDetails"
                        ),
                    },
                    {
                        path: ComponentPath.admin.report.manageReport,
                        lazy: LazyRoute(
                            "../components/admin/report/ManageTransportationReportDetails"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.editReport + ":reportId",
                        lazy: LazyRoute(
                            "../components/admin/report/EditTransportationReportDetails"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.blogNews.editBlogNews +
                            ":postId",
                        lazy: LazyRoute(
                            "../components/admin/blogandnews/EditBlogNews"
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.manageBlogNews,
                        lazy: LazyRoute(
                            "../components/admin/blogandnews/ManageBlogNews"
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.createBlogNews,
                        lazy: LazyRoute(
                            "../components/admin/blogandnews/CreateBlogNews"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.certification
                                .editCertification + ":certificationId",
                        lazy: LazyRoute(
                            "../components/admin/certification/EditCertification"
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .manageCertification,
                        lazy: LazyRoute(
                            "../components/admin/certification/ManageCertification"
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .createCertification,
                        lazy: LazyRoute(
                            "../components/admin/certification/CreateCertification"
                        ),
                    },
                    {
                        path: ComponentPath.admin.notification
                            .manageNotification,
                        lazy: LazyRoute(
                            "../components/admin/notification/ManageNotification"
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.document
                            .manageOrderDocument,
                        lazy: LazyRoute(
                            "../components/admin/order/OrderDocument"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .createOrderDocument +
                            ":orderId/:orderStatusId",
                        lazy: LazyRoute(
                            "../components/admin/order/CreateOrderDocument"
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .editOrderDocument + ":orderId",
                        lazy: LazyRoute(
                            "../components/admin/order/EditOrderDocument"
                        ),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: LazyRoute(
                            "../components/admin/dashboard/AdminDashboard"
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <p>404 Error - Nothing here...</p>,
    },
])

export default router
