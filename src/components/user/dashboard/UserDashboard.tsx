import type {} from "@mui/x-date-pickers/themeAugmentation"
import type {} from "@mui/x-charts/themeAugmentation"
import type {} from "@mui/x-data-grid/themeAugmentation"
import type {} from "@mui/x-tree-view/themeAugmentation"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Header from "../components/Header.js"
import MainGrid from "./dashboard/MainGrid.js"
import UserSideNav from "../UserSideNav.jsx"
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "./theme/customizations/index.js"
import PieChart from "./dashboard/BarChart.jsx/index.js"

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
}

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <>
            <CssBaseline enableColorScheme />
            <Box>
                <UserSideNav>
                    {/* Main content */}
                    <Box component="main">
                        <Stack
                            spacing={2}
                            sx={{
                                alignItems: "center",
                                mx: 3,
                                pb: 5,
                                mt: { xs: 8, md: 0 },
                            }}
                        >
                            <Header />
                            <MainGrid />
                        </Stack>
                    </Box>
                </UserSideNav>
            </Box>
        </>
    )
}
