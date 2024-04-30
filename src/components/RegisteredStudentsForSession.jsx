import React from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

const RegisteredStudentsForSession = ({ schedule }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const anchorRef = React.useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, classDetails) => {
    setSelectedClass(classDetails);
    setOpen(!open);
  };

  return (
    <div>
      <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Scheduled Sessions</h1>
      <div>
        <h1>Agriculture Session</h1>
        {schedule.map((entry, index) => {
          const hasRegisteredStudents = entry.classTime.some(timeEntry => timeEntry.registeredStudents.length > 0);
          if (!hasRegisteredStudents) return null;

          return (
            <div key={index}>
              <h2 className='font-bold'>Date: {new Date(entry.classDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</h2>
              <div className="grid grid-cols-3 gap-4">
                {entry.classTime.map((timeEntry, timeIndex) => {
                  if (timeEntry.registeredStudents.length > 0) {
                    return (
                      <div key={timeIndex} className="border border-gray-200 rounded-md p-4">
                        <h3>Time: {timeEntry.time}</h3>
                        <p>Students Registered: {timeEntry.registeredStudents.length}</p>
                        <Button
                          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4'
                          onClick={(event) => handleClick(event, { date: entry.classDate, time: timeEntry.time, registeredStudents: timeEntry.registeredStudents })}
                          ref={anchorRef}
                        >
                          View Details
                        </Button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Box>
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
                  height: "100vh",
                  bgcolor: "rgba(0,0,0,0.5)",
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
                  {selectedClass && (
  <div>
    <Typography variant="h6">Date: {new Date(selectedClass.date).toLocaleDateString()}</Typography>
    <Typography variant="h6">Time: {selectedClass.time}</Typography>
    <Typography variant="h6">Registered Students:</Typography>
    <table style={{ borderCollapse: 'collapse', border: '3px solid black' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Index</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Number of Guests</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Amount Paid</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Check In</th>
        </tr>
      </thead>
      <tbody>
        {selectedClass.registeredStudents.map((student, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.name}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.email}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{student.numberOfGuests}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{student.payment ? 'Paid' : 'Not Paid'}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}><input type="checkbox" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
      </Box>
    </div>
  );
}

RegisteredStudentsForSession.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.shape({
    classDate: PropTypes.instanceOf(Date).isRequired,
    classTime: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.string.isRequired,
      registeredStudents: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  })).isRequired,
}

export default RegisteredStudentsForSession;
