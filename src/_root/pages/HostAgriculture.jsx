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
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HostAgricultureStep1 from "../../components/HostAgricultureSteps/HostAgricultureStep1";
import HostAgricultureStep2 from "../../components/HostAgricultureSteps/HostAgricultureStep2";
import HostAgricultureStep3 from "../../components/HostAgricultureSteps/HostAgricultureStep3";
import HostAgricultureStep4 from "../../components/HostAgricultureSteps/HostAgricultureStep4";
import { useCreateAgricultureSessionMutation } from "../../store/api/AgricultureApi";

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

const steps = ["Instrctor Details", "Photos", "Schedule", "Bank Account"];

const HostAgriculture = () => {
  const [CreateWedding] = useCreateAgricultureSessionMutation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    instructorFirstName: "",
    instructorLastName: "",
    instructorEmail: "",
    instructorPhoneNumber: "",
    instructorDescription: "",
    whatToTeach: "",
    images: [],
    duration: "",
    pricePerSession: 0,
    location: [],
    languagesKnown: "",
    studentsPerClass: 40,
    facilitiesProvided: "",
    requirements: "",
    accountDetails: [],
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
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...images],
    }));
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
      formDataToSend.append("instructorFirstName",formData.instructorFirstName);
      formDataToSend.append("instructorLastName", formData.instructorLastName);
      formDataToSend.append("instructorEmail", formData.instructorEmail);
      formDataToSend.append("instructorDescription",formData.instructorDescription);
      formDataToSend.append("instructorPhoneNumber",formData.instructorPhoneNumber);
      formDataToSend.append("whatToTeach", formData.whatToTeach);
      formDataToSend.append("pricePerSession", formData.pricePerSession);
      formDataToSend.append("studentsPerClass", formData.studentsPerClass);
      formDataToSend.append("facilitiesProvided", formData.facilitiesProvided);
      formDataToSend.append("requirements", formData.requirements);
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });

      const location = JSON.stringify(formData.location);
      // Append the JSON string to FormDat
      formDataToSend.append("location", location);

      const accountDetails = JSON.stringify(formData.accountDetails);
      // Append the JSON string to FormDat
      formDataToSend.append("accountDetails", accountDetails);

      console.log(formDataToSend);
      console.log([...formDataToSend.entries()]);

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
          <HostAgricultureStep1
            formData={formData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <HostAgricultureStep2
            formData={formData}
            handleImageUpload={handleImageUpload}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 2:
        return (
          <HostAgricultureStep3
            formData={formData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <HostAgricultureStep4
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
        <h2 className="text-2xl mb-4 text-center mt-8">Agriculture Session</h2>
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

export default HostAgriculture;
