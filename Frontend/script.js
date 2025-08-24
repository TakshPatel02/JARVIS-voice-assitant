let recognition;
let isListening = false;
let transcript = "";

const stopBtn = document.getElementById('stopBtn');
const startBtn = document.getElementById('startBtn');
const answerText = document.getElementById('answerText');
const questionText = document.getElementById('questionText')
const clearBtn = document.getElementById('clearBtn');

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    alert("Your browser doesn't support speech recognition.")
}

if (recognition) {
    recognition.continuous = true; // keep listening until stopped
    recognition.interimResults = false; // only final results
    recognition.lang = "en-US";

    // Capture result
    recognition.onresult = function (event) {
        transcript = event.results[event.results.length - 1][0].transcript;
        console.log("Heard:", transcript);
    };

    recognition.onerror = function (event) {
        console.error("Error:", event.error);
    };
}

async function sendPostRequest(data) {
    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input: data.message })
        });
        const result = await response.json();
        console.log("Response from Gemini:", result.message);

        // Display the result in the answer section

        const pre = document.createElement("pre");
        pre.textContent = result.message;
        answerText.innerHTML = "";
        answerText.appendChild(pre);


    } catch (error) {
        console.error("Error:", error);
    }
}

function sendQuestion(data) {
    const pre1 = document.createElement("pre");
    pre1.textContent = data.message;
    questionText.innerHTML = "";
    questionText.appendChild(pre1)
}

startBtn.addEventListener('click', () => {
    if (!isListening && recognition) {
        recognition.start();
        isListening = true;
        console.log("Listening...");
        stopBtn.disabled = false; // Enable stop button
        startBtn.disabled = true; // Disable start button while listening
        document.getElementById('status').textContent = "Listening...";
        document.getElementById('status').className = "status listening";
    }
});

stopBtn.addEventListener('click', () => {
    if (isListening && recognition) {
        recognition.stop();
        isListening = false;
        console.log("Stopped listening");
        stopBtn.disabled = true; // Disable stop button
        startBtn.disabled = false; // Enable start button again
        document.getElementById('status').textContent = "Processing...";
        document.getElementById('status').className = "status processing";

        if (transcript.trim() !== "") {
            sendPostRequest({ message: transcript });
            sendQuestion({ message: transcript })
            transcript = ""; // Clear transcript after sending
        }
    }
})

clearBtn.addEventListener('click', async () => {
    questionText.innerHTML = "No question asked yet...";
    answerText.innerHTML = "Waiting for your question...";
    document.getElementById('status').textContent = "Ready to Listen"
    await fetch("/clear", { method: "POST" }); // Clear backend history
})
