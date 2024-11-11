import { styled, TextField } from "@mui/material";
import { Colors } from "~/constants/constants";

const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: Colors.textFields,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: Colors.textPrimary,
      },
      "&:hover fieldset": {
        borderColor: Colors.textPrimary,
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${Colors.textPrimary}`, 
      },
    },
    "& .MuiInputLabel-root": {
      color: Colors.textPrimary,
      "&.Mui-focused": {
        color: 'black',
      },
    },
}));

export { StyledTextField }