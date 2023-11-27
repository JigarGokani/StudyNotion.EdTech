import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        console.log("Requesting to update display picture...");
        console.log("Authorization Header:", `Bearer ${token}`);

  
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        );
  
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        );


  
        if (!response.data.success) {
          console.error("Update failed:", response.data.message);
          throw new Error(response.data.message);
        }
  
        console.log("Display Picture Updated Successfully");
        toast.success("Display Picture Updated Successfully");
        console.log("btao bhai response",response.data.data)
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
        toast.error("Could Not Update Display Picture");
      } finally {
        toast.dismiss(toastId);
      }
    };
  }
  

export function updateProfile(token, formData) {
    const {firstName,lastName,dateOfBirth,contactNumber,about,gender} = formData
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        

        toast.success("Profile Updated Successfully")
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("userbtao",user)
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.additionalDetails.dateOfBirth = dateOfBirth  || user.additionalDetails.dateOfBirth;
        user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
        user.additionalDetails.about = about || user.additionalDetails.about;
        user.additionalDetails.gender=gender
        
        console.log("firstname",user.firstName,user.lastName,user.additionalDetails.dateOfBirth,user.additionalDetails.contactNumber)

        localStorage.setItem("user",JSON.stringify(user));

      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }

  //updatePassword
export async function updatePassword(token,password){
    console.log(token,password)
    const { oldPassword, newPassword, confirmPassword:confirmNewPassword }=password;
    console.log("password",password);
    const toastId = toast.loading("Updating...");
    try {
     const response = await apiConnector("POST", CHANGE_PASSWORD_API,{oldPassword, newPassword, confirmNewPassword},{
        Authorization: `Bearer ${token}`,
      });
      console.log(token)
      console.log("UPDATE_PASSWORD_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Updated Successfully");
    }
    catch (error) {
      console.log("UPDATE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }

  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }