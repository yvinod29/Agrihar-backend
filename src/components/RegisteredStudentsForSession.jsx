import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import SessionDetailsPopover from "./SessionDetailsPopover";
const RegisteredStudentsForSession = ({ schedule }) => {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, classDetails) => {
    setSelectedClass(classDetails);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Scheduled Sessions</h1>
      <div className="flex">
        <div className="w-1/4 mr-8">
          <div>
            <div className="flex items-center gap-3 p-3">

            <h1 className="font-bold">Online Classes</h1>
            <img src="/assets/images/webinar.png" className="w-24 h-20"/>
            </div>
            {schedule.map((entry, index) => {
              const onlineClasses = entry.classTime.filter(
                (timeEntry) =>
                  timeEntry.mode === "online" &&
                  timeEntry.registeredStudents.length > 0
              );

              return ( 
                <div key={index}>
                  {onlineClasses.map((timeEntry, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="border border-gray-200 rounded-md p-4 mb-4"
                    >
                      <Typography variant="subtitle1">
                        Date:{" "}
                        {new Date(entry.classDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Typography variant="subtitle1">
                        Time: {timeEntry.time}
                      </Typography>
                      <Typography variant="body2">
                        Students Registered:{" "}
                        {timeEntry.registeredStudents.length}
                      </Typography>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                        onClick={(event) =>
                          handleClick(event, {
                            date: new Date(entry.classDate),
                            time: timeEntry.time,
                            registeredStudents: timeEntry.registeredStudents,
                          })
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/4">
          <div>
          <div className="flex items-center gap-3 p-3">

            <h1 className="font-bold">Offline Classes</h1>
            <img src="/assets/images/training.png" className="w-24 h-20"/>
          </div>

            {schedule.map((entry, index) => {
              const offlineClasses = entry.classTime.filter(
                (timeEntry) =>
                  timeEntry.mode === "offline" &&
                  timeEntry.registeredStudents.length > 0
              );

              return (
                <div key={index}>
                  {offlineClasses.map((timeEntry, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="border border-gray-200 rounded-md p-4 mb-4"
                    >
                      <Typography variant="subtitle1">
                        Date:{" "}
                        {new Date(entry.classDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Typography variant="subtitle1">
                        Time: {timeEntry.time}
                      </Typography>
                      <Typography variant="body2">
                        Students Registered:{" "}
                        {timeEntry.registeredStudents.length}
                      </Typography>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                        onClick={(event) =>
                          handleClick(event, {
                            date: new Date(entry.classDate),
                            time: timeEntry.time,
                            registeredStudents: timeEntry.registeredStudents,
                          })
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Box>
        <Popper
          open={open}
          // anchorEl={anchorEl}
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
                  <SessionDetailsPopover selectedClass={selectedClass} />
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
      </Box>
    </div>
  );
};

RegisteredStudentsForSession.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      classDate: PropTypes.string.isRequired,
      classTime: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          registeredStudents: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              email: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default RegisteredStudentsForSession;
