import { CircularProgress, Chip, Box } from "@mui/material";

function CommuneCounterChip({ label, isLoading }) {
  return (
    <Box
      //   label={isLoading ? <CircularProgress size={16} /> : label}
      color={"primary"}
      backgroundColor={"primary"}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        height: "32px",
        fontSize: { md: 20, xs: 16 },
        fontWeight: 400,
        ml: 1,
        height: 50,
        minWidth: 50,
        width: "auto",
        lineHeight: "20px",
        borderRadius: "16px",
        color: "common.white",
        bgcolor: "primary.main",
        // backgroundColor: "primary",
      }}
    >
      {isLoading ? <CircularProgress color="inherit" size={16} /> : label}
    </Box>
  );
}

export default CommuneCounterChip;
