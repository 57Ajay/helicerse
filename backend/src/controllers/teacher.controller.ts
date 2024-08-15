import Timetable from "../models/timetable.model";
import Classroom from "../models/classroom.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

export const createTimetable = asyncHandler(async(req, res)=>{
   try {
     const loggedInUser = req.user;
     if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
         throw new ApiError("You are not authorized to perform this action", 404);
     };
 
     const { classroomId, subject, startTime, endTime, day } = req.body;
     if (!classroomId || !subject || !startTime || !endTime || !day) {
         throw new ApiError("All fields are required", 400)
     };
 
     const classroom = await Classroom.findById(classroomId);
     if (!classroom) {
         throw new ApiError("Classroom not found", 404);
     };
 
     const timetable = await Timetable.create({
         classroom: classroomId,
         subject,
         startTime,
         endTime,
         day
     }); 
 
     return res.status(201).json(
         new ApiResponse("Timetable created successfully", {
             _id: timetable._id,
             classroom: timetable.classroom,
             subject: timetable.subject,
             startTime: timetable.startTime,
             endTime: timetable.endTime,
             day: timetable.day
         }, 201)
     )
   } catch (error) {
    console.log(error.message);
    throw new ApiError("Something went wrong", 500)
   }
});


export const updateTimetable = asyncHandler(async (req, res) => {
    const loggedInUser = req.user;
    if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
        throw new ApiError("You are not authorized to perform this action", 404);
    };

    const { timetableId, classroomId, subject, startTime, endTime, day } = req.body;
    if (!timetableId) {
        throw new ApiError("timetableId is required", 400);
    }
    if (!classroomId || !subject || !startTime || !endTime || !day) {
        throw new ApiError("All fields are required", 400);
    };

    const timetable = await Timetable.findById(timetableId);
    if (!timetable) {
        throw new ApiError("Timetable not found", 404);
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
        throw new ApiError("Classroom not found", 404);
    };

    timetable.classroom = classroomId;
    timetable.subject = subject;
    timetable.startTime = startTime;
    timetable.endTime = endTime;
    timetable.day = day;

    await timetable.save();

    return res.status(200).json(
        new ApiResponse("Timetable updated successfully", {
            _id: timetable._id,
            classroom: timetable.classroom,
            subject: timetable.subject,
            startTime: timetable.startTime,
            endTime: timetable.endTime,
            day: timetable.day
        }, 200)
    );
});


