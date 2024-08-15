import Classroom from "../models/classroom.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import User from "../models/user.model";

export const createClassroom = asyncHandler(async(req, res)=>{
   try {
     const loggedInUser = req.user;
 
     const { name, startTime, endTime, days, teacherId } = req.body;
     if (!name || !startTime || !endTime || !days || !teacherId) {
         throw new ApiError("All fields are required", 400)
     };
 
     if (loggedInUser.role !== "Principal"){
         throw new ApiError("You are not authorized to perform this action", 404);
     };
 
     const teacher = await User.findById(teacherId);
     if (!teacher || teacher.role !== "Teacher") {
         throw new ApiError("Teacher not found", 404);
     };
 
     const classroom = await Classroom.create({
         name,
         startTime,
         endTime,
         days,
         teacher: teacherId,
       });
 
     return res.status(201).json(
         new ApiResponse("Classroom created successfully", {
             classroom
         }, 201)
     );
   } catch (error) {
    console.log(error.message);
    throw new ApiError("Something went wrong", 500)
   };
});

export const assignStudentToClassroom = asyncHandler(async(req, res)=>{
   try {
     const loggedInUser = req.user;
     if (loggedInUser.role !== "Principal"){
         throw new ApiError("You are not authorized to perform this action", 404);
     }; 
 
     const { classroomId, studentId} = req.body;
     if (!classroomId || !studentId){
         throw new ApiError("classId and studentId is required", 404)
     };
 
     const classRoom = await Classroom.findById(classroomId);
     if (!classRoom) {
         throw new ApiError("Classroom not found", 404);
     };
 
     const student = await User.findById(studentId);
     if (!student || student.role !== "Student") {
         throw new ApiError("Student not found", 404);
     };
     const duplicateStudent = classRoom.students.find((student) => student.toString() === studentId);
     if (duplicateStudent) {
         throw new ApiError("Student already assigned to classroom", 400);
     };
 
     classRoom.students.push(studentId);
     await classRoom.save();
 
     return res.status(201).json(
         new ApiResponse("Student assigned to classroom successfully", {
             classRoom
         }, 201)
     );
   } catch (error) {
       console.log(error.message);
       throw new ApiError("Something went wrong", 500)
   }
});

export const updateUser = asyncHandler(async(req, res)=>{
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal"){
            throw new ApiError("You are not authorized to perform this action", 404);
        }; 
    
        const { userId, email, password } = req.body;
        if (!email || !password) {
            throw new ApiError("All fields are required", 400)
        };
    
        const user = await User.findByIdAndUpdate(userId, { email, password }, { new: true });
        if (!user) {
            throw new ApiError("User not found", 404);
        };
    
        return res.status(200).json(
            new ApiResponse("User updated successfully", {
                user
            }, 200));
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    }
});

export const updateClassroom = asyncHandler(req)

export const deleteUser = asyncHandler(async(req, res)=>{
    
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal"){
            throw new ApiError("You are not authorized to perform this action", 404);
        }; 
    
        const { userId } = req.body;
        if (!userId) {
            throw new ApiError("All fields are required", 400)
        };
    
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        
        return res.status(200).json(
            new ApiResponse("User deleted successfully", {
                user,
            }, 200));
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    };
});
