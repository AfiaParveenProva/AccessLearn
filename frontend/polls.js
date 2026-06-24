const pollResults = {
    Math: 0,
    Science: 0,
    History: 0
};

function submitPoll() {
    const form = document.getElementById('pollForm');
    
    // Creates an object to store the poll answers
    const pollData = {
        language: null,
        project: null,
        feature: null
    };
    
    // Gets the selected values for each question
    const language = form.querySelector('input[name="language"]:checked');
    const project = form.querySelector('input[name="project"]:checked');
    const feature = form.querySelector('input[name="feature"]:checked');
    
    // If a value is selected, store it in the pollData object
    if (language) pollData.language = language.value;
    if (project) pollData.project = project.value;
    if (feature) pollData.feature = feature.value;
    
    // Shows the results in the "results" div
    const resultsDiv = document.getElementById('results');
    if (pollData.language && pollData.project && pollData.feature) {
        resultsDiv.innerHTML = `
            <h4>Your Preferences-</h4>
            <p><strong>Favorite Programming Language:</strong> ${pollData.language}</p>
            <p><strong>Preferred Project Type:</strong> ${pollData.project}</p>
            <p><strong>Desired Feature:</strong> ${pollData.feature}</p>
        `;
    } else {
        resultsDiv.innerHTML = '<p>Please answer all questions before submitting.</p>';
    }
}


function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = Object.entries(pollResults)
        .map(([subject, votes]) => `${subject}: ${votes} votes`)
        .join('<br>');
}
