import Trip from "../model/trip.js";

export const createTrip = async(req,res)=>{
    try{
        const { title,destination,description,startDate,endDate,pricePerPerson,availableSeats,imageUrl}=req.body;
        const newTrip = new Trip({title,destination,description,startDate,endDate,pricePerPerson,availableSeats,imageUrl});
        await newTrip.save();
        res.status(201).json({message:"Trip created successfully",data:newTrip});
    }
    catch(err){
        res.status(500).json({message:"Error creating trip",error:err});
    }
};

