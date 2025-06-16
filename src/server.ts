import app from "./app";
import config from "./utils/config/config";

app.listen(config.common.port, ()=>{
    console.log(`Server running on port ${config.common.port}`)
})