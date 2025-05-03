import express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl.js";


const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

mongoose
    .connect("mongodb://localhost/urlShortener",)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err);
        process.exit(1);
    });

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls: shortUrls });
});



app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect("/");
});

app.listen(process.env.PORT || 5000);