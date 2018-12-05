import { Format } from "convict";
import net from "net";

const mongodbPrefix = "mongodb://";

const format: Format = {
    name: "mongoUrl",
    validate: function (value) {
        if (typeof value !== "string") {
            throw new TypeError("Value must be a string");
        }

        if (value.startsWith(mongodbPrefix)) {
            value = value.substr(mongodbPrefix.length);
        }

        let addr, port;
        if (value.includes(":")) {
            [addr, port] = value.split(":", 2);
        } else {
            addr = value;
        }

        if (net.isIP(addr) === 0) {
            throw new TypeError(`Value '${value}' is not a valid mongodb url`);
        }
    },
    coerce: function (value: string) {
        if (!value.startsWith(mongodbPrefix)) {
            return mongodbPrefix + value;
        }

        return value;
    }
};

export default format;
