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

     const teacher = await User.findById(teacherId).select("-password -refreshToken");
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

export const getAllClassrooms = asyncHandler(async(req, res)=>{
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher"){
            throw new ApiError("You are not authorized to perform this action", 404);
        };

        const classrooms = await Classroom.find().populate({
            path: 'teacher',
            select: 'email role _id '
        }).populate({
            path: "students",
            select: " email role _id"
        });

        return res.status(200).json(
            new ApiResponse("Classrooms fetched successfully", {
                classrooms
            }, 200)
        );

    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    }
});

export const getClassroomById = asyncHandler(async(req, res)=>{
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher"){
            throw new ApiError("You are not authorized to perform this action", 404);
        };
    
        const { classroomId } = req.params;
        if (!classroomId) {
            throw new ApiError("classroomId is required", 400)
        };
        const classroom = await Classroom.findById(classroomId).populate({
            path: 'teacher',
            select: 'email role _id '
        }).populate({
            path: "students",
            select: " email role _id"
        });
    
        return res.status(200).json(
            new ApiResponse("Classroom fetched successfully", {
                classroom
            }, 200)
        );
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    }
})

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



export const updateClassroom = asyncHandler(async(req, res)=>{
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal"){
            throw new ApiError("You are not authorized to perform this action", 404);
        }; 
    
        const { classroomId } = req.body;
        if (!classroomId) {
            throw new ApiError("All fields are required", 400)
        };
    
        const classroom = await Classroom.findByIdAndUpdate(classroomId, { ...req.body }, { new: true });
        if (!classroom) {
            throw new ApiError("Classroom not found", 404);
        };
    
        return res.status(200).json(
            new ApiResponse("Classroom updated successfully", {
                _id: classroom._id,
                name: classroom.name,
                startTime: classroom.startTime,
                endTime: classroom.endTime,
                days: classroom.days,
                teacher: classroom.teacher,
                students: classroom.students
            }, 200));
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    }
});




export const deleteClassroom = asyncHandler(async(req, res)=>{
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal"){
            throw new ApiError("You are not authorized to perform this action", 404);
        }; 

        const { classroomId } = req.body;
        if (!classroomId) {
            throw new ApiError("All fields are required", 400)
        };

        const classroom = await Classroom.findByIdAndDelete(classroomId);
        if (!classroom) {
            throw new ApiError("Classroom not found", 404);
        };

        return res.status(200).json(
            new ApiResponse("Classroom deleted successfully", null , 200));
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    };
});
