import { useState } from "react"
import "../css/Sidebar.css"
import ComponentPath from "routes/ComponentPath"

export default function Sidebar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-head">
                    <h2>{user.roleName}</h2>
                    <a href="/logout" className="logout-btn">
                        Log Out
                    </a>
                </div>
                {(user.roleId === 5 ||
                    user.roleId === 3 ||
                    user.roleId === 4) && (
                    <>
                        {user.roleId === 5 && (
                            <>
                                <a
                                    href={
                                        ComponentPath.user.profile.viewProfile
                                    }
                                >
                                    View Profile
                                </a>
                                <a href={ComponentPath.admin.user.manageUser}>
                                    Manage User
                                </a>
                                <a href={ComponentPath.admin.koi.manageKoi}>
                                    Manage Koi
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.order.service
                                            .manageOrderService
                                    }
                                >
                                    Manage Order System Detail
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.payment
                                            .managePaymentType
                                    }
                                >
                                    Manage Payment Type
                                </a>
                                <a href={ComponentPath.admin.faq.manageFaq}>
                                    Manage Faq
                                </a>
                                <a href={ComponentPath.admin.order.manageOrder}>
                                    Manage Order
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.report.manageReport
                                    }
                                >
                                    Manage Report
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.blogNews
                                            .manageBlogNews
                                    }
                                >
                                    Manage Blog News
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.certification
                                            .manageCertification
                                    }
                                >
                                    Manage Certification
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.order.document
                                            .manageOrderDocument
                                    }
                                >
                                    Manage Document
                                </a>
                            </>
                        )}

                        {user.roleId === 3 && (
                            <>
                                <a
                                    href={
                                        ComponentPath.user.profile.viewProfile
                                    }
                                >
                                    View Profile
                                </a>
                                <a>View Sales Report</a>
                                <a href={ComponentPath.admin.order.manageOrder}>
                                    Manage Order
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.report.manageReport
                                    }
                                >
                                    Manage Report
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.blogNews
                                            .manageBlogNews
                                    }
                                >
                                    Manage Blog News
                                </a>
                                <a href={ComponentPath.admin.faq.manageFaq}>
                                    Manage FAQ
                                </a>
                            </>
                        )}

                        {user.roleId === 4 && (
                            <>
                                <a
                                    href={
                                        ComponentPath.user.profile.viewProfile
                                    }
                                >
                                    View Profile
                                </a>
                                <a href={ComponentPath.admin.order.manageOrder}>
                                    Manage Order
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.report.manageReport
                                    }
                                >
                                    Manage Report
                                </a>
                                <a
                                    href={
                                        ComponentPath.admin.order.document
                                            .manageOrderDocument
                                    }
                                >
                                    Manage Document
                                </a>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
