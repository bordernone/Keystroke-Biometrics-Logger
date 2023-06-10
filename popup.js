const copyBtn = document.getElementById("copy-btn");
const resetBtn = document.getElementById("reset-btn");
const saveBtn = document.getElementById("save-btn");
const codeInput = document.getElementById("code-input");

const fetchUUID = () => {
    return fetch("https://www.uuidtools.com/api/generate/v1").then(function (
        response
    ) {
        return response.json();
    });
};

resetBtn.addEventListener("click", () => {
    fetchUUID().then((uuid) => {
        chrome.storage.local.clear();
        chrome.storage.local.set({ sessionKey: uuid[0] }, function () {
            console.log("New session generated and saved.");
            codeInput.innerHTML = uuid[0];
        });
    });
});

copyBtn.addEventListener("click", () => {
    chrome.storage.local.get(["sessionKey"], function (result) {
        navigator.clipboard.writeText(result.sessionKey);
    });
});

saveBtn.addEventListener("click", async () => {
    let data = await chrome.storage.local.get(["keystrokeData"]);

    let dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data));
    let dlAnchorElem = document.getElementById("download-btn");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `keystroke-data-${Date.now()}.json`);
    dlAnchorElem.click();
});
