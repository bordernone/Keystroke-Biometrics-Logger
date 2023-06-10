// Listen for messages from the content script
let keystrokes = [];
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if (msg.from === "content" && msg.subject === "record_event") {
        handleRecordEvent(msg);
    }
});

const handleRecordEvent = (msg) => {
    chrome.storage.local.get(["keystrokeData"], async function (result) {
        let keystrokeData = result.keystrokeData ?? {
            data: [],
        };
        keystrokeData.data.push(msg.data);
        chrome.storage.local.set({ keystrokeData: keystrokeData }, function () {
            console.log("Keystroke data updated.");
        });
    });
};
