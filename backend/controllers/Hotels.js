const Hotel = require("../models/Hotel");
const { validationResult } = require("express-validator")
const fs = require('fs')
const Books = require('../models/Books');

exports.createHotel = async (req, res, next) => {
  const { name, location, map, description } = req.body;

  try {  
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      req.files.forEach(file=>{
        fs.unlinkSync(file.path);
      })
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }

    if(!req.files || !Array.isArray(req.files))
    {
      return next({
        status: 400,
        message: "images field are required and should be valid array",
        errors: errors.array().map(error=>error.msg)
      })
    }
    var paths = req.files.map(file=>file.path)



    const newHotel = new Hotel({
      name,
      ownerId: req.user._id,
      images: paths,
      description,
      map,
      location,
    });

    const savedHotel = await newHotel.save();

    return res.status(201).json({
        message: "Hotel created successfully",
        hotel: savedHotel,
    });
  
  } catch (error) {
      next(error)
  }
};


exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    return res.status(200).json(hotels);
  } catch (error) {
    return next(error)
  }
};

exports.suggestionHotels = async(req, res, next)=>{
    try{
      const hotels = await Hotel.find().sort({ 'averageRating': -1 }).limit(6)
      return res.status(200).json(hotels)
  
    }catch(error)
    {
      return next(error)
    }
}

exports.getHotelsByOwner = async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.user._id });

    if (!hotels || hotels.length === 0) {
      return res
        .status(404)
        .json({ message: "No hotels found for this owner" });
    }

    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.updateHotel = async (req, res, next) => {
  const { name, description, indexs } = req.body;

  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next({
        status: 404,
        message: "Hotel not found"
      })
    }
    if(!hotel.ownerId.equals(req.user._id))
    {
      return next({
        status: 401,
        message: "you are not the owner of this hotel"
      })
    }

    if (name) hotel.name = name;
    if(description) hotel.description = description;
    if(typeof indexs === "string")
    {
      try{
        indexs = JSON.parse(indexs);
      }catch(error)
      {
        return next({
          status: 400,
          message: "Invalid indexs format",
          errors: error
        })
      }
    }
    var paths = []
    if(req.files && req.files.length > 0)
    {
      paths = req.files.map(file=>file.path)
      console.log(paths)
    }
    if(indexs)
    {
      console.log("Hello from indexs")
      indexs.forEach((item, index) => {
        if (hotel.images[item]) {
          if (paths[index]) {
            console.log(`Replacing image at index ${item} with ${paths[index]}`);
            fs.unlinkSync(hotel.images[item])
            hotel.images[item] = paths[index];
          } else {
            console.log(`Removing image at index ${item}`);
            fs.unlinkSync(hotel.images[item])
            hotel.images.splice(item, 1);
          }
        }
      });
      
    }
    if(paths.length > 0)
    {
      const leftoverPath = paths.slice(indexs ? indexs.length : 0);
      hotel.images.push(...leftoverPath)
    }
    await hotel.save();

    return res.status(200).json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    return next(error)
  }
};


exports.deleteHotel = async (req, res,next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return next({
        status: 404,
        message: "Hotel Not Found"
      })
    }

    await Books.deleteMany({ hotel: hotel._id })

    hotel.rooms.forEach(room=>{
      fs.unlinkSync(room.images[0])
    })

    

    hotel.images.forEach(image=>{
      fs.unlinkSync(image)
    })
    return res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    return next(error)
  }
};


exports.addComment = async (req, res) => {
  try {
    const newComment = {}
    const { comment, rating } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if(req.user) newComment.customer = req.user._id
    if(comment) newComment.comment = comment
    if(rating) newComment.rating = rating
    hotel.comments.push(newComment);

    await hotel.save();
    return res.status(200).json({ message: "Comment added successfully", hotel });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json(hotel.comments);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.addRoom = async (req, res, next) => {
  const { roomType, price, advantages, availability } = req.body;
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      req.files.forEach(file=>{
        fs.unlinkSync(file.path);
      })
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      req.files.forEach(file=>{
        fs.unlinkSync(file.path);
      })
      return next({
        status: 404,
        message: "hotel not found"
      })
    }
    if(!req.files || !Array.isArray(req.files))
      {
        return next({
          status: 400,
          message: "images field are required and should be valid array",
          errors: errors.array().map(error=>error.msg)
        })
      }
    var paths = req.files.map(file=>file.path)
    const newRoom = { roomType, price, advantages, availability, images: paths };
    hotel.rooms.push(newRoom);

    await hotel.save();
    return res.status(200).json({ message: "Room added successfully", hotel });
  } catch (error) {
    return next(error)
  }
};



exports.updateRoom = async (req, res) => {
  try {
    const { roomType, price } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const roomIndex = hotel.rooms.findIndex((room) => room._id.toString() === req.params.roomId);
    if (roomIndex === -1) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!roomType && !price && (!req.files || !Array.isArray(req.files))) {
      return res.status(400).json({
        message: "At least one of roomType, price, or images must be provided for update",
      });
    }

    // Update room fields if provided
    if (roomType) {
      hotel.rooms[roomIndex].roomType = roomType;
    }
    if (price) {
      hotel.rooms[roomIndex].price = price;
    }
    if (req.files.length > 0 && Array.isArray(req.files)) {

      hotel.rooms[roomIndex].images = req.files.map((file) => file.path);
    }

    await hotel.save();
    return res.status(200).json({ message: "Room updated successfully", hotel });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.deleteRoom = async (req, res, next) => {
  const { id, roomId } = req.params;

  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return next({
        status: 404,
        message: "Hotel Not Found"
      })
    }

    const roomIndex = hotel.rooms.findIndex(
      (room) => room._id.toString() === roomId
    );
    if (roomIndex === -1) {
      return next({
        status: 404,
        message: "Room Not Found"
      })
    }
    hotel.rooms[roomIndex].images.forEach(image=>{
      fs.unlinkSync(image)
    })
    hotel.rooms.splice(roomIndex, 1);

    await hotel.save();
    return res.status(200).json({ message: "Room deleted successfully", hotel });
  } catch (error) {
    return next(error)
  }
};



exports.searchHotels = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, roomType, location, hotelRating  } = req.query;

    // Build search filters dynamically based on the query parameters
      const filters = {};
      if (name) {
          filters.name = { $regex: name, $options: "i" };
        }
  
      // Search by location
      if (location) {
        filters.location = { $regex: location, $options: "i" };
      }
  
      // Search by price range
      if (minPrice || maxPrice) {
        filters["rooms.price"] = {};
        if (minPrice) {
          filters["rooms.price"].$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
          filters["rooms.price"].$lte = parseFloat(maxPrice);
        }
      }
  
      // Search by room type
      if (roomType) {
        filters["rooms.roomType"] = { $regex: roomType, $options: "i" };
      }

      if (hotelRating) {
        filters.rating = { $gte: parseFloat(hotelRating) };
      }

    // Execute the query
    const hotels = await Hotel.find(filters);

    // if (!hotels || hotels.length === 0) {
    //   return res
    //     .status(200)
    //     .json({ hotels});
    // }

    return res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server hi error", error: error.message });
  }
};
