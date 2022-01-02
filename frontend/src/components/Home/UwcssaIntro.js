import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  fetchForumPostCounts,
  fetchUsers,
} from "../../redux/slice/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import cssalogo from "../../static/cssa-logo1.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    paddingBottom: "2rem",
    backgroundImage: `url(${cssalogo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.only("lg")]: {
      height: "835px",
    },
  },
  webIntro: {
    minWidth: "40%",
    maxWidth: "100%",
    textAlign: "center",
    paddingBottom: "auto",
    marginBottom: "auto",
  },
  titleBox: {
    height: "100%",
    width: "calc(100% - 30px)",
    margin: "auto",
    fontWeight: 500,
    paddingTop: "5rem",
    marginBottom: "2rem",
    lineHeight: "130%",
    [theme.breakpoints.only("sm")]: {
      width: "calc(100% - 190px)",
      marginLeft: "190px",
    },
    [theme.breakpoints.only("md")]: {
      width: "calc(100% - 260px)",
      marginLeft: "260px",
    },
  },
  title: {
    marginBottom: "2rem",
    maxWidth: 1000,
  },
  slogan: {
    marginBottom: "2rem",
  },
  webData: {
    marginTop: "3rem",
    marginBottom: "3rem",
    fontWeight: 700,
  },
  buttonBox: {
    marginBottom: "1rem",
  },
  repoInfo: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    width: "80%",
    margin: "auto",
    marginTop: "3rem",
  },
  relateWeb: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  relateButton: {
    marginLeft: "1rem",
  },
}));
export default function UwcssaIntro() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const {
    users,
    fetchUsersStatus,
    forumPostCounts,
    fetchForumPostCountsStatus,
  } = useSelector((state) => state.general);
  const { isAuthenticated } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (fetchUsersStatus === "idle" || undefined) {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchUsersStatus]);

  useEffect(() => {
    if (fetchForumPostCountsStatus === "idle" || undefined) {
      dispatch(fetchForumPostCounts());
    }
  }, [dispatch, fetchForumPostCountsStatus]);

  const guestButton = () => (
    <div>
      <Button
        variant="outlined"
        size="large"
        content="textOnly"
        color="primary"
        component={Link}
        to="/auth/signIn"
      >
        注册帐号
      </Button>
    </div>
  );

  const authButton = () => (
    <div>
      <div>
        <Typography variant="h4">欢迎 : </Typography>
        <Box mt={1} mb={1}>
          <Typography variant="h5" noWrap>
            {userAuth.user.username}
          </Typography>
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="subtitle1" color={"secondary"}>
            {userAuth.user.username.slice(0, 7) === "google_"
              ? "我们建议您在我们网站注册账户，体验完整的系统"
              : ""}
          </Typography>
        </Box>
        <Box mt={2} mb={1}>
          <Button
            variant="contained"
            color={"primary"}
            size="large"
            component={Link}
            to="/account/dashboard"
          >
            个人中心
          </Button>
        </Box>
      </div>
    </div>
  );
  return (
    <Box>
      <CssBaseline />
      <div>
        <div className={classes.root}>
          <Box className={classes.webIntro}>
            <Container size="lg">
              <Grid item sm>
                <Box className={classes.titleBox}>
                  <Grid item xs={12} sm={8} md={7}>
                    <Typography variant="h6" className={classes.title}>
                      UWCSSA.CA - 温莎最大的在线华人学生学者社交网络社区
                    </Typography>
                    <Typography variant="h4" className={classes.slogan}>
                      <b>A Student Community like No Other</b>
                    </Typography>
                    <Box className={classes.webData}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Tooltip
                            title={`${
                              users &&
                              users
                                .map((x) => x.id)
                                .join()
                                .slice(0, 100)
                            }...`}
                            TransitionComponent={Zoom}
                            arrow
                            leaveDelay={200}
                          >
                            <Paper elevation={4}>
                              <Typography variant="h5">
                                {users ? (
                                  users.length
                                ) : (
                                  <CircularProgress
                                    style={{ height: "26px", width: "26px" }}
                                  />
                                )}
                              </Typography>
                              <Typography variant="h5">用户</Typography>
                            </Paper>
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          component={Link}
                          to="/forum"
                          sx={{ textDecoration: "none" }}
                        >
                          <Paper elevation={4}>
                            <Typography variant="h5">
                              {forumPostCounts ? (
                                forumPostCounts
                              ) : (
                                <CircularProgress
                                  style={{ height: "26px", width: "26px" }}
                                />
                              )}
                            </Typography>
                            <Typography variant="h5">帖子</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className={classes.buttonBox}>
                      {isAuthenticated ? authButton() : guestButton()}
                    </Box>
                    <Box className={classes.relateWeb}>
                      <Typography variant="h6">网页导航</Typography>
                      <ButtonGroup
                        color="primary"
                        aria-label="text primary button group"
                        variant="outlined"
                        size="medium"
                        content="textOnly"
                        className={classes.relateButton}
                      >
                        <Button component={Link} to="/article">
                          近期新闻
                        </Button>
                        <Button component={Link} to="/event">
                          活动
                        </Button>
                        <Button
                          variant="outlined"
                          size="medium"
                          content="textOnly"
                          color="primary"
                          component={Link}
                          to="/forum"
                        >
                          论坛（建设中）
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </Box>
        </div>
      </div>
    </Box>
  );
}
