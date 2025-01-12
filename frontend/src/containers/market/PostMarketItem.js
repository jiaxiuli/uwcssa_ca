import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CustomTags, { GetTags } from "../../components/CustomMUI/CustomTags";
import GoogleMaps, {
  GetAddress,
} from "../../components/GoogleMap/GoogleMapsPlace";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchMarketUserInfo,
  postMarketUserInfo,
  selectMarketUserById,
  updateMarketUserInfoDetail,
} from "../../redux/slice/marketUserSlice";
import { useDispatch, useSelector } from "react-redux";

import BackdropLoading from "../../components/BackdropLoading";
import MarketForm from "../../components/Market/marketForm";
import PostImgPreview from "../../components/Market/postImgPrev";
import PostMobileBackDrop from "../../components/Market/postMobileBackDrop";
import PostUserInfo from "../../components/Market/postUserInfo";
import PreviewInfo from "../../components/Market/previewInfo";
import PublishIcon from "@mui/icons-material/Publish";
import SwipeableDrawerInfo from "../../components/Market/swipeableDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { marketItemOptions } from "../../components/Market/marketItemOptions";
import { postAddress } from "../../redux/slice/addressSlice";
import { postMarketItem } from "../../redux/slice/marketSlice";
import { postMultipleImages } from "../../redux/slice/generalSlice";
import { postStyle } from "../../components/Market/postCss";
import { useHistory } from "react-router";
import { useTitle } from "../../Hooks/useTitle";
import { v4 as uuid } from "uuid";

