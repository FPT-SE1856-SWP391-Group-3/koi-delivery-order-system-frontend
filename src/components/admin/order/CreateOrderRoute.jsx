import React from "react"
import PropTypes from "prop-types" // Import PropTypes
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import AddIcon from "@mui/icons-material/Add"

export default function FloatingActionButtonSize({ onClick }) {
    return (
        <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
            <Fab color="secondary" aria-label="add" onClick={onClick}>
                <AddIcon />
            </Fab>
        </Box>
    )
}

// Add propTypes for validation
FloatingActionButtonSize.propTypes = {
    onClick: PropTypes.func.isRequired,
}
