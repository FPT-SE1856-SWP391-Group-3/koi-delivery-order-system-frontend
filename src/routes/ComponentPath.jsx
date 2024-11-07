const address = "/address";
const user = "/user";
const order = "/order";
const feedback = "/feedback";
const notification = "/notification";
const document = "/document";
const payment = "/payment";
const profile = "/profile";
const adminPath = "/admin";
const manage = "/manage/";
const blogNews = "/blog-news";
const certification = "/certification";
const faq = "/faq";
const koi = "/koi";
const report = "/report/transporation";
const type = "/type";
const dashboard = "/dashboard";
const manangeroute = "manangeroute";
const view = "/view/";
const edit = "/edit/";
const create = "/create/";
const admin = "/admin";

const ComponentPath = {
  user: {
    dashboard: user + dashboard,
    address: {
      viewAddress: user + address + view,
      editAddress: address + edit,
      createAddress: address + create,
      userAddress: address + "/user",
    },
    user: {
      userPath: user,
      viewUser: user + view,
      editUser: user + edit,
      createUser: user + create,
      updatePassword: user + "/password/update/",
      forgetPassword: user + "/password/forget/",
      resetPassword: user + "/password/reset/", 
    },
    order: {
      orderPath: order,
      viewOrder: order + view,
      editOrder: order + edit,
      createOrder: order + create,
      orderDetai: {
        viewOrderDetail: order + view + "detail/",
      },
    },
    feedback: {
      viewFeedback: feedback + view,
      editFeedback: feedback + edit,
      createFeedback: feedback + create,
    },
    notification: {
      viewNotification: notification + view,
      editNotification: notification + edit,
      createNotification: notification + create,
    },
    document: {
      viewDocument: document + view,
      editDocument: document + edit,
      createDocument: document + create,
    },
    payment: {
      paymentPath: payment,
      viewPayment: payment + view,
      editPayment: payment + edit,
      createPayment: payment + create,
    },
    profile: {
      profilePath: profile,
      viewProfile: profile + view,
      editProfile: profile + edit,
      createProfile: profile + create,
    },
  },
  admin: {
    dashboard: admin + dashboard,
    address: {
      manageUserAddress: admin + address + manage,
    },
    blogNews: {
      manageBlogNews: admin + blogNews + manage,
      editBlogNews: admin + blogNews + edit,
      createBlogNews: admin + blogNews + create,
    },
    certification: {
      manageCertification: admin + certification + manage,
      editCertification: admin + certification + edit,
      createCertification: admin + certification + create,
    },
    faq: {
      manageFaq: admin + faq + manage,
      editFaq: admin + faq + edit,
      createFaq: admin + faq + create,
    },
    feedback: {
      manageFeedback: admin + feedback + manage,
      createFeedback: admin + feedback + create,
    },
    notification: {
      manageNotification: admin + notification + manage,
      createNotification: admin + notification + create,
    },
    order: {
      manageOrder: admin + order + manage,
      manageOrderDetail: admin + order + manage + "detail/",
      document: {
        createOrderDocument: admin + order + create + "document/",
        editOrderDocment: admin + order + edit + "document/",
        manageOrderDocument: admin + order + view + "document/",
      },
      service: {
        createOrderService: admin + order + create + "service/",
        editOrderService: admin + order + edit + "service/",
        manageOrderService: admin + order + view + "service/",
      },
    },
    payment: {
      managePaymentType: admin + payment + type + manage,
      createPaymentType: admin + payment + type + create,
      editPaymentType: admin + payment + type + edit,
    },
    koi: {
      manageKoi: admin + koi + manage,
      createKoi: admin + koi + create,
      editKoi: admin + koi + edit,
    },
    report: {
      manageReport: admin + report + manage,
      createReport: admin + report + create,
      editReport: admin + report + edit,
    },
    user: {
      manageUser: admin + user + manage,
      createUser: admin + user + create,
      editUser: admin + user + edit,
    },
    route: {
      manageRoute: admin + manage + manangeroute,
      createRoute: admin + manage + manangeroute + create,
    },
  },
};

export default ComponentPath;
