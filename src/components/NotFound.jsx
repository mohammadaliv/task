import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function NotFound() {
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>Page not found</div>
      <Link to="" onClick={handleLinkClick}>
        صفحه ورود
      </Link>
    </Box>
  );
}

export default NotFound;
