import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import ComponentPath from "./ComponentPath"
import api from "../api/CallAPI"
import path from "path"

// Lazy-loaded components
const ManageUserAddress = lazy(
    () => import("../components/admin/address/ManageUserAddress")
)
const ManageUser = lazy(() => import("../components/admin/user/ManageUser"))
const UpdateUser = lazy(() => import("../components/admin/user/UpdateUser"))
const HomePage = lazy(() => import("../components/HomePage"))
const BlogNews = lazy(() => import("../components/BlogNews"))
const CustomerSupport = lazy(() => import("../components/CustomerSupport"))
const Service = lazy(() => import("../components/Service"))
const Recruitment = lazy(() => import("../components/Recruitment"))
const AddAddress = lazy(() => import("../components/user/address/AddAddress"))
const EditAddress = lazy(() => import("../components/user/address/EditAddress"))
const UserAddress = lazy(() => import("../components/user/address/UserAddress"))
const Login = lazy(() => import("../components/user/auth/Login"))
const Logout = lazy(() => import("../components/user/auth/Logout"))
const Register = lazy(() => import("../components/user/auth/Register"))
const ViewProfile = lazy(() => import("@components/user/profile/ViewProfile"))
const AdminRoute = lazy(() => import("./AdminRoute"))
const ProtectedRoute = lazy(() => import("./ProtectedRoute"))
const UserPayment = lazy(() => import("../components/user/payment/UserPayment"))
const AddPayment = lazy(() => import("../components/user/payment/AddPayment"))
const EditPayment = lazy(() => import("../components/user/payment/EditPayment"))
const ManageKoi = lazy(() => import("../components/admin/koi/ManageKoi"))
const EditKoi = lazy(() => import("../components/admin/koi/EditKoi"))
const CreatKoi = lazy(() => import("../components/admin/koi/CreateKoi"))
const ManageOrderServiceDetail = lazy(
    () =>
        import(
            "../components/admin/orderServiceDetail/ManageOrderServiceDetail"
        )
)
const AddOrderServiceDetail = lazy(
    () => import("../components/admin/orderServiceDetail/AddOrderServiceDetail")
)
const EditOrderServiceDetail = lazy(
    () =>
        import("../components/admin/orderServiceDetail/EditOrderServiceDetail")
)
const ManagePaymentType = lazy(
    () => import("../components/admin/payment/ManagePaymentMethod")
)
const EditPaymentType = lazy(
    () => import("../components/admin/payment/EditPaymentMethod")
)
const AddPaymentType = lazy(
    () => import("../components/admin/payment/AddPaymentMethod")
)
const ManageFaq = lazy(() => import("../components/admin/faq/ManageFaq"))
const UpdateFaq = lazy(() => import("../components/admin/faq/UpdateFaq"))
const NewFaq = lazy(() => import("../components/admin/faq/NewFaq"))
const CreateOrder = lazy(() => import("../components/user/order/CreateOrder"))
const UserOrder = lazy(() => import("../components/user/order/UserOrder"))
const UserOrderDetail = lazy(
    () => import("../components/user/order/UserOrderDetail")
)
const ManageOrder = lazy(() => import("../components/admin/order/ManageOrder"))
const ManageOrderDetail = lazy(
    () => import("../components/admin/order/ManageOrderDetail")
)
const CreateFeedback = lazy(
    () => import("../components/user/feedback/CreateFeedback")
)
const ManageFeedBack = lazy(
    () => import("../components/user/feedback/ManageFeedback")
)
const EditFeedback = lazy(
    () => import("../components/user/feedback/EditFeedback")
)
const AddDocument = lazy(
    () => import("../components/user/document/AddDocument")
)
const CreateTransportationReportDetails = lazy(
    () => import("../components/admin/report/CreateTransportationReportDetails")
)
const ManageTransportationReportDetails = lazy(
    () => import("../components/admin/report/ManageTransportationReportDetails")
)
const EditProfile = lazy(() => import("../components/user/profile/EditProfile"))
const EditTransportationReportDetails = lazy(
    () => import("../components/admin/report/EditTransportationReportDetails")
)
const EditBlogNews = lazy(
    () => import("../components/admin/blogandnews/EditBlogNews")
)
const ManageBlogNews = lazy(
    () => import("../components/admin/blogandnews/ManageBlogNews")
)
const CreateBlogNews = lazy(
    () => import("../components/admin/blogandnews/CreateBlogNews")
)
const UploadFile = lazy(() => import("../components/test/UploadFile"))
const ManageCertification = lazy(
    () => import("../components/admin/certification/ManageCertification")
)
const EditCertification = lazy(
    () => import("../components/admin/certification/EditCertification")
)
const CreateCertification = lazy(
    () => import("../components/admin/certification/CreateCertification")
)
const EditDocument = lazy(
    () => import("../components/user/document/EditDocument")
)
const ManageDocument = lazy(
    () => import("../components/user/document/ManageDocument")
)
const CreateNotification = lazy(
    () => import("../components/admin/notification/CreateNotification")
)
const ManageNotification = lazy(
    () => import("../components/admin/notification/ManageNotification")
)
const GetNotification = lazy(
    () => import("../components/user/notification/GetNotification")
)
const UpdatePassword = lazy(
    () => import("../components/user/profile/UpdatePassword")
)
const ManageOrderDocument = lazy(
    () => import("../components/admin/order/OrderDocument")
)
const EditOrderDocument = lazy(
    () => import("../components/admin/order/EditOrderDocument")
)
const CreateOrderDocument = lazy(
    () => import("../components/admin/order/CreateOrderDocument")
)
const UserDashboard = lazy(
    () => import("@components/user/dashboard/UserDashboard")
)
const AdminDashboard = lazy(
    () => import("@components/admin/dashboard/AdminDashboard")
)
const CreateOrderInter = lazy(
    () => import("../components/user/order/CreateOrderInter")
)
const ChoosePayment = lazy(
    () => import("../components/user/payment/ChoosePayment")
)
const CallBackPayment = lazy(
    () => import("../components/user/payment/CallBackPayment")
)
const Dashboard = lazy(() => import("../components/user/dashboard/Dashboard"))
const ViewOrders = lazy(() => import("../components/user/profile/ViewOrders"))
const ManageRoute = lazy(() => import("../components/admin/order/ManageRoute"))
const ForgetPassword = lazy(
    () => import("../components/user/auth/ForgetPassword")
)
const ResetPassword = lazy(
    () => import("../components/user/auth/ResetPassword")
)
const CreateRoute = lazy(() => import("../components/admin/order/CreateRoute"))
const ViewFeedback = lazy(
    () => import("../components/admin/feedback/ManageFeedback")
)
const ValidateEmailCallBack = lazy(
    () => import("../components/user/auth/ValidateEmailCallBack")
)
const ManageDeliverOrder = lazy(
    () => import("../components/admin/order/ManageDeliverOrder")
)
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
        element: (
            <Suspense>
                <Dashboard />
            </Suspense>
        ),
    },
    {
        path: ComponentPath.payment.paymentChoose,
        element: (
            <Suspense>
                <ChoosePayment />
            </Suspense>
        ),
    },
    {
        path: ComponentPath.payment.paymentCallBack,
        element: (
            <Suspense>
                <CallBackPayment />
            </Suspense>
        ),
    },
    {
        path: ComponentPath.user.user.validateEmail,
        element: (
            <Suspense>
                <ValidateEmailCallBack />
            </Suspense>
        ),
    },
    {
        path: "/login",
        element: (
            <Suspense>
                <Login />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense>
                <Register />
            </Suspense>
        ),
    },
    {
        path: "/logout",
        element: (
            <Suspense>
                <Logout />
            </Suspense>
        ),
    },
    {
        path: "/",
        element: (
            <Suspense>
                <HomePage />
            </Suspense>
        ),
        index: true,
    },
    {
        path: "/news",
        element: (
            <Suspense>
                <BlogNews />
            </Suspense>
        ),
        index: true,
    },
    {
        path: "/customer-support",
        element: (
            <Suspense>
                <CustomerSupport />
            </Suspense>
        ),
        index: true,
    },
    {
        path: "/services",
        element: (
            <Suspense>
                <Service />
            </Suspense>
        ),
        index: true,
    },
    {
        path: "/recruitment",
        element: (
            <Suspense>
                <Recruitment />
            </Suspense>
        ),
        index: true,
    },
    {
        path: ComponentPath.user.user.forgetPassword,
        element: (
            <Suspense>
                <ForgetPassword />
            </Suspense>
        ),
    },
    {
        path: ComponentPath.user.user.resetPassword,
        element: (
            <Suspense>
                <ResetPassword />
            </Suspense>
        ),
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
                element: (
                    <Suspense>
                        <UserDashboard />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                element: (
                    <Suspense>
                        <AddPayment />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.user.updatePassword,
                element: (
                    <Suspense>
                        <UpdatePassword />
                    </Suspense>
                ),
            },
            {
                path: "/CreateOrderInter",
                element: (
                    <Suspense>
                        <CreateOrderInter />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.order.createOrder,
                element: (
                    <Suspense>
                        <CreateOrder />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.profile.viewProfile,
                element: (
                    <Suspense>
                        <ViewProfile />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.profile.editProfile,
                element: (
                    <Suspense>
                        <EditProfile />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.profile.updatePassword,
                element: (
                    <Suspense>
                        <UpdatePassword />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.address.createAddress,
                element: (
                    <Suspense>
                        <AddAddress />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.address.viewAddress,
                element: (
                    <Suspense>
                        <UserAddress />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.address.editAddress + ":addressId",
                element: (
                    <Suspense>
                        <EditAddress />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.payment.viewPayment,
                element: (
                    <Suspense>
                        <UserPayment />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.payment.createPayment,
                element: (
                    <Suspense>
                        <AddPayment />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.payment.editPayment + ":paymentId",
                element: (
                    <Suspense>
                        <EditPayment />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.order.createOrder,
                element: (
                    <Suspense>
                        <CreateOrder />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.order.viewOrder,
                element: (
                    <Suspense>
                        <UserOrder />
                    </Suspense>
                ),
            },
            {
                path:
                    ComponentPath.user.order.orderDetai.viewOrderDetail +
                    ":orderId",
                element: (
                    <Suspense>
                        <UserOrderDetail />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.feedback.createFeedback + ":orderId",
                element: (
                    <Suspense>
                        <CreateFeedback />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.feedback.viewFeedback,
                element: (
                    <Suspense>
                        <ManageFeedBack />
                    </Suspense>
                ),
            },
            {
                path:
                    ComponentPath.user.feedback.editFeedback +
                    ":customerFeedbackId",
                element: (
                    <Suspense>
                        <EditFeedback />
                    </Suspense>
                ),
            },
            {
                path:
                    ComponentPath.user.document.createDocument +
                    ":orderId/:userId",
                element: (
                    <Suspense>
                        <AddDocument />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.document.editDocument + ":documentId",
                element: (
                    <Suspense>
                        <EditDocument />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.document.viewDocument + ":orderId",
                element: (
                    <Suspense>
                        <ManageDocument />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.notification.createNotification,
                element: (
                    <Suspense>
                        <CreateNotification />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.dashboard,
                element: (
                    <Suspense>
                        <UserDashboard />
                    </Suspense>
                ),
            },
            {
                path: ComponentPath.user.notification.viewNotification,
                element: (
                    <Suspense>
                        <GetNotification />
                    </Suspense>
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
                        path: ComponentPath.admin.dashboard,
                        element: (
                            <Suspense>
                                <AdminDashboard />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.routingRoute,
                        element: (
                            <Suspense>
                                <ManageRoute />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.feedback.manageFeedback,
                        element: (
                            <Suspense>
                                <ViewFeedback />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.route.manageRoute,
                        element: (
                            <Suspense>
                                <CreateRoute />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.user.manageUser,
                        element: (
                            <Suspense>
                                <ManageUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.user.editUser + ":id",
                        element: (
                            <Suspense>
                                <UpdateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.address.manageUserAddress +
                            ":id",
                        element: (
                            <Suspense>
                                <ManageUserAddress />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.manageKoi,
                        element: (
                            <Suspense>
                                <ManageKoi />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.editKoi + ":koiId",
                        element: (
                            <Suspense>
                                <EditKoi />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.koi.createKoi,
                        element: (
                            <Suspense>
                                <CreatKoi />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .manageOrderService,
                        element: (
                            <Suspense>
                                <ManageOrderServiceDetail />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.service
                            .createOrderService,
                        element: (
                            <Suspense>
                                <AddOrderServiceDetail />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.service.editOrderService +
                            ":id",
                        element: (
                            <Suspense>
                                <EditOrderServiceDetail />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.managePaymentType,
                        element: (
                            <Suspense>
                                <ManagePaymentType />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.payment.editPaymentType + ":id",
                        element: (
                            <Suspense>
                                <EditPaymentType />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.payment.addPaymentType,
                        element: (
                            <Suspense>
                                <AddPaymentType />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.manageFaq,
                        element: (
                            <Suspense>
                                <ManageFaq />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.editFaq + ":faqId",
                        element: (
                            <Suspense>
                                <UpdateFaq />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.faq.createFaq,
                        element: (
                            <Suspense>
                                <NewFaq />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.manageOrder,
                        element: (
                            <Suspense>
                                <ManageOrder />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.manageDeliverOrder,
                        element: <ManageDeliverOrder />,
                    },
                    {
                        path:
                            ComponentPath.admin.order.manageOrderDetail +
                            ":orderId",
                        element: (
                            <Suspense>
                                <ManageOrderDetail />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.createReport +
                            ":orderId",
                        element: (
                            <Suspense>
                                <CreateTransportationReportDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.report.manageReport,
                        element: (
                            <Suspense>
                                <ManageTransportationReportDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.report.editReport + ":reportId",
                        element: (
                            <Suspense>
                                <EditTransportationReportDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.blogNews.editBlogNews +
                            ":postId",
                        element: (
                            <Suspense>
                                <EditBlogNews />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.manageBlogNews,
                        element: (
                            <Suspense>
                                <ManageBlogNews />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.blogNews.createBlogNews,
                        element: (
                            <Suspense>
                                <CreateBlogNews />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.certification
                                .editCertification + ":certificationId",
                        element: (
                            <Suspense>
                                <EditCertification />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .manageCertification,
                        element: (
                            <Suspense>
                                <ManageCertification />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.certification
                            .createCertification,
                        element: (
                            <Suspense>
                                <CreateCertification />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.notification
                            .manageNotification,
                        element: (
                            <Suspense>
                                <ManageNotification />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.order.document
                            .manageOrderDocument,
                        element: (
                            <Suspense>
                                <ManageOrderDocument />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .createOrderDocument +
                            ":orderId/:orderStatusId",
                        element: (
                            <Suspense>
                                <CreateOrderDocument />
                            </Suspense>
                        ),
                    },
                    {
                        path:
                            ComponentPath.admin.order.document
                                .editOrderDocument + ":orderId",
                        element: (
                            <Suspense>
                                <EditOrderDocument />
                            </Suspense>
                        ),
                    },
                    {
                        path: ComponentPath.admin.dashboard,
                        element: (
                            <Suspense>
                                <AdminDashboard />
                            </Suspense>
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
