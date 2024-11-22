import { createBrowserRouter } from "react-router-dom"
import ComponentPath from "./ComponentPath"
import { lazyRoute } from "./LazyRoute"

// Create the router configuration
const router = createBrowserRouter([
    {
        path: ComponentPath.payment.paymentChoose,
        lazy: lazyRoute(import("../components/user/payment/ChoosePayment")),
    },
    {
        path: ComponentPath.payment.paymentCallBack,
        lazy: lazyRoute(import("../components/user/payment/CallBackPayment")),
    },
    {
        path: ComponentPath.user.user.validateEmail,
        lazy: lazyRoute(
            import("../components/user/auth/ValidateEmailCallBack")
        ),
    },
    {
        path: "/login",
        lazy: lazyRoute(import("../components/user/auth/Login")),
    },
    {
        path: "/register",
        lazy: lazyRoute(import("../components/user/auth/Register")),
    },
    {
        path: "/logout",
        lazy: lazyRoute(import("../components/user/auth/Logout")),
    },
    {
        path: "/",
        lazy: lazyRoute(import("../components/HomePage")),
        index: true,
    },
    {
        path: "/news",
        lazy: lazyRoute(import("../components/BlogNews")),
    },
    {
        path: "/customer-support",
        lazy: lazyRoute(import("../components/CustomerSupport")),
    },
    {
        path: "/services",
        lazy: lazyRoute(import("../components/Service")),
    },
    {
        path: "/recruitment",
        lazy: lazyRoute(import("../components/Recruitment")),
    },
    {
        path: ComponentPath.user.user.forgetPassword,
        lazy: lazyRoute(import("../components/user/auth/ForgetPassword")),
    },
    {
        path: ComponentPath.user.user.resetPassword,
        lazy: lazyRoute(import("../components/user/auth/ResetPassword")),
    },
    {
        lazy: lazyRoute(import("./ProtectedRoute")),
        children: [
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: lazyRoute(
                    import("../components/user/payment/AddPayment")
                ),
            },
            {
                path: ComponentPath.user.user.updatePassword,
                lazy: lazyRoute(
                    import("../components/user/profile/UpdatePassword")
                ),
            },
            {
                path: "/CreateOrderInter",
                lazy: lazyRoute(
                    import("../components/user/order/CreateOrderInter")
                ),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: lazyRoute(import("../components/user/order/CreateOrder")),
            },
            {
                path: ComponentPath.user.profile.viewProfile,
                lazy: lazyRoute(
                    import("../components/user/profile/ViewProfile")
                ),
            },
            {
                path: ComponentPath.user.profile.editProfile,
                lazy: lazyRoute(
                    import("../components/user/profile/EditProfile")
                ),
            },
            {
                path: ComponentPath.user.profile.updatePassword,
                lazy: lazyRoute(
                    import("../components/user/profile/UpdatePassword")
                ),
            },
            {
                path: ComponentPath.user.address.createAddress,
                lazy: lazyRoute(
                    import("../components/user/address/AddAddress")
                ),
            },
            {
                path: ComponentPath.user.address.viewAddress,
                lazy: lazyRoute(
                    import("../components/user/address/UserAddress")
                ),
            },
            {
                path: ComponentPath.user.address.editAddress + ":addressId",
                lazy: lazyRoute(
                    import("../components/user/address/EditAddress")
                ),
            },
            {
                path: ComponentPath.user.payment.viewPayment,
                lazy: lazyRoute(
                    import("../components/user/payment/UserPayment")
                ),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                lazy: lazyRoute(
                    import("../components/user/payment/AddPayment")
                ),
            },
            {
                path: ComponentPath.user.payment.editPayment + ":paymentId",
                lazy: lazyRoute(
                    import("../components/user/payment/EditPayment")
                ),
            },
            {
                path: ComponentPath.user.order.createOrder,
                lazy: lazyRoute(import("../components/user/order/CreateOrder")),
            },
            {
                path: ComponentPath.user.order.viewOrder,
                lazy: lazyRoute(import("../components/user/order/UserOrder")),
            },
            {
                path:
                    ComponentPath.user.order.orderDetai.viewOrderDetail +
                    ":orderId",
                lazy: lazyRoute(
                    import("../components/user/order/UserOrderDetail")
                ),
            },
            {
                path: ComponentPath.user.feedback.createFeedback + ":orderId",
                lazy: lazyRoute(
                    import("../components/user/feedback/CreateFeedback")
                ),
            },
            {
                path: ComponentPath.user.feedback.viewFeedback,
                lazy: lazyRoute(
                    import("../components/user/feedback/ManageFeedback")
                ),
            },
            {
                path:
                    ComponentPath.user.feedback.editFeedback +
                    ":customerFeedbackId",
                lazy: lazyRoute(
                    import("../components/user/feedback/EditFeedback")
                ),
            },
            {
                path:
                    ComponentPath.user.document.createDocument +
                    ":orderId/:userId",
                lazy: lazyRoute(
                    import("../components/user/document/AddDocument")
                ),
            },
            {
                path: ComponentPath.user.document.editDocument + ":documentId",
                lazy: lazyRoute(
                    import("../components/user/document/EditDocument")
                ),
            },
            {
                path: ComponentPath.user.document.viewDocument + ":orderId",
                lazy: lazyRoute(
                    import("../components/user/document/ManageDocument")
                ),
            },
            {
                path: ComponentPath.user.notification.createNotification,
                lazy: lazyRoute(
                    import(
                        "../components/admin/notification/CreateNotification"
                    )
                ),
            },
            {
                path: ComponentPath.user.dashboard,
                lazy: lazyRoute(
                    import("../components/user/dashboard/UserDashboard")
                ),
            },
            {
                path: ComponentPath.user.notification.viewNotification,
                lazy: lazyRoute(
                    import("../components/user/notification/GetNotification")
                ),
            },
            {
                lazy: lazyRoute(import("./AdminRoute")),
                children: [
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/order/ManageDeliverOrder"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.routingRoute,
                        lazy: lazyRoute(
                            import("../components/admin/order/ManageRoute")
                        ),
                    },
                    {
                        path: ComponentPath.admin.feedback.manageFeedback,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/feedback/ManageFeedback"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.manageRoute,
                        lazy: lazyRoute(
                            import("../components/admin/order/CreateRoute")
                        ),
                    },
                    {
                        path: ComponentPath.admin.user.manageUser,
                        lazy: lazyRoute(
                            import("../components/admin/user/ManageUser")
                        ),
                    },
                    {
                        path: ComponentPath.admin.user.editUser + ":id",
                        lazy: lazyRoute(
                            import("../components/admin/user/UpdateUser")
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.address.manageUserAddress +
                            ":id",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/address/ManageUserAddress"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.manageKoi,
                        lazy: lazyRoute(
                            import("../components/admin/koi/ManageKoi")
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.editKoi + ":koiId",
                        lazy: lazyRoute(
                            import("../components/admin/koi/EditKoi")
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.createKoi,
                        lazy: lazyRoute(
                            import("../components/admin/koi/CreateKoi")
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .manageOrderService,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/orderServiceDetail/ManageOrderServiceDetail"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .createOrderService,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/orderServiceDetail/AddOrderServiceDetail"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.service.editOrderService +
                            ":id",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/orderServiceDetail/EditOrderServiceDetail"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.managePaymentType,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/payment/ManagePaymentMethod"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.payment.editPaymentType + ":id",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/payment/EditPaymentMethod"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.addPaymentType,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/payment/AddPaymentMethod"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.manageFaq,
                        lazy: lazyRoute(
                            import("../components/admin/faq/ManageFaq")
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.editFaq + ":faqId",
                        lazy: lazyRoute(
                            import("../components/admin/faq/UpdateFaq")
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.createFaq,
                        lazy: lazyRoute(
                            import("../components/admin/faq/NewFaq")
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.manageOrder,
                        lazy: lazyRoute(
                            import("../components/admin/order/ManageOrder")
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/order/ManageDeliverOrder"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.manageOrderDetail +
                            ":orderId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/order/ManageOrderDetail"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.createReport +
                            ":orderId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/report/CreateTransportationReportDetails"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.report.manageReport,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/report/ManageTransportationReportDetails"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.editReport + ":reportId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/report/EditTransportationReportDetails"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.blogNews.editBlogNews +
                            ":postId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/blogandnews/EditBlogNews"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.manageBlogNews,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/blogandnews/ManageBlogNews"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.createBlogNews,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/blogandnews/CreateBlogNews"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.certification
                                .editCertification + ":certificationId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/certification/EditCertification"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .manageCertification,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/certification/ManageCertification"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .createCertification,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/certification/CreateCertification"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.notification
                            .manageNotification,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/notification/ManageNotification"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.document
                            .manageOrderDocument,
                        lazy: lazyRoute(
                            import("../components/admin/order/OrderDocument")
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .createOrderDocument +
                            ":orderId/:orderStatusId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/order/CreateOrderDocument"
                            )
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .editOrderDocument + ":orderId",
                        lazy: lazyRoute(
                            import(
                                "../components/admin/order/EditOrderDocument"
                            )
                        ),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        lazy: lazyRoute(
                            import(
                                "../components/admin/dashboard/AdminDashboard"
                            )
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
