import React, { useEffect, useState } from "react";
import "./add_user.css";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import AppButton from "../AppButton/AppButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import NotificationService from "../../services/notification_service/notification_service";

const rollKallRepository = new RollKallRepository();
const notificationService = new NotificationService();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  fontFamily: "Montserrat",
};

const genders = ["Male", "Female"];

const AddUser = ({ closeModal, refresh }) => {
  const [formData, setFormData] = useState({
    imgUrl: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    job_title: "",
    role: "",
    address: "",
    gender: "Male",
    phone: "",
    status: "active",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRoles = async () => {
      const result = await rollKallRepository.fetchRoles();
      setRoles(result);
    };
    getRoles();
  }, []);

  const passwordInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, password: e.target.value });
    //  console.log(formData);
  };
  const firstNameInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, first_name: e.target.value });
    //  console.log(formData);
  };
  const lastNameInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, last_name: e.target.value });
    //  console.log(formData);
  };
  const emailInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value });
    //  console.log(formData);
  };
  const jobTitleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, job_title: e.target.value });
    //  console.log(formData);
  };
  const addressInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, address: e.target.value });
    //  console.log(formData);
  };
  const passwordConfirmInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, confirmPassword: e.target.value });
    //  console.log(formData);
  };
  const phoneInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, phone: e.target.value });
    //  console.log(formData);
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, role: e.target.value });
  };

  const handleGenderChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, gender: e.target.value });
  };

  const onImageInputChange = (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 1000000) {
      console.log("File too large");
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
        const result =  reader.result;
        const base64String = result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImgUrl(base64String);
        setFormData({ ...formData, imgUrl: base64String });
       
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }

  };

  const submitForm = async(e) => {
    setIsLoading(true);
    e.preventDefault();
    const user = await rollKallRepository.addUser(formData);
    if(user){
      notificationService.showSuccess('User added Successfully', 'addUser')
      refresh(true);
      closeModal(false);

    }
  };

  return (
    <div>
      <Box sx={style}>
        <div className="add-user-container-head">
          <div className="head-title bold">Add user</div>
          <AppButton
            onBtnClick={() => closeModal(false)}
            bgColor={"bg-red"}
            text="X"
            size="ss"
          />
        </div>
        <div className="input-form">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="fname">First Name</InputLabel>
            <Input
              id="fname"
              type={"text"}
              value={formData.first_name}
              onChange={firstNameInputChange}
            />
          </FormControl>
          
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="lname">Last Name</InputLabel>
            <Input
              id="lname"
              type={"text"}
              value={formData.last_name}
              onChange={lastNameInputChange}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type={"email"}
              value={formData.email}
              onChange={emailInputChange}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              id="phone"
              type={"text"}
              value={formData.phone}
              onChange={phoneInputChange}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input
              id="address"
              type={"text"}
              value={formData.address}
              onChange={addressInputChange}
            />
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="">User Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              value={formData.role}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <MenuItem value={role._id}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl variant="standard" sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={formData.gender}
              onChange={handleGenderChange}
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="jobTitle">Job Title</InputLabel>
            <Input
              id="jobTitle"
              type={"text"}
              value={formData.job_title}
              onChange={jobTitleInputChange}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              autoComplete="new-password"
              // autoFocus = {false}
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={passwordInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>


          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="confirmPassword">
              Confirm Password
            </InputLabel>
            <Input
              autoComplete="new-password"
              // autoFocus = {false}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={passwordConfirmInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <input
                type="file"
                name="image"
                id=""
                accept="image/png, image/jpeg"
                onChange={onImageInputChange}
              />
            
        </div>
        <div className="submit-btn">
          <AppButton
            text="Save User"
            onBtnClick={submitForm}
            bgColor="bg-green"
          />
        </div>
      </Box>
    </div>
  );
};

export default AddUser;
