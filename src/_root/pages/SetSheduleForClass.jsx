import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DatePicker, { Calendar } from "react-multi-date-picker";
import {
  useUpdateSheduleOfSessionMutation,
  useGetAgricultureSessionByIdQuery,
  useDeleteSheduleOfSessionMutation,
} from "../../store/api/AgricultureApi";
import SheduledSessions from "../../components/SheduledSessions";
import { addYears } from "flowbite-react/lib/esm/components/Datepicker/helpers";
import { addMonths } from "date-fns";

const SetScheduleForClass = () => {
  const { agriculture_id } = useParams();
  const [agricultureSessionData, setAgricultureSessionData] = useState(null);
  const [timings, setTimings] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [numberOfHours, setNumberOfHours] = useState(1);
  const [dates, setDates] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const { data } = useGetAgricultureSessionByIdQuery(agriculture_id);
  const navigate = useNavigate();
  const [updateSchedule, { isLoading, isSuccess }] =
    useUpdateSheduleOfSessionMutation();
  const [deleteSchedule] = useDeleteSheduleOfSessionMutation();
  const maxDate = addMonths(new Date(), 3);
  const disabledDates = [new Date('2024-05-10'), new Date('2024-05-20')]; // Add your specific dates here


  const [mode, setMode] = useState();

  // const datesFromSchedule = data.AgricultureSession.schedule.map(entry => new Date(entry.classDate));
  //  const [values, setValues] = useState(datesFromSchedule);

  useEffect(() => {
    if (data && data.AgricultureSession && data.AgricultureSession.media[0]) {
      setAgricultureSessionData(data.AgricultureSession);
    }

    const updatedSchedule = dates.map((date) => ({
      classDate: date.toDate(),
      classTime: timings.map((time) => ({ time, mode })),
    }));
    setSchedule(updatedSchedule);
    console.log(schedule);
  }, [data, dates, timings, mode]);

  const handleOkClick = () => {
    if (
      typeof startTime === "object" &&
      startTime.$H !== undefined &&
      startTime.$m !== undefined &&
      numberOfHours
    ) {
      const startHour = startTime.$H;
      const startMinute = startTime.$m;
      const amOrPmStart = startHour >= 12 ? "PM" : "AM";
      const formattedStartHour = startHour % 12 || 12;
      let endHour = startHour + numberOfHours;
      let amOrPmEnd = "AM";
      if (endHour >= 12) {
        amOrPmEnd = "PM";
        if (endHour > 12) {
          endHour -= 12;
        }
      }
      const newStartTime = startTime.format("hh:mm A");
      const newEndTime = `${endHour.toString().padStart(2, "0")}:${startMinute
        .toString()
        .padStart(2, "0")}`;
      const newTiming = `${newStartTime} - ${newEndTime} ${amOrPmEnd}`;
      if (!timings.includes(newTiming)) {
        setTimings((prevTimings) => [...prevTimings, newTiming]);
      }
    }
  };

  const handleDeleteTiming = async (index) => {
    const token = localStorage.getItem("token");
    console.log(index);
    try {
      await deleteSchedule({ scheduleId: index, agriculture_id }); // Delete the schedule with the specified index
    } catch (error) {
      console.error("Error deleting timing:", error);
      // Handle error
    }
  };

  const handleSubmitClick = async () => {
    const token = localStorage.getItem("token");
    try {
      await updateSchedule({ schedule, token, agriculture_id });
      navigate(-1);
    } catch (error) {
      console.error("Error updating schedule:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="mt-14 p-7 flex flex-row  gap-9 ">
        <div>
          {/* <Calendar
                value={values}
                readOnly
                   />  */}
        </div>
        <div className="ml-9">
          <div>
            <h2 className="font-semibold mb-2">Select Mode:</h2>
            <select
              onChange={(e) => setMode(e.target.value)}
              name="mode"
              value={mode}
            >
              <option value="">Select a mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="mb-8 ">
            <label className="block mb-1">Number of Hours:</label>
            <input
              type="number"
              value={numberOfHours}
              onChange={(e) => setNumberOfHours(parseInt(e.target.value))}
              min="1"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mb-8">
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </div>
          </LocalizationProvider>
          <button
            onClick={handleOkClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          >
            Select Start Time
          </button>
          <div className="mt-8">
            <h2 className="mb-2">Selected Timings:</h2>
            <ul className="list-disc pl-5">
              {timings.map((timing, index) => (
                <li key={index} className="flex justify-between">
                  {timing}
                  <button
                    onClick={() => handleDeleteTiming(index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <label className="block mb-2">Select Dates:</label>
            <DatePicker
              format="MMMM DD YYYY"
              multiple
              value={dates}
              
              onChange={setDates}
              minDate={new Date()} // Prevent selecting previous dates
              maxDate={maxDate} // Allow selecting dates up to three months from the current date
              disabledDates={disabledDates} // Disable specific dates
              className="yellow"
              numberOfMonths={3}	
              placeholder="Select Dates"
              editable
            />
          </div>
          <button
            onClick={handleSubmitClick}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-8"
          >
            {isLoading ? "Loading..." : "Set Schedule"}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap">
        {agricultureSessionData &&
          agricultureSessionData.schedule.map((entry, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 mb-4 relative"
              style={{
                width: "calc(33.33% - 1rem)",
                marginRight: "1rem",
              }}
            >
              {/* Schedule details */}
              <h2 className="text-lg font-semibold mb-2">
                Schedule {index + 1} (
                {new Date(entry.classDate).toLocaleDateString()})
              </h2>
              <ul className="list-disc pl-5">
                {entry.classTime.map((timeEntry, timeIndex) => (
                  <li key={timeIndex}>
                    {timeEntry.time} {/* Display class time */}
                  </li>
                ))}
              </ul>
              {/* Delete button within the card */}
              <button
                onClick={() => handleDeleteTiming(entry._id)}
                className="text-red-500 absolute top-2 right-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default SetScheduleForClass;
