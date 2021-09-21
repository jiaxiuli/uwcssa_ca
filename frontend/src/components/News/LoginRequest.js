import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link as NewsLink } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  content: {
    marginTop: "4.5rem",
    textAlign: "center",
  },
  button: {
    marginTop: "6.5rem",
  },
});

const LoginRequest = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Container className={classes.content}>
      <Typography variant="subtitle1" align="center">
        *任何人都可以阅读
        评论区内容，但如果要添加或者回复评论，你必须是uwcssa的注册用户。如果你还没有账户，你可以现在就创建一个（免费）。
      </Typography>
      <Grid container className={classes.button}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            component={NewsLink}
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          >
            登入
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            component={NewsLink}
            to="/register"
          >
            注册
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

LoginRequest.isAuthenticated = {
  isAuthenticated: true,
};

export default LoginRequest;
