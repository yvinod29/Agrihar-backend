import React, { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import { useUpdateReviewMutation } from "../store/api/AgricultureApi";
import { useParams } from "react-router-dom";

const ReviewComponent = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [updateReview ]=useUpdateReviewMutation();
  const {agriculture_id}=useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitReview = async() => {
    // Handle submitting the review
    console.log("Rating:", rating);
    console.log("Description:", description);
    const token=localStorage.getItem("token")
    const review ={
        rating,
        description
    }
    
    const session=await  updateReview({token, agriculture_id,review})
    console.log(session)
    setOpen(false); // Close the popper after submitting
  };

  const handleReviewClick = () => {
    // Handle review button click, you can navigate to a review page or open a modal
    setAnchorEl(event.currentTarget);
    setOpen(true);
    console.log("Review clicked for session:");

  };
  return (
    <div>
      <button
        onClick={() => handleReviewClick()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
      >
        Give Review
      </button>
      <div>
        <Box>
          <Popper
            open={open}
            //   anchorEl={anchorEl}
            placement="bottom"
            transition
            disablePortal
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 4,
                      p: 2,
                      minWidth: 300,
                      maxWidth: "90%",
                      position: "relative",
                    }}
                  >
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    >
                      <CloseIcon />
                    </Button>
                    {/* take the rating input with starts and descprion in input box */}
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                    <textarea
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter your review description..."
                      style={{
                        width: "100%",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitReview}
                      style={{ marginTop: "10px" }}
                    >
                      Submit Review
                    </Button>
                  </Box>
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>
      </div>
    </div>
  );
};

export default ReviewComponent;
