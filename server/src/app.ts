import path from "path";
import dotenv from "dotenv";
import createNewServer from "./server";

void async function() {
    const result = dotenv.config({
        path: path.join(__dirname, "../env/local.config.env"),
    });

    if (result.error) {
        console.error(result.error);
        return;
    }

    const port = process.env.PORT || 3000;
    const server = createNewServer();

    server.listen(port, (error) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(`Server start on port: ${port}`);
    });
}();