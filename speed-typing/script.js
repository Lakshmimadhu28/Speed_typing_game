let startTime;
let timerInterval;

document.getElementById('startButton').addEventListener('click', function() {
    // Get all the paragraphs from the hidden section
    const paragraphElements = document.querySelectorAll('#paragraphs p');
    const paragraphs = Array.from(paragraphElements).map(p => p.getAttribute('data-paragraph'));

    // Select a random paragraph
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const selectedParagraph = paragraphs[randomIndex];
    
    // Set the paragraph text
    document.getElementById('paragraph').textContent = selectedParagraph;
    document.getElementById('userInput').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('doneButton').style.display = 'block';
    document.getElementById('paragraphSection').style.display = 'block';
    
    // Focus on the textarea and start the timer
    document.getElementById('userInput').focus();
    startTime = new Date().getTime();
    
    // Clear any previous timer intervals
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Function to update the timer
    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000; // Time in seconds
        document.getElementById('result').textContent = `Time elapsed: ${elapsedTime.toFixed(2)} seconds.`;
    }
    
    // Start a timer that updates every second
    timerInterval = setInterval(updateTimer, 1000);
    
    // Event listener for user input
    document.getElementById('userInput').addEventListener('input', function() {
        const inputText = this.value;
        if (inputText === selectedParagraph) {
            clearInterval(timerInterval); // Stop the timer
            document.getElementById('result').textContent = `Well done! Time taken: ${((new Date().getTime() - startTime) / 1000).toFixed(2)} seconds.`;
        }
    });
});

document.getElementById('doneButton').addEventListener('click', function() {
    if (startTime) {
        clearInterval(timerInterval); // Stop the timer
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000; // Time in seconds
        document.getElementById('result').textContent = `Time taken: ${timeTaken.toFixed(2)} seconds.`;
    }
});
