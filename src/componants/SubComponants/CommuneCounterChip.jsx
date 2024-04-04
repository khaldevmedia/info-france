import { CircularProgress, Chip, Box } from "@mui/material";

function CommuneCounterChip({ label, isLoading }) {
  return (
    <Box
      color={"primary"}
      backgroundColor={"primary"}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        fontSize: { md: 20, xs: 16 },
        fontWeight: 400,
        ml: 1,
        height: 50,
        minWidth: 50,
        width: "auto",
        lineHeight: "20px",
        color: "primary.main",
        border: 2,
        borderColor: "primary.main",
        borderRadius: "10px",
      }}
    >
      {isLoading ? <CircularProgress color="inherit" size={16} /> : label}
    </Box>
  );
}

export default CommuneCounterChip;
