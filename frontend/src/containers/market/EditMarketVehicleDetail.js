import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
import {
  selectMarketItemById,
  updateAddressDetail,
  updateMarketItemDetail,
} from "../../redux/slice/marketSlice";
import { useDispatch, useSelector } from "react-redux";

import InputAdornment from "@mui/material/InputAdornment";
import MarketForm from "../../components/Market/marketForm";
import PostImgPreview from "../../components/Market/postImgPrev";
import PostUserInfo from "../../components/Market/postUserInfo";
import PreviewInfo from "../../components/Market/previewInfo";
import PublishIcon from "@mui/icons-material/Publish";
import SwipeableDrawerInfo from "../../components/Market/swipeableDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { marketVehicleOptions } from "../../components/Market/marketVehicleOptions";
import { postMultipleImages } from "../../redux/slice/generalSlice";
import { postStyle } from "../../components/Market/postCss";
// import { useGetAllImages } from "../../components/Market/useGetImages";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";

export default function EditMarketVehicleDetail() {
  const imgRef = useRef(null);
  const classes = postStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  useTitle("更新二手车辆信息");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const marketItem = useSelector((state) => selectMarketItemById(state, id));
  const { darkTheme } = useSelector((state) => state.general);
  const {
    imgURLs,
    createdAt,
    vehicleType,
    addressID,
    year,
    model,
    make,
    exteriorColor,
    interiorColor,
    fuelType,
    price,
    description,
    contactPhone,
    contactWeChat,
    contactEmail,
  } = marketItem;

  const marketUserInfo = useSelector((state) =>
    selectMarketUserById(state, marketItem.userID)
  );
  // const [trigger, setTrigger] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const { marketVehicleTypeList } = marketVehicleOptions;
  const [open, setOpen] = useState(false);
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [fakeItems, setFakeItems] = useState(marketItem);
  const [imgKeyFromServer, setImgKeyFromServer] = useState(imgURLs);

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      imgURLs: imgKeyFromServer,
      vehicleType: vehicleType,
      year: year,
      model: model,
      make: make,
      exteriorColor: exteriorColor,
      interiorColor: interiorColor,
      fuelType: fuelType,
      price: price,
      description: description,
      contactEmail: contactEmail,
      contactWeChat: contactWeChat,
      contactPhone: contactPhone,
    },
  });

  const uploadMarketItemImg = async (e) => {
    const imagesData = e.target.files;
    const imageLocation = "market/vehicle";

    const response = await dispatch(
      postMultipleImages({ imagesData, imageLocation })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setImgKeyFromServer((prev) => prev.concat(response.payload));
    }
  };

  useEffect(() => {
    if (errors) {
      imgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  useEffect(() => {
    dispatch(fetchMarketUserInfo(marketItem.userID));
  }, [marketItem.userID, dispatch]);

  const onSubmit = async (data) => {
    const address = await GetAddress();
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
      itemID: id,
      userID: marketUserInfo.userID,
      id: addressID,
    };
    const addressResponse = await dispatch(
      updateAddressDetail(createAddressInput)
    );
    console.log(addressResponse);
    const createMarketItemInput = {
      ...data,
      id: id,
      // address: address,
      name: `${data.year} ${data.make} ${data.model}`,
      marketType: "Vehicle",
      addressID: addressID,
      imgURLs: imgKeyFromServer,
      tags: GetTags(),
      active: true,
      userID: marketUserInfo.userID,
      createdAt: createdAt,
      sortKey: "SortKey",
    };
    const { contactEmail, contactPhone, contactWeChat } = data;
    const userInfo = {
      id: marketUserInfo.userID,
      phone: contactPhone,
      weChat: contactWeChat,
      email: contactEmail,
      userID: marketUserInfo.userID,
    };
    // console.log("createMarketItemInput", createMarketItemInput);
    setLoading(false);
    const response = await dispatch(
      updateMarketItemDetail(createMarketItemInput)
    );
    if (marketUserInfo === undefined) {
      await dispatch(postMarketUserInfo(userInfo));
    } else if (marketUserInfo !== undefined) {
      if (defaultInfo === true) {
        await dispatch(updateMarketUserInfoDetail(userInfo));
      }
    }

    console.log("Something should be here", response);
    if (response.meta.requestStatus === "fulfilled") {
      history.replace(`/market/vehicle/${response.payload.id}`);
      reset();
    }
    console.log("Can upload");
  };

  const handleDeleteImg = (imgKey) => {
    const images = [...imgKeyFromServer];
    const newKeys = images.filter((key) => key !== imgKey);
    setImgKeyFromServer(newKeys);
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
            <Stack direction="row" justifyContent="space-between" ref={imgRef}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                fontWeight="bold"
                sx={{ color: darkTheme ? "#c1c1c1" : "rgb(0,0,0)" }}
              >
                New Vehicle Listing
              </Typography>
              <Box className={classes.icon}>
                <IconButton onClick={() => setOpen(true)}>
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Stack>
            <PostImgPreview
              imgURLs={imgKeyFromServer}
              uploadStatus={uploadStatus}
              control={control}
              errors={errors}
              darkTheme={darkTheme}
              uploadMarketItemImg={uploadMarketItemImg}
              // setTrigger={setTrigger}
              setUploadStatus={setUploadStatus}
              handleDeleteImg={handleDeleteImg}
            />
            <Box className={classes.content}>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="make"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Make${!!errors.make ? " is required" : ""}`}
                      autoFocus
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.make}
                      placeholder="eg. Subaru"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({ ...fakeItems, make: e.target.value });
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="model"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Model${!!errors.model ? " is required" : ""}`}
                      variant="outlined"
                      placeholder="IMPREZA WRX STI"
                      fullWidth
                      required
                      error={!!errors.model}
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({ ...fakeItems, model: e.target.value });
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="vehicleType"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MarketForm
                      title="Vehicle Type"
                      value={value}
                      options={marketVehicleTypeList}
                      required={true}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          vehicleType: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                {/* <Controller
                  name="location"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Location${
                        !!errors.location ? " is required" : ""
                      }`}
                      value={value}
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.location}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          location: e.target.value,
                        });
                      }}
                    />
                  )}
                /> */}
                <GoogleMaps></GoogleMaps>
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <CustomTags
                  placeholder="新车， 无事故..."
                  initial={fakeItems.tags}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onDelete={(e) => handleDelete(e)}
                />
              </Box>

              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="year"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /[0-9]/,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Year${!!errors.year ? " is required" : ""}`}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="eg. 2021"
                      required
                      error={!!errors.year}
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({ ...fakeItems, year: e.target.value });
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
                      label={`Price${!!errors.price ? " is required" : ""}`}
                      variant="outlined"
                      fullWidth
                      type="number"
                      required
                      error={!!errors.price}
                      placeholder="eg. 25000 (Currency: CAD $)"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            CAD $
                          </InputAdornment>
                        ),
                      }}
                      value={value}
                      className={classes.titleInput}
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
                  name="exteriorColor"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Exterior Color${
                        !!errors.exteriorColor ? " is required" : ""
                      }`}
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.exteriorColor}
                      placeholder="eg. World Rally Blue"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          exteriorColor: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="interiorColor"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Interior Color${
                        !!errors.interiorColor ? " is required" : ""
                      }`}
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.interiorColor}
                      placeholder="eg. Black"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          interiorColor: e.target.value,
                        });
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginY: "1rem" }}>
                <Controller
                  name="fuelType"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label={`Fuel Type${
                        !!errors.fuelType ? " is required" : ""
                      }`}
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.fuelType}
                      placeholder="eg. Gasoline"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setFakeItems({
                          ...fakeItems,
                          fuelType: e.target.value,
                        });
                      }}
                    />
                  )}
                />
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
                        !!errors.description ? " is required" : ""
                      }`}
                      value={value}
                      minRows={5}
                      variant="outlined"
                      multiline
                      required
                      error={!!errors.description}
                      placeholder="Describe your vehicle in a detailed manner!"
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
                defaultInfo={defaultInfo}
                darkTheme={darkTheme}
                setDefaultInfo={setDefaultInfo}
              />
            </Box>

            <Button
              variant="outlined"
              endIcon={<PublishIcon />}
              onClick={handleSubmit(onSubmit)}
              color="primary"
            >
              上传MarketItem{" "}
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-0.75rem",
                    marginLeft: "-0.75rem",
                  }}
                />
              )}
            </Button>
          </Paper>
        </Box>
        <Box className={classes.preview}>
          <Paper elevation={3} sx={{ height: "100%", width: "100%" }}>
            <PreviewInfo
              imgURLs={imgKeyFromServer}
              fakeItems={fakeItems}
              darkTheme={darkTheme}
            />
          </Paper>
        </Box>
        <Box className={classes.drawer}>
          <SwipeableDrawerInfo
            content={
              <PreviewInfo
                imgURLs={imgKeyFromServer}
                fakeItems={fakeItems}
                darkTheme={darkTheme}
              />
            }
            title="Preview"
            position="bottom"
            open={open}
            setOpen={() => setOpen(true)}
            setClose={() => setOpen(false)}
          />
        </Box>
      </Stack>
    </div>
  );
}
