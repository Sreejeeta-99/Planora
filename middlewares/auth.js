import jwt from "jsonwebtoken";
export const authenticate_token = async(req,res,next) =>{
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header: ", authHeader);
    //authHeader= Bearer ejfhvsofihvfnvjknijio(token)
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token extracted: ", token); 
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    //decode
    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET); //payload
        req.userId = decoded.userId;
        req.userRole= decoded.userRole;
        next(); //the request is sent to next layer
    }
    catch(error){
        return res.status(401).json({ message: "Invalid token" });
        console.error(error);
    }
}