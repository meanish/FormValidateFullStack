import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { convertTimestamp } from "../../helper/Timeformat";
import { NavLink } from "react-router-dom";

const BlogCard = ({ Paragraph, Heading, Image, val }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {val.users[0].full_name.charAt(0)}
          </Avatar>
        }
        title={val.users[0].full_name}
        subheader={convertTimestamp(val.createdAt)}
      />

      {/* <CardMedia component="img" height="194" image={Image} alt="blog Card" /> */}
      <CardMedia>
        <figure className="snip1251 yellow">
          <img src={Image} alt="blog Card" className="h-44 w-full" />
          <NavLink className="ion-chatboxes" to={`blog/${val._id}`}>
            Read More
          </NavLink>
        </figure>
      </CardMedia>

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1, // Set the number of lines you want to display
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {Heading}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2, // Set the number of lines you want to display
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "40px",
          }}
        >
          {Paragraph}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <FileCopyIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
