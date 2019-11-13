function rejectWithMessage(error) {
    return Promise.reject(error.message);
}
const fs = require("fs");

export default (key, replacer, reviver) => ({
    load() {
        return new Promise(resolve => {
            var jsonState = fs.readFileSync("storage");
            resolve(JSON.parse(jsonState, reviver) || {});
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
