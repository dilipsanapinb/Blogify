
const errorHandler = (err,req,res,next) => {
    console.error(err);
    res.status(500).json({ message: "Something went wrong on server", error: err.message });
}

module.exports = errorHandler;