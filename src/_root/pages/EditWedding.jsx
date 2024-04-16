import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetWeddingByIdQuery } from "../../store/api/WeddingApi";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const EditWedding = () => {
const { wedding_id } = useParams();
const { data, error, isLoading, isSuccess } = useGetWeddingByIdQuery(wedding_id);
const wedding=data?.wedding; 
   
 
const [formData, setFormData] = useState({
    hostRole: "",
    hostFirstName:"",
    hostLastName:"",
    hostRelation:"",
    hostPhoneNumber:"",
    hostEmail:"",
    groomFirstName: "",
    groomLastName: "",
    groomPhoneNumber: "",
    groomEmail: "",
    brideFirstName: "",
    brideLastName: "",
    bridePhoneNumber: "",
    brideEmail: "",
    images:[] ,
    duration: "",
    languagesKnown: "",
    foodOffered: "",
    facilitiesProvided: "",
    events: [],
    guideName: "",
    guidePhoneNumber: "",
    guideEmail: "",
    guideRelation: "",
  });
  const [events, setEvents] = useState([])
  const [guide ,setGuide]=useState([]);



 useEffect(()=>{
    if(isSuccess){
     setFormData(wedding)
     setEvents(wedding.events)
     setGuide(wedding.guestGuide)
    }
 },[isSuccess])
 
 useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      events: events,
    }));
  }, [events]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };
  

  const addEvent = () => {
    setEvents([
      ...events,
      {
        eventName: "",
        startingTime: null,
        description: "",
        dressCode: "",
        musicAndDancing: "",
        region: "",
        city: "",
        postalCode: "",
        street: "",
        venueName: "",
      },
    ]);
  };

 
  const handleEventInputChange = (index, name, value) => {
    const newEvents = [...events]; // Create a copy of the events array
  newEvents[index] = { ...newEvents[index], [name]: value }; // Update the specific event object
  setEvents(newEvents); // Set the modified copy back to state
     console.log("wind")
   };


   const handleGuideInputChange = (e) => {
    let  newGuide = [...events]; // Create a copy of the events array
    newGuide = { ...newGuide, [e.target.name]: e.target.value }; // Update the specific event object
    setGuide(newGuide);
  };

  return (
<>
  <div className="mt-20">
  <div className="flex justify-center items-center h-full">
  <h1 className="font-bold mb-2 text-2xl">
    Edit {data?.wedding.brideFirstName} & {data?.wedding.groomFirstName}&apos;s wedding
  </h1>
</div>
    { !isLoading?(

     <>
           <div className=" p-20 rounded-lg shadow-md mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your First Name:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostFirstName"
                                    value={formData.hostFirstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Last Name:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostLastName"
                                    value={formData.hostLastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Relation to Bride or Groom:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostRelation"
                                    value={formData.hostRelation}
                                    onChange={handleInputChange}
                                    placeholder="Eg : Brother"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Phone Number:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostPhoneNumber"
                                    value={formData.hostPhoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Email:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="email"
                                    name="hostEmail"
                                    value={formData.hostEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Bride First Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="brideFirstName"
                                value={formData.brideFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Bride Last Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="brideLastName"
                                value={formData.brideLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Bride Phone Number:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="bridePhoneNumber"
                                value={formData.bridePhoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Bride Email:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="email"
                                name="brideEmail"
                                value={formData.brideEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Groom First Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomFirstName"
                                value={formData.groomFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Groom Last Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomLastName"
                                value={formData.groomLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Groom Phone Number:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomPhoneNumber"
                                value={formData.groomPhoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Groom Email:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="email"
                                name="groomEmail"
                                value={formData.groomEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                  
                    <div className="">
          <label className="font-semibold">Languages Known:</label>
          <input
            type="text"
            name="languagesKnown"
            value={formData.languagesKnown}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Eg : English , Telugu"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Facilities Provided:</label>
          <input
            type="text"
            name="facilitiesProvided"
            value={formData.facilitiesProvided}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Eg : Transportation , Accomidation"
          />
        </div>
        </div>
        <div>
            
        {events.map((event, index) => (
        <div key={index} className="mt-4 border border-gray-300 p-4 rounded-md">
          <h3 className="text-lg font-bold">Day {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor={`eventName-${index}`} className="font-semibold">
                Event Name:
              </label>
              <input
                type="text"
                id={`eventName-${index}`}
                name={`eventName`}
                value={event.eventName}
                onChange={(e) =>
                  handleEventInputChange(index, "eventName", e.target.value)
                }
                placeholder="Eg : Sangeet"
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`startingTime-${index}`}
                className="font-semibold"
              >
                Starting Time:
              </label>
              <DatePicker
                id={`startingTime-${index}`}
                selected={event.startingTime}
                onChange={(date) =>
                  handleEventInputChange(index, "startingTime", date)
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select Aproximate time when it's starts"
                className="border p-2 rounded-md"
              />
            </div>

             

            <div className="flex flex-col">
              <label htmlFor={`dressCode-${index}`} className="font-semibold">
                Dress Code:
              </label>
              <input
                type="text"
                id={`dressCode-${index}`}
                name={`dressCode`}
                value={event.dressCode}
                onChange={(e) =>
                  handleEventInputChange(index, "dressCode", e.target.value)
                }
                placeholder="Eg : Traditional"
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`musicAndDancing-${index}`}
                className="font-semibold"
              >
                Activities:
              </label>
              <input
                type="text"
                id={`musicAndDancing-${index}`}
                name={`musicAndDancing`}
                value={event.musicAndDancing}
                onChange={(e) =>
                  handleEventInputChange(
                    index,
                    "musicAndDancing",
                    e.target.value
                  )
                }
                placeholder="Eg :Music, Dancing"
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold ">Food Offered:</label>
              <FormControl className="w-60  ">
                <Select
                  id={`foodOffered-${index}`}
                  name="foodOffered"
                  value={event.foodOffered || ""}
                  onChange={(e) =>
                    handleEventInputChange(index, "foodOffered", e.target.value)
                  }
                  className="border  rounded-md"
                >
                  <MenuItem value="veg">Vegetarian</MenuItem>
                  <MenuItem value="non-veg">Non-Vegetarian</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <h2 className="text-lg font-semibold mb-4">Location Details</h2>
            <br />
            <div className="flex flex-col">
              <label className="font-semibold">Country:</label>
              <input
                type="text"
                id={`country-${index}`}
                name="country"
                value="India"
                readOnly
                className=""
                placeholder="India"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Region:</label>
              <input
                type="text"
                id={`region-${index}`}
                name="region"
                value={event.region}
                onChange={(e) =>
                  handleEventInputChange(index, "region", e.target.value)
                }
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">City:</label>
              <input
                type="text"
                id={`city-${index}`}
                name="city"
                value={event.city}
                onChange={(e) =>
                  handleEventInputChange(index, "city", e.target.value)
                }
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Postal Code:</label>
              <input
                type="text"
                id={`postalCode-${index}`}
                name="postalCode"
                value={ event.postalCode}
                onChange={(e) =>
                  handleEventInputChange(index, "postalCode", e.target.value)
                }
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Street :</label>
              <input
                type="text"
                id={`street-${index}`}
                name="street"
                value={event.street}
                onChange={(e) =>
                  handleEventInputChange(index, "street", e.target.value)
                }
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Name of Venue:</label>
              <input
                type="text"
                id={`venueName-${index}`}
                name="venueName"
                value={event.venueName}
                onChange={(e) =>
                  handleEventInputChange(index, "venueName", e.target.value)
                }
                className=""
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description:</label>
            <TextareaAutosize
              type="text"
              id={`description-${index}`}
              name={`description`}
              value={event.description}
              onChange={(e) =>
                handleEventInputChange(index, "description", e.target.value)
              }
              placeholder="Provide details about the event"
              className="border p-2 rounded-md"
              style={{ minHeight: "80px", resize: "none" }} // You can adjust the height as needed
            />
          </div>
        </div>
      ))}


                 
                    




                </div>
                <div className="max-w-md mx-auto">
                <div className="">
                    <h2 className="text-xl mb-4">Guide Information</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Name:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name"
                                value={guide.name}
                                onChange={handleGuideInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Phone Number:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="phoneNumber"
                                value={guide.phoneNumber}
                                onChange={handleGuideInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Email:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                value={guide.email}
                                onChange={handleGuideInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bride Relation:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="relation"
                                value={guide.relation}
                                onChange={handleGuideInputChange}
                                placeholder="Eg : Sister "
                            />
                        </label>
                    </div>
                    </div>
                    </div>

              
                 </div>
                 </>
                 ):(
                    <>
                    <h1>loading</h1>
                    </>
                 )}
  </div>
  </>
  )
};

export default EditWedding;
