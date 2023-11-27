import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { updatePassword } from '../../../../services/operations/SettingsAPI';

const UpdatePassword = () => {
    const { token } = useSelector((state) => state.auth)
    

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePassword = (e) => {
    e.preventDefault()
    const {newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword) {
      updatePassword(token,password);
    } else {
      alert("Password does not match")
    }
  }

  return (
    <div>
        <form onSubmit={handlePassword}>
          <div className=' bg-richblack-800 max-w-[75%] mx-auto rounded-md border-[1px] border-richblack-700 mt-5 mb-5' >
                                <div className=' relative mt-4 max-w-[75%] mx-auto'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Old Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showPassword ? "text" : "password"}
                                       name="oldPassword"
                                       value={password.oldPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="form-style w-full"
                                     /></label>
                                     <span
                                       onClick={() => setShowPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                   <div className=' relative mt-4 max-w-[75%] mx-auto'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="newPassword"
                                       value={ password.newPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="form-style w-full"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                <div className=' relative mt-4 max-w-[75%] mx-auto mb-7'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="confirmPassword"
                                       value={password.confirmPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="form-style w-full"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-10 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                </div >
                                <div className="flex justify-end gap-2 mt-8"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined max-w-[75%] mx-40" type="submit">Save</button></div>
                                </form>
    </div>
  )
}

export default UpdatePassword