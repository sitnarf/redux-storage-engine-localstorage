function rejectWithMessage(error) {
    return Promise.reject(error.message);
}
const fs = require("fs");

export default (key, replacer, reviver) => ({
    load() {
        return new Promise(resolve => {
            try {
                var jsonState = fs.readFileSync("storage");
                resolve(JSON.parse(jsonState, reviver) || {});
            } catch {
                resolve(null);
            }
        }).catch(rejectWithMessage);
    },

    save(state) {
        return new Promise(resolve => {
            const jsonState = JSON.stringify(state, replacer);
            fs.writeFileSync("storage", jsonState);
            resolve();
        }).catch(rejectWithMessage);
    }
});
