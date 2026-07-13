import app from "./app"
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})
