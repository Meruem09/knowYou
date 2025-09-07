import express from 'express';
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
    origin:`http://localhost:3000`,
    credentials:true
}))

import routesFetchProfile from './routes/fetchProfile.js'
app.use('/profile', routesFetchProfile);

app.get('/', (req,res)=> {
    res.json({message:"Server is running!"});
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
})