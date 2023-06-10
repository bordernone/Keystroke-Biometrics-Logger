let lastKeyDown = {};

document.addEventListener("keydown", function (event) {
    let timestamp = new Date().getTime();
    let inputElement = document.activeElement;
    if (inputElement && inputElement.tagName.toLowerCase() === "textarea") {
        let key = event.key;

        // Check for key repeat
        if (lastKeyDown[key] && timestamp - lastKeyDown[key] < 1000) {
            return;
        }

        lastKeyDown[key] = timestamp;

        let data = {
            type: "keydown",
            key: key,
            timestamp: timestamp,
            inputId: inputElement.id,
            inputName: inputElement.name,
        };

        // Send message to background.js
        chrome.runtime.sendMessage({
            from: "content",
            subject: "record_event",
            data: data,
        });
    }
});

document.addEventListener("keyup", function (event) {
    let timestamp = new Date().getTime();

    let inputElement = document.activeElement;
    if (inputElement && inputElement.tagName.toLowerCase() === "textarea") {
        let key = event.key;

        lastKeyDown[key] = null;

        let data = {
            type: "keyup",
            key: key,
            timestamp: timestamp,
            inputId: inputElement.id,
            inputName: inputElement.name,
        };

        // Send message to background.js
        chrome.runtime.sendMessage({
            from: "content",
            subject: "record_event",
            data: data,
        });
    }
});
