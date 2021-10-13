const express= require("express")
const app = express()
const dotenv= require("dotenv")
const mongoose= require("mongoose")
const multer=require("multer")


const authRoute= require("./routes/auth")
const userRoute= require("./routes/users")
const postRoute= require("./routes/posts")
const catRoute= require("./routes/categories")


dotenv.config()
app.use(express.json())

mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(console.log("Connecteds to mngo")).catch((err)=>console.log(err))

const storage= multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null,"images")
    }, filename:(req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", catRoute)

app.listen("5000", ()=>{
    console.log("Running on port")
})