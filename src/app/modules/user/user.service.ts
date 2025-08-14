// // import { Payable } from "../payable/payable.model";
// import { generateToken } from "../../utils/jwt";
// import { IUser } from "./user.interface"
// import { User } from "./user.model";

// const createUserService = async(payload: Partial<IUser>)=>{
//     if(!payload.name){
//         throw new Error("can not register user without name");
//     }
//     if(!payload.phoneNumber){
//         throw new Error("can not register user without phone number");
//     }
//     const isPhoneNumberAlreadyExist = await User.findOne({phoneNumber: payload.phoneNumber})

//     // const token = generateToken(payload)

//     if(!isPhoneNumberAlreadyExist){
//         const person = await User.create(payload)
//         return {person, token}
//     }

//     const userName = await User.findOne({phoneNumber: payload.phoneNumber})

//     const person = {
//         name: userName?.name,
//         phoneNumber: userName?.phoneNumber
//     }

//     if(userName?.name !== payload.name){
//         await User.findOneAndUpdate({phoneNumber: payload.phoneNumber}, {name: payload.name})
//         await Payable.updateMany({"loanGiver_Info.phoneNumber": payload.phoneNumber}, {$set: {"loanGiver_Info.name": payload.name}}, {new: true})
//     }
//     console.log({person, token})
//     return {person, token}
// }

// export const userServices = {
//     createUserService,
// }