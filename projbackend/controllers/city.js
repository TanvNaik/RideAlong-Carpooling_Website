const City = require("../models/city")

exports.getCityById = (req,res,next,id) => {
    City.findById(id).exec((err, city)=>{
        if(err || !city){
            return res.status(400).json({
                error: "City dosen't exist in database"
            })
        }
        req.city = city;
        next();
    })

}

exports.addcity = (req,res) =>{
    const city = new City({
        name: req.body.cityName,
        latitude: req.body.cityLatitude,
        longitude: req.body.cityLongitude
    })

    city.save((err,city)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to add city"
            })
        }
        return res.json(city)
    })
}

exports.deleteCity = (req,res)=>{
    let city = req.city;
    city.remove((err,deletedCity)=>{
        if(err){
            return res.json(400).json({
                error: "Unable to delete the city"
            })
        }
        return res.json({
            message: `Succesfully deleted the City ${deletedCity.name} from the DB`
        })
    })
}