export default function PostMarketItem() {
  const imgRef = useRef(null);
  const classes = postStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  useTitle("发布二手商品信息");
  const [imgURLs, setImgURLs] = useState([]);
  const { username } = useSelector((state) => state.userAuth.user);
  const user = useSelector((state) => state.userAuth.userProfile);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [defaultInfo, setDefaultInfo] = useState(true);
  // const [backDropOpen, setBackDropOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const marketUserInfo = useSelector((state) =>
    selectMarketUserById(state, username)
  );
  const { marketItemConditionList, marketItemCategoryList } = marketItemOptions;
  const { darkTheme } = useSelector((state) => state.general);
  const [open, setOpen] = useState(false);
  const [fakeItems, setFakeItems] = useState({
    marketType: "Item",
    title: "Title",
    price: "Price",
    description: "Descriptions",
    address: { description: "Location" },
    marketItemCondition: "New",
    marketItemCategory: "Tools",
    tags: ["Tags Go Here"],
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    user: user,
    owner: username,
  });
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      imgURLs: [],
      title: "",
      price: "",
      description: "",
      marketItemCategory: "",
      marketItemCondition: "",
      contactEmail: "",
      contactWeChat: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const address = await GetAddress();
    const addressID = uuid();
    const itemID = uuid();
    if (address) {
      const {
        description,
        place_id,
        reference,
        terms,
        types,
        apartmentNumber,
        geocodingResult,
        lat,
        lng,
      } = address;
      const createAddressInput = {
        description,
        place_id,
        reference,
        terms,
        types,
        apartmentNumber,
        geocodingResult,
        lat,
        lng,
        itemID: itemID,
        userID: username,
        id: addressID,
      };
      console.log(createAddressInput);
      const addressResponse = await dispatch(
        postAddress({ createAddressInput })
      );
      console.log(addressResponse);
    }
    const createMarketItemInput = {
      ...data,
      id: itemID,
      addressID: address && addressID,
      name: data.title,
      marketType: "Item",
      imgURLs: imgURLs,
      tags: GetTags(),
      active: true,
      userID: username,
      createdAt: new Date(),
      sortKey: "SortKey",
    };
    const { contactEmail, contactPhone, contactWeChat } = data;
    const userInfo = {
      id: username,
      phone: contactPhone,
      weChat: contactWeChat,
      email: contactEmail,
      userID: username,
    };
    // console.log("createMarketItemInput", createMarketItemInput);
    const response = await dispatch(postMarketItem(createMarketItemInput));
    if (marketUserInfo === undefined) {
      await dispatch(postMarketUserInfo(userInfo));
    } else if (marketUserInfo !== undefined) {
      if (defaultInfo === true) {
        await dispatch(updateMarketUserInfoDetail(userInfo));
      }
    }

    console.log("Something should be here", response);
    console.log("Can upload");

    if (response.meta.requestStatus === "fulfilled") {
      history.replace(`/market/item/${response.payload.id}`);
      reset();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errors) {
      imgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  useEffect(() => {
    dispatch(fetchMarketUserInfo(username));
  }, [username, dispatch]);

  const uploadMarketItemImg = async (e) => {
    const imagesData = e.target.files;
    const imageLocation = "market/item";

    const response = await dispatch(
      postMultipleImages({ imagesData, imageLocation })
    );
    console.log(response);
    if (response.meta.requestStatus === "fulfilled") {
      setImgURLs((prev) => prev.concat(response.payload));
    }
  };

  const handleDeleteImg = (imgKey) => {
    const images = [...imgURLs];
    const newKeys = images.filter((key) => key !== imgKey);
    setImgURLs(newKeys);
  };

  const handleKeyDown = (e) => {
    const newTags = [...fakeItems.tags, e];
    setFakeItems({ ...fakeItems, tags: newTags });
  };

  const handleDelete = (e) => {
    const newTags = fakeItems.tags.filter((tag) => tag !== e);
    setFakeItems({ ...fakeItems, tags: newTags });
  };

  return (
    <div className={classes.root}>
      <Stack className={classes.contain} direction="row">
        <PostMobileBackDrop />
        <Box className={classes.info}>
          <Paper
            className={classes.leftInfoPaper}
            elevation={3}
            sx={{
              backgroundColor: darkTheme ? "#101010" : "#f9f9f9",
              color: "#c1c1c1",
              transition: "color 0.3s",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              ref={imgRef}
              sx={{ color: darkTheme ? "#c1c1c1" : "rgb(0,0,0)" }}
            >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                fontWeight="bold"
              >
                New Item Listing
              </Typography>
              <Box className={classes.icon}>
                <IconButton onClick={() => setOpen(true)}>
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Stack>
            <PostImgPreview
              imgURLs={imgURLs}
              uploadStatus={uploadStatus}
              control={control}
              errors={errors}
              darkTheme={darkTheme}
              uploadMarketItemImg={uploadMarketItemImg}
              setUploadStatus={setUploadStatus}
              handleDeleteImg={handleDeleteImg}
            />
            <Box className={classes.content}>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Title${!!errors.title ? " is required!" : ""}`}
                      variant="outlined"
                      placeholder="Give your item the coolest name!"
                      autoFocus
                      fullWidth
                      required
                      error={!!errors.title}
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({ ...fakeItems, title: e.target.value });
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /[0-9]/,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Price${!!errors.price ? " is required!" : ""}`}
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.price}
                      type="number"
                      placeholder="eg. 200 (Currency: CAD $)"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            CAD $
                          </InputAdornment>
                        ),
                      }}
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({ ...fakeItems, price: e.target.value });
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="marketItemCategory"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MarketForm
                      title="Category"
                      value={value}
                      options={marketItemCategoryList}
                      required={true}
                      error={!!errors.marketItemCategory}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          marketItemCategory: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="marketItemCondition"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MarketForm
                      title="Condition"
                      value={value}
                      options={marketItemConditionList}
                      required={true}
                      error={!!errors.marketItemCondition}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          marketItemCondition: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <CustomTags
                  placeholder="新装修， 独立卫浴..."
                  initial={fakeItems.tags}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onDelete={(e) => handleDelete(e)}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <GoogleMaps fullWidth />
              </Box>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Description${
                        !!errors.description ? " is required!" : ""
                      }`}
                      value={value}
                      minRows={5}
                      variant="outlined"
                      multiline
                      error={!!errors.description}
                      required
                      placeholder="Describe your items in a more detailed manner!"
                      fullWidth
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          description: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>
              <PostUserInfo
                control={control}
                setValue={setValue}
                errors={errors}
                darkTheme={darkTheme}
                defaultInfo={defaultInfo}
                setDefaultInfo={setDefaultInfo}
              />
            </Box>
            <BackdropLoading open={loading} />
            <Button
              variant="outlined"
              endIcon={<PublishIcon />}
              onClick={handleSubmit(onSubmit)}
              color="primary"
            >
              上传MarketItem
            </Button>
          </Paper>
        </Box>
        <Box className={classes.preview}>
          <Paper elevation={3} sx={{ height: "100%", width: "100%" }}>
            <PreviewInfo
              imgURLs={imgURLs}
              fakeItems={fakeItems}
              darkTheme={darkTheme}
            />
          </Paper>
        </Box>
        <Box className={classes.drawer}>
          <SwipeableDrawerInfo
            position="right"
            open={open}
            setOpen={() => setOpen(true)}
            setClose={() => setOpen(false)}
          >
            <PreviewInfo
              imgURLs={imgURLs}
              fakeItems={fakeItems}
              darkTheme={darkTheme}
            />
          </SwipeableDrawerInfo>
        </Box>
      </Stack>
    </div>
  );
}
