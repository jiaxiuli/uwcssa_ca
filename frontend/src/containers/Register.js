import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "@aws-amplify/auth";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register_button: {
    marginLeft: theme.spacing(3),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    authenticationCode: "",
    step: 0,
  });

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const signUp = async () => {
    const { email, password, username, phone_number } = formData;
    try {
      console.log("start signed up!");
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number },
      });
      console.log("successfully signed up!");
      setFormData({ step: 1 });
    } catch (err) {
      console.log("error signing up:", err);
    }
  };

  const confirmSignUp = async () => {
    const { email, authenticationCode } = formData;
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      console.log("user successfully signed up!");
      return <Redirect to='/'/>
    } catch (err) {
      console.log("error confirming signing up:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {formData.step === 0 && (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">注册</Typography>
          <Typography>
            已经有账户了？
            <Link href="/login">登入</Link>
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="输入邮箱"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="输入密码"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="username"
                  label="昵称"
                  type="username"
                  id="username"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="phone_number"
                  label="电话"
                  type="phone"
                  id="phone_number"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.register_button}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={signUp}
              >
                注册
              </Button>
            </Grid>
          </form>
        </div>
      )}
      {formData.step === 1 && (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">验证</Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="authenticationCode"
                  label="验证码"
                  id="authenticationCode"
                  onChange={(event) => onChange(event)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.register_button}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={confirmSignUp}
              >
                Confirm Sign Up
              </Button>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}