import {fork} from "child_process";
import * as os from "os";


export const getRandomNumbers = (req, res) => {
    const {iterations} = req.query || 100000000;

    const child = fork("./src/child.processes/generateRandomNumbers.child.js");

    child.on("message", (childMessage) => {
        if (childMessage === "ready") {
            child.send(`start,${iterations}`);
        } else {
            res.status(200).json(childMessage);
        }
    });
};

export const getSystemInfo = (req, res) => {
    res.status(200).json({
        "entry-arguments": process.argv,
        "OS": process.platform,
        "node-version": process.version,
        "memory-usage": process.memoryUsage(),
        "execution-path": process.execPath,
        "process-id": process.pid,
        "project-folder": process.cwd(),
        "os-subprocesses": os.cpus().length
    });
};