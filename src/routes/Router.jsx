import { createBrowserRouter } from "react-router-dom";
import ComponentPath from "./ComponentPath";
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

// Variables
var adminUrl = "/admin";

// Function to check if the user is admin
const isAdmin = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.roleId >= 3;
};

// Create the router configuration
const router = createBrowserRouter([
    {
        path: "/dashboard",
        lazy: () => import("../components/user/dashboard/Dashboard"),
    },
    {
        path: ComponentPath.payment.paymentChoose,
        lazy: () => import("../components/user/payment/ChoosePayment"),
    },
    {
        path: ComponentPath.payment.paymentCallBack,
        lazy: () => import("../components/user/payment/CallBackPayment"),
    },
    {
        path: ComponentPath.user.user.validateEmail,
        lazy: () => import("../components/user/auth/ValidateEmailCallBack"),
    },
    {
        path: "/login",
        lazy: () => import("../components/user/auth/Login"),
    },
    {
        path: "/register",
        lazy: () => import("../components/user/auth/Register"),
    },
    {
        path: "/logout",
        lazy: () => import("../components/user/auth/Logout"),
    },
    {
        path: "/",
        lazy: () => import("../components/HomePage"),
        index: true,
    },
    {
        path: "/news",
        lazy: () => import("../components/BlogNews"),
    },
    {
        path: "/customer-support",
        lazy: () => import("../components/CustomerSupport"),
    },
    {
        path: "/services",
        lazy: () => import("../components/Service"),

    },
    {
        path: "/recruitment",
        lazy: () => import("../components/Recruitment"),
    },
    {
        path: ComponentPath.user.user.forgetPassword,
        lazy: () => import("../components/user/auth/ForgetPassword"),
    },
    {
        path: ComponentPath.user.user.resetPassword,
        lazy: () => import("../components/user/auth/ResetPassword"),
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ComponentPath.user.dashboard,
                lazy: () => import("@components/user/dashboard/UserDashboard"),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: () => import("../components/user/payment/AddPayment"),
            },
            {
                path: ComponentPath.user.user.updatePassword,
                lazy: () => import("../components/user/profile/UpdatePassword"),
            },
            {
                path: "/CreateOrderInter",
                lazy: () => import("../components/user/order/CreateOrderInter"),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: () => import("../components/user/order/CreateOrder"),
            },
            {
                path: ComponentPath.user.profile.viewProfile,
                lazy: () => import("@components/user/profile/ViewProfile"),
            },
            {
                path: ComponentPath.user.profile.editProfile,
                lazy: () => import("../components/user/profile/EditProfile"),
            },
            {
                path: ComponentPath.user.profile.updatePassword,
                lazy: () => import("../components/user/profile/UpdatePassword"),
            },
            {
                path: ComponentPath.user.address.createAddress,
                lazy: () => import("../components/user/address/AddAddress"),
            },
            {
                path: ComponentPath.user.address.viewAddress,
                lazy: () => import("../components/user/address/UserAddress"),
            },
            {
                path: ComponentPath.user.address.editAddress + ":addressId",
                lazy: () => import("../components/user/address/EditAddress"),
            },
            {
                path: ComponentPath.user.payment.viewPayment,
                lazy: () => import("../components/user/payment/UserPayment"),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: () => import("../components/user/payment/AddPayment"),
            },
            {
                path: ComponentPath.user.payment.editPayment + ":paymentId",
                lazy: () => import("../components/user/payment/EditPayment"),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: () => import("../components/user/order/CreateOrder"),
            },
            {
                path: ComponentPath.user.order.viewOrder,
                lazy: () => import("../components/user/order/UserOrder"),
            },
            {
                path:
                    ComponentPath.user.order.orderDetai.viewOrderDetail +
                    ":orderId",
                lazy: () => import("../components/user/order/UserOrderDetail"),
            },
            {
                path: ComponentPath.user.feedback.createFeedback + ":orderId",
                lazy: () =>
                    import("../components/user/feedback/CreateFeedback"),
            },
            {
                path: ComponentPath.user.feedback.viewFeedback,
                lazy: () =>
                    import("../components/user/feedback/ManageFeedback"),
            },
            {
                path:
                    ComponentPath.user.feedback.editFeedback +
                    ":customerFeedbackId",
                lazy: () => import("../components/user/feedback/EditFeedback"),
            },
            {
                path:
                    ComponentPath.user.document.createDocument +
                    ":orderId/:userId",
                lazy: () => import("../components/user/document/AddDocument"),
            },
            {
                path: ComponentPath.user.document.editDocument + ":documentId",
                lazy: () => import("../components/user/document/EditDocument"),
            },
            {
                path: ComponentPath.user.document.viewDocument + ":orderId",
                lazy: () =>
                    import("../components/user/document/ManageDocument"),
            },
            {
                path: ComponentPath.user.notification.createNotification,
                lazy: () =>
                    import(
                        "../components/admin/notification/CreateNotification"
                    ),
            },
            {
                path: ComponentPath.user.dashboard,
                lazy: () => import("@components/user/dashboard/UserDashboard"),
            },
            {
                path: ComponentPath.user.notification.viewNotification,
                lazy: () =>
                    import("../components/user/notification/GetNotification"),
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: () =>
                            import(
                                "@components/admin/dashboard/AdminDashboard"
                            ),
                    },
                    {
                        path: ComponentPath.admin.route.manageRoute,
                        lazy: () =>
                            import("../components/admin/order/ManageRoute"),
                    },
                    {
                        path: ComponentPath.admin.feedback.manageFeedback,
                        lazy: () =>
                            import(
                                "../components/admin/feedback/ManageFeedback"
                            ),
                    },
                    {
                        path: ComponentPath.admin.route.createRoute,
                        lazy: () =>
                            import("../components/admin/order/CreateRoute"),
                    },
                    {
                        path: ComponentPath.admin.user.manageUser,
                        lazy: () =>
                            import("../components/admin/user/ManageUser"),
                    },
                    {
                        path: ComponentPath.admin.user.editUser + ":id",
                        lazy: () =>
                            import("../components/admin/user/UpdateUser"),
                    },
                    {
                        path:
                            ComponentPath.admin.address.manageUserAddress +
                            ":id",
                        lazy: () =>
                            import(
                                "../components/admin/address/ManageUserAddress"
                            ),
                    },
                    {
                        path: ComponentPath.admin.koi.manageKoi,
                        lazy: () => import("../components/admin/koi/ManageKoi"),
                    },
                    {
                        path: ComponentPath.admin.koi.editKoi + ":koiId",
                        lazy: () => import("../components/admin/koi/EditKoi"),
                    },
                    {
                        path: ComponentPath.admin.koi.createKoi,
                        lazy: () => import("../components/admin/koi/CreateKoi"),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .manageOrderService,
                        lazy: () =>
                            import(
                                "../components/admin/orderServiceDetail/ManageOrderServiceDetail"
                            ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .createOrderService,
                        lazy: () =>
                            import(
                                "../components/admin/orderServiceDetail/AddOrderServiceDetail"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.service.editOrderService +
                            ":id",
                        lazy: () =>
                            import(
                                "../components/admin/orderServiceDetail/EditOrderServiceDetail"
                            ),
                    },
                    {
                        path: ComponentPath.admin.payment.managePaymentType,
                        lazy: () =>
                            import(
                                "../components/admin/payment/ManagePaymentMethod"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.payment.editPaymentType + ":id",
                        lazy: () =>
                            import(
                                "../components/admin/payment/EditPaymentMethod"
                            ),
                    },
                    {
                        path: ComponentPath.admin.payment.addPaymentType,
                        lazy: () =>
                            import(
                                "../components/admin/payment/AddPaymentMethod"
                            ),
                    },
                    {
                        path: ComponentPath.admin.faq.manageFaq,
                        lazy: () => import("../components/admin/faq/ManageFaq"),
                    },
                    {
                        path: ComponentPath.admin.faq.editFaq + ":faqId",
                        lazy: () => import("../components/admin/faq/UpdateFaq"),
                    },
                    {
                        path: ComponentPath.admin.faq.createFaq,
                        lazy: () => import("../components/admin/faq/NewFaq"),
                    },
                    {
                        path: ComponentPath.admin.order.manageOrder,
                        lazy: () =>
                            import("../components/admin/order/ManageOrder"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.manageOrderDetail +
                            ":orderId",
                        lazy: () =>
                            import(
                                "../components/admin/order/ManageOrderDetail"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.createReport +
                            ":orderId",
                        lazy: () =>
                            import(
                                "../components/admin/report/CreateTransportationReportDetails"
                            ),
                    },
                    {
                        path: ComponentPath.admin.report.manageReport,
                        lazy: () =>
                            import(
                                "../components/admin/report/ManageTransportationReportDetails"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.editReport + ":reportId",
                        lazy: () =>
                            import(
                                "../components/admin/report/EditTransportationReportDetails"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.blogNews.editBlogNews +
                            ":postId",
                        lazy: () =>
                            import(
                                "../components/admin/blogandnews/EditBlogNews"
                            ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.manageBlogNews,
                        lazy: () =>
                            import(
                                "../components/admin/blogandnews/ManageBlogNews"
                            ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.createBlogNews,
                        lazy: () =>
                            import(
                                "../components/admin/blogandnews/CreateBlogNews"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.certification
                                .editCertification + ":certificationId",
                        lazy: () =>
                            import(
                                "../components/admin/certification/EditCertification"
                            ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .manageCertification,
                        lazy: () =>
                            import(
                                "../components/admin/certification/ManageCertification"
                            ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .createCertification,
                        lazy: () =>
                            import(
                                "../components/admin/certification/CreateCertification"
                            ),
                    },
                    {
                        path: ComponentPath.admin.notification
                            .manageNotification,
                        lazy: () =>
                            import(
                                "../components/admin/notification/ManageNotification"
                            ),
                    },
                    {
                        path: ComponentPath.admin.order.document
                            .manageOrderDocument,
                        lazy: () =>
                            import("../components/admin/order/OrderDocument"),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .createOrderDocument +
                            ":orderId/:orderStatusId",
                        lazy: () =>
                            import(
                                "../components/admin/order/CreateOrderDocument"
                            ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .editOrderDocument + ":orderId",
                        lazy: () =>
                            import(
                                "../components/admin/order/EditOrderDocument"
                            ),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: () =>
                            import(
                                "@components/admin/dashboard/AdminDashboard"
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

export default router;
