import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { signUp } from "../../redux/reducers/authSlice";
import { useTitle } from "../../Hooks/useTitle";
import uwcssa_logo from "../../static/uwcssa_logo.svg";

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // form: {
  //   marginTop: theme.spacing(4.5),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
  // register_button: {
  //   marginTop: "2rem",
  //   marginBottom: "2rem",
  //   marginLeft: theme.spacing(3),
  // },
  alert: {
    marginTop: "1.5rem",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  useTitle("UWCSSA注册");
  const dispatch = useDispatch();
  const [accountCreated, setAccountCreated] = useState(false);
  // const [buttonState, setButtonState] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  //const emailFormat = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const timer = useRef();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const { isAuthenticated } = useSelector((state) => state.userAuth);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    setAlert(false);
    // setButtonState(true);

    /*
      由于useState是异步操作并且在onChange里面，它只能够获取用户输入的数据-1，也就是要慢一步。
      所以自身不能够实时刷新状态树来获取实时的数值，
      需要配套使用useEffect来做一个callback来获取实时数据。
      由于useState在onChange里面，看google别人怎么写的也做不出来
      所以只能用这种蠢办法，而且有一个bug。
      如果用户一次性输入完，那么状态树的数据长度此时还是为0。
      需要用户再增删一个字符才可以enable按钮。
    */
    /*
      如果email长度为0，disable按钮
      如果email长度大于1，并且不为0，enable按钮
    */
    // if (formData.email.length === 0) setButtonState(true);

    // if (formData.email.length > 1 && formData.email.length !== 0)
    //   setButtonState(false);
    // console.log(formData);
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  // const handleChangePW = (prop) => (event) => {
  //   set({ ...values, [prop]: event.target.value });
  // };
  const onSignUp = async () => {
    const { username, password, email } = formData;
    const response = await dispatch(signUp({ username, password, email }));
    setLoadingState(true);
    console.log("onSignUp", response);
    if (response.meta.requestStatus === "fulfilled") {
      setAccountCreated(true);
    } else {
      timer.current = window.setTimeout(() => {
        setLoadingState(false);
        setAlertContent(response.error.message);
        setAlert(true);
        console.log(response.error.message);
      }, 1000);

      console.log(response.error.message);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to={`/auth/emailConfirm/${formData.username}`} />;
  }
  return (
    <Container component="main" maxWidth="xs" sx={{ mb: "2rem" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={uwcssa_logo}
          alt="uwcssaLogo"
          style={{ margin: "1rem", height: "50px" }}
        />

        <Typography variant="h5">注册</Typography>
        <Typography>
          已经有账户了？
          <Link to="/auth/signIn">登入</Link>
        </Typography>
        {alert ? (
          <Alert className={classes.alert} severity="error">
            {alertContent}
          </Alert>
        ) : (
          <></>
        )}
        <Box component="form" noValidate sx={{ my: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="用户名"
                type="username"
                id="username"
                autoComplete="username"
                error={alert}
                onChange={(event) => onChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                error={alert}
                onChange={(event) => onChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                required
                fullWidth
                name="password"
                label="密码"
                type={isShowPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                error={alert}
                onChange={(event) => onChange(event)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              /> */}
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  密码
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  onChange={(event) => onChange(event)}
                  autoFocus
                  error={alert}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {isShowPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
            disabled={loadingState}
            onClick={onSignUp}
            sx={{ mt: 3, mb: 2 }}
          >
            注册
            {loadingState && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-0.75rem",
                  marginLeft: "-0.75rem",
                }}
              />
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
