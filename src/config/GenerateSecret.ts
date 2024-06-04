import { randomBytes } from "crypto";

const randomBytesBuffer = randomBytes(32);

const secret = randomBytesBuffer.toString("hex");

export default secret;