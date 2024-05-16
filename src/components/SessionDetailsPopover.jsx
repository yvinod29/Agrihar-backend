import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

const SessionDetailsPopover = ({ selectedClass }) => {
  return (
    <>
    {selectedClass && (
        <div>
          <Typography variant="h6">
            Date:{" "}
            {new Date(selectedClass.date).toLocaleDateString()}
          </Typography>
          <Typography variant="h6">
            Time: {selectedClass.time}
          </Typography>
          <Typography variant="h6">Registered Students:</Typography>
          <table
            style={{
              borderCollapse: "collapse",
              border: "3px solid black",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Index
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Number of Guests
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Amount Paid
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Check In
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedClass.registeredStudents.map(
                (student, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {student.name}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {student.email}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {student.numberOfGuests}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {student.payment ? "Paid" : "Not Paid"}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <input type="checkbox" />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          </div>
          
  )}
  </>
)};

SessionDetailsPopover.propTypes = {
  selectedClass: PropTypes.object,
};

export default SessionDetailsPopover;
