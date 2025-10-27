import React from "react";
import { Button, Box } from "@material-ui/core";

const NavigationButtons = ({ handleBack, handleNext, handleSave }) => {
  return (
    <Box className="footer" sx={{ mt: 3, display: "flex", gap: 2,justifyContent:"space-between"}}>
      <Button
        variant="contained"
        color="primary"
        id="back"
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="save_continue"
        onClick={handleSave}
      >
        SAVE AND CONTINUE
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="next"
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default NavigationButtons;
