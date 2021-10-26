import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: "960px",
    margin: "auto",
    display: "block",
  },
});
const Staff = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">Staff</Typography>
      <Box>
        <Button
          variant="contained"
          component={Link}
          to="/staff/article/postArticle"
        >
          Go Create Article
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          component={Link}
          to="/staff/uwcssaJob/postUwcssaJob"
        >
          Go Create UwcssaJob
        </Button>
      </Box>
      <Box>
        <Link to="/staff/article">Article Preview</Link>
        <div></div>
        <Link to="/staff/uwcssaJob">UwcssaJob Preview</Link>
      </Box>
    </div>
  );
};

export default Staff;