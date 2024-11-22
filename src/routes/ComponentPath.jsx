const address = "/address"
const user = "/user"
const order = "/order"
const feedback = "/feedback"
const notification = "/notification"
const document = "/document"
const payment = "/payment"
const profile = "/profile"
const blogNews = "/blog-news"
const certification = "/certification"
const faq = "/faq"
const koi = "/koi"
const report = "/report/transporation"
const type = "/type"
const dashboard = "/dashboard"
const manangeroute = "/manangeroute"
const routing = "/routing"
const edit = "/edit/"
const create = "/create/"
const admin = "/admin"
const deliver = "/deliver"

const ComponentPath = {
    user: {
        dashboard: user + dashboard,
        address: {
            viewAddress: user + address,
            editAddress: address + edit,
            createAddress: address + create,
            userAddress: address + user,
        },
        user: {
            viewUser: user,
            editUser: user + edit,
            createUser: user + create,
            updatePassword: user + "/password/update/",
            forgetPassword: user + "/password/forget/",
            resetPassword: user + "/password/reset/",
            validateEmail: user + "/email/validate/",
        },
        order: {
            viewOrder: order,
            editOrder: order + edit,
            createOrder: order + create,
            orderDetai: {
                viewOrderDetail: order + "detail/",
            },
        },
        feedback: {
            viewFeedback: feedback,
            editFeedback: feedback + edit,
            createFeedback: feedback + create,
        },
        notification: {
            viewNotification: notification,
            editNotification: notification + edit,
            createNotification: notification + create,
        },
        document: {
            viewDocument: document + "/",
            editDocument: document + edit,
            createDocument: document + create,
        },
        payment: {
            viewPayment: payment,
            editPayment: payment + edit,
            createPayment: payment + create,
        },
        profile: {
            viewProfile: profile,
            editProfile: profile + edit,
            createProfile: profile + create,
        },
    },

    payment: {
        paymentChoose: payment + "/choose",
        paymentCallBack: payment + "/callback",
    },
    admin: {
        dashboard: admin + dashboard,
        address: {
            manageUserAddress: admin + address,
        },
        blogNews: {
            manageBlogNews: admin + blogNews,
            editBlogNews: admin + blogNews + edit,
            createBlogNews: admin + blogNews + create,
        },
        certification: {
            manageCertification: admin + certification,
            editCertification: admin + certification + edit,
            createCertification: admin + certification + create,
        },
        faq: {
            manageFaq: admin + faq,
            editFaq: admin + faq + edit,
            createFaq: admin + faq + create,
        },
        feedback: {
            manageFeedback: admin + feedback,
            createFeedback: admin + feedback + create,
        },
        notification: {
            manageNotification: admin + notification,
            createNotification: admin + notification + create,
        },
        order: {
            manageOrder: admin + order,
            manageDeliverOrder: admin + deliver + order,
            manageOrderDetail: admin + order + "detail/",
            document: {
                createOrderDocument: admin + order + create + "document/",
                editOrderDocment: admin + order + edit + "document/",
                manageOrderDocument: admin + order + "document/",
            },
            service: {
                createOrderService: admin + order + create + "service/",
                editOrderService: admin + order + edit + "service/",
                manageOrderService: admin + order + "service/",
            },
        },
        payment: {
            managePaymentType: admin + payment + type,
            createPaymentType: admin + payment + type + create,
            editPaymentType: admin + payment + type + edit,
        },
        koi: {
            manageKoi: admin + koi,
            createKoi: admin + koi + create,
            editKoi: admin + koi + edit,
        },
        report: {
            manageReport: admin + report,
            createReport: admin + report + create,
            editReport: admin + report + edit,
        },
        user: {
            manageUser: admin + user,
            createUser: admin + user + create,
            editUser: admin + user + edit,
        },
        route: {
            routingRoute: admin + manangeroute + routing,
            manageRoute: admin + manangeroute,
        },
    },
}

export default ComponentPath
