import * as React from "react"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import type {} from "@mui/x-charts/themeAugmentation"
import type {} from "@mui/x-data-grid/themeAugmentation"
import type {} from "@mui/x-tree-view/themeAugmentation"
import { alpha } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AdminSideMenu from "../components/AdminSideMenu"
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "../dashboard/theme/customizations"

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
}

export default function AdminDashboard() {
    return (
        <>
            <AdminSideMenu />
        </>
    )
}
