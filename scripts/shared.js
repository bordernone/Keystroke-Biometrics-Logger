const fetchUUID = () => {
    return fetch("https://www.uuidtools.com/api/generate/v1").then(function (
        response
    ) {
        return response.json();
    });
};

const createNewSession = async () => {
    let uuid = (await fetchUUID())[0];
    await chrome.storage.local.clear();
    await chrome.storage.local.set({ sessionKey: uuid });
    console.log("New Session Created");
    return uuid;
};