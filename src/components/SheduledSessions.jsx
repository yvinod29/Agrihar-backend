import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import BookSession from "../_root/pages/BookSession";

const SheduledSessions = ({ AgricultureSession ,  handleRefetch }) => {
  const [AgricultureSessionData, setAgricultureSesstionData] =
    useState(AgricultureSession); // Initialize with null

  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date.format("M/D/YYYY"));
  };
  const handleChooseDate = (date) => {
    console.log(selectedDate);
  };

  const handleClick = (event, date) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    console.log(date);
    // setSelectedDate(date);
    setDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        From ₹{AgricultureSessionData.pricePerSession}
        <label className="block mb-2 font-semibold">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          onCalendarClose={() => handleChooseDate(selectedDate)} // Update selectedDate when calendar close
        />
        <div>
          {AgricultureSessionData.schedule
            .slice(0, selectedDate ? AgricultureSessionData.schedule.length : 3)
            .map((entry) => (
              <div
                key={entry.classDate}
                className={`bg-white rounded-lg shadow-md p-4 mb-4 ${
                  selectedDate &&
                  selectedDate ===
                    new Date(entry.classDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    ? ""
                    : selectedDate === null
                    ? ""
                    : "hidden"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {new Date(entry.classDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  
                </h3>

                <div>
                  <button
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
                    type="button"
                    onClick={() => handleClick(event, entry.classDate)}
                  >
                    Choose
                  </button>
                  <Box>{
                    <Popper
                      open={open}

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
                              height: "100vh", // Set height to fill the entire screen
                              bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "white",
                                borderRadius: 4,
                                p: 2,
                                minWidth: 300,
                                maxWidth: "90%",
                                position: "relative", // For positioning close button
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

                              <div>
                                <BookSession
                                  selectedDate={date}
                                  schedule={AgricultureSessionData.schedule}
                                  handleClose={handleClose}
                                  PricePerSession={AgricultureSessionData.pricePerSession}
                                  handleRefetch={handleRefetch}
                                />
                              </div>
                            </Box>
                          </Box>
                        </Fade>
                      )}
                    </Popper>
                    }
                  </Box>
                </div>
                <ul>
                  {entry.classTime.map((times, index) => (
                    <li key={index} className="mb-1">
                      {times.time} ({times.mode})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

SheduledSessions.propTypes = {
  AgricultureSession: PropTypes.object.isRequired,
  handleRefetch: PropTypes.func.isRequired,

};

export default SheduledSessions;
