#!/usr/bin/env node

import {existsSync, promises as fs} from "fs"
import path from "path"

const ORIGINAL_FILE = ".env"
const EXAMPLE_FILE = ".env.example"

const main = async () => {
    if (!existsSync(ORIGINAL_FILE)) {
        console.error("Could not find .env in the current working directory!")
        return
    }

    const env = (await fs.readFile(ORIGINAL_FILE))
        .toString()
        .split("\n")
        .map(line => {
            const index = line.indexOf("=")
            if (index === -1) {
                return line
            }
            return line.substr(0, index + 1)
        })
        .join("\n")

    await fs.writeFile(
        path.join(path.dirname(ORIGINAL_FILE), EXAMPLE_FILE),
        env,
    )

    console.debug("Successfully wrote .env.example")
}

main().catch(console.error)
