import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Check from "@mui/icons-material/Check";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";
import HostWeddingstep1 from "../../components/HostWeddingSteps/HostWeddingstep1";
import HostWeddingstep2 from "../../components/HostWeddingSteps/HostWeddingstep2";
import HostWeddingstep3 from "../../components/HostWeddingSteps/HostWeddingstep3";
import HostWeddingstep4 from "../../components/HostWeddingSteps/HostWeddingstep4";
import { useCreateWeddingMutation } from "../../store/api/WeddingApi";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
   },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const CustomColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function CustomColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <GroupAddIcon />,
    2: <AddPhotoAlternateIcon />,
    3: <CalendarMonthIcon />,
    4: <GroupAddIcon />,
  };

  return (
    <CustomColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </CustomColorlibStepIconRoot>
  );
}

CustomColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = [
  "Bride and Groom details",
  "Photos",
  "Schedule",
  "Guide infomation",
];

const HostWedding = () => {
  const [CreateWedding] = useCreateWeddingMutation();
  const [step, setStep] = useState(0); // Start from step 0
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

  const totalSteps = steps.length;
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleImageUpload = (e) => {
    const images = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, images: [...prevData.images, ...images] }));

  };
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    setProgress((prevProgress) =>
      Math.min(prevProgress + 100 / totalSteps, 100)
    );
    console.log(formData);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
    setProgress((prevProgress) => Math.max(prevProgress - 100 / totalSteps, 0));
  };

  const handleSubmit = async () => {
    // Submission logic
    try {
      const token = localStorage.getItem("token");

      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append("hostRole",formData.hostRole);
      if(formData.hostRole==="other"){
        formDataToSend.append("hostFirstName",formData.hostFirstName);
        formDataToSend.append("hostLastName",formData.hostLastName);
        formDataToSend.append("hostPhoneNumber",formData.hostPhoneNumber);
        formDataToSend.append("hostEmail",formData.hostEmail);
        formDataToSend.append("hostRelation",formData.hostRelation);
      }
      formDataToSend.append("groomFirstName", formData.groomFirstName);
      formDataToSend.append("groomLastName", formData.groomLastName);
      formDataToSend.append("groomPhoneNumber", formData.groomPhoneNumber);
      formDataToSend.append("groomEmail", formData.groomEmail);
      formDataToSend.append("brideFirstName", formData.brideFirstName);
      formDataToSend.append("brideLastName", formData.brideLastName);
      formDataToSend.append("bridePhoneNumber", formData.bridePhoneNumber);
      formDataToSend.append("brideEmail", formData.brideEmail);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("languagesKnown", formData.languagesKnown);
      formDataToSend.append("foodOffered", formData.foodOffered);
      formDataToSend.append("facilitiesProvided", formData.facilitiesProvided);
      formDataToSend.append("accountDetails", formData.accountDetails);
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
    });      
    formDataToSend.append(`guestGuide[name]`, formData.guideName);
      formDataToSend.append(`guestGuide[phoneNumber]`,formData.guidePhoneNumber);
      formDataToSend.append(`guestGuide[relation]`, formData.guideRelation);
      formDataToSend.append(`guestGuide[email]`, formData.guideEmail);
      const eventsArray = JSON.stringify(formData.events);
      // Append the JSON string to FormData
      formDataToSend.append("events", eventsArray);
      console.log(formDataToSend);
      console.log([...formDataToSend.entries()]);

      console.log(formData.groomEmail);
      const response = await CreateWedding({ formDataToSend, token });
      console.log("Wedding created successfully:", response);

     
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <HostWeddingstep1
            formData={formData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <HostWeddingstep2
            formData={formData}
            handleImageUpload={handleImageUpload}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 2:
        return (
          <HostWeddingstep3
            formData={formData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <HostWeddingstep4
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handlePreviousStep={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-20">
      <div className=" p-20 rounded-lg shadow-md mx-auto max-w-screen-lg">
        <h2 className="text-2xl mb-4 text-center mt-8">
          Register Your Wedding
        </h2>
        <div className="mb-6">
          <Stack sx={{ width: "100%" }} spacing={3}>
            <Stepper
              activeStep={step}
              alternativeLabel
              connector={<QontoConnector />}
              style={{ zIndex: 1 }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={
                      index === step ? QontoStepIcon : CustomColorlibStepIcon
                    }
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default HostWedding;
