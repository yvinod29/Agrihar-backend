import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import DatePicker from "react-multi-date-picker";
import { useUpdateSheduleOfSessionMutation } from "../../store/api/AgricultureApi";

const SetScheduleForClass = () => {
  const [timings, setTimings] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [numberOfHours, setNumberOfHours] = useState(1);
  const [dates, setDates] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [updatedSchedule, { isLoading , isSuccess}] = useUpdateSheduleOfSessionMutation();
  const { agriculture_id } = useParams();

  useEffect(() => {
    const updatedSchedule = [];
    dates.forEach((date) => {
      const scheduleEntry = {
        classDate: date.format(),
        classTime: [...timings]
      };
      updatedSchedule.push(scheduleEntry);
    });
    setSchedule(updatedSchedule);
  }, [dates, startTime, timings]);

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
      const newStartTime = startTime.format("HH:mm");
      const newEndTime = `${endHour.toString().padStart(2, "0")}:${startMinute
        .toString()
        .padStart(2, "0")}`;
      const newTiming = `${newStartTime} ${amOrPmStart} - ${newEndTime} ${amOrPmEnd}`;
      if (!timings.includes(newTiming)) {
        setTimings((prevTimings) => [...prevTimings, newTiming]);
      }
    }
  };
  const navigate=useNavigate();

  const handleSubmitClick = async () => {
    const token = localStorage.getItem("token");
    const session = await updatedSchedule({ schedule, token, agriculture_id });
    console.log(session);
    console.log(schedule);
    navigate(-1)
     
  };

  return (
    <div className="mt-14 p-7 mx-auto max-w-lg">
      <div className="mb-4">
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
        <div className="mb-4">
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
      <div className="mt-4">
        <h2 className="mb-2">Selected Timings:</h2>
        <ul className="list-disc pl-5">
          {timings.map((timing, index) => (
            <li key={index}>{timing}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Select Dates:</label>
        <DatePicker
          format="MMMM DD YYYY"
          multiple
          value={dates}
          onChange={setDates}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleSubmitClick}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
      >
        {isLoading ? "Loading..." : "Set Schedule"}
      </button>
    </div>
  );
};

export default SetScheduleForClass;
