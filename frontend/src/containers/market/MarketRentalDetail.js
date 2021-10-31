import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  removeSelectedMarketItem,
  selectedMarketItem,
} from "../../redux/actions/marketItemActions";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Storage from "@aws-amplify/storage";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  bread: {
    marginTop: "4rem",
    marginLeft: "1rem",
  },
  root: {
    maxWidth: "960px",
    margin: "auto",
    paddingBlock: "3rem",
    paddingInline: "1rem",
  },
});
export default function MarketRentalDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [imageURL, setImageURL] = useState(null);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    if (id && id !== "") {
      const type = "rental";
      dispatch(selectedMarketItem(id, type));
    }
    return () => dispatch(removeSelectedMarketItem());
  }, [id, dispatch]);
  const { marketItem } = useSelector((state) => state.market.selected);
  console.log("marketItem", marketItem);
  const {
    // id,
    // name,
    imgS3Keys,
    title,
    price,
    description,
    // tags,
    // active,
    createdAt,
    // ByCreatedAt,
    owner,
    marketRentalSaleRent,
    propertyType,
    // bedroomCounts,
    // bathroomsCounts,
    address,
    // propertySize,
    // dateAvailable,
    // laundryType,
    // airConditionType,
    // heatingType,
    catFriendly,
    dogFriendly,
  } = marketItem;

  useEffect(() => {
    const getImage = async () => {
      try {
        const imageAccessURL = await Storage.get(imgS3Keys[0], {
          level: "public",
          expires: 120,
          download: false,
        });
        // console.log("imageAccessURL", imageAccessURL);
        setImageURL(imageAccessURL);
      } catch (error) {
        console.error("error accessing the Image from s3", error);
        setImageURL(null);
      }
    };
    if (imgS3Keys) {
      getImage();
    }
  }, [imgS3Keys]);

  return (
    <div className={classes.root}>
      {Object.keys(marketItem).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <Box>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                component={Link}
                to={`/account/profile/${owner}`}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={owner}
            subheader={`发布日期： ${createdAt.slice(0, 10)} ${createdAt.slice(
              11,
              19
            )}`}
          />
          <Typography variant="h3" align="center" className={classes.title}>
            {title}
          </Typography>

          <CardActionArea
            onClick={() => {
              window.open(imageURL);
            }}
          >
            <CardMedia component="img" image={imageURL} />
          </CardActionArea>
          <Divider />
          <Typography variant="h3" color="red" className={classes.title}>
            Home for Sale or Rent：{marketRentalSaleRent}
          </Typography>
          <Typography variant="h3" color="red" className={classes.title}>
            类型：{propertyType}
          </Typography>
          <Typography variant="h3" color="red" className={classes.title}>
            价格：$ {price}
          </Typography>
          <Typography variant="h3" color="red" className={classes.title}>
            位置：{address}
          </Typography>
          <Typography variant="h3" color="red" className={classes.title}>
            养 猫/狗：{catFriendly}+{dogFriendly}
          </Typography>
          <Typography variant="h3" color="red" className={classes.title}>
            描述：{description}
          </Typography>
          <Typography
            variant="body1"
            className={classes.content}
            component="pre"
          >
            {description}
          </Typography>
          <Button size="small" color="primary">
            回复(测试)
          </Button>
        </Box>
      )}
    </div>
  );
}