function submitSurvey() {
    const form = document.getElementById('surveyForm');
    
    // Create an object to store the survey answers
    const surveyData = {
        html_clarity: null,
        html_feedback: null,
        css_confidence: null,
        css_feedback: null,
        js_pacing: null,
        js_feedback: null
    };

    // Get the selected values for each question
    const htmlClarity = form.querySelector('input[name="html_clarity"]:checked');
    const htmlFeedback = form.querySelector('textarea[name="html_feedback"]').value;
    const cssConfidence = form.querySelector('input[name="css_confidence"]:checked');
    const cssFeedback = form.querySelector('textarea[name="css_feedback"]').value;
    const jsPacing = form.querySelector('input[name="js_pacing"]:checked');
    const jsFeedback = form.querySelector('textarea[name="js_feedback"]').value;

    // Store the answers in the surveyData object
    if (htmlClarity) surveyData.html_clarity = htmlClarity.value;
    surveyData.html_feedback = htmlFeedback;
    
    if (cssConfidence) surveyData.css_confidence = cssConfidence.value;
    surveyData.css_feedback = cssFeedback;
    
    if (jsPacing) surveyData.js_pacing = jsPacing.value;
    surveyData.js_feedback = jsFeedback;

    // Display the results in the "results" div
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h4>Your Feedback-</h4>
        <p><strong>HTML Clarity Rating:</strong> ${surveyData.html_clarity}</p>
        <p><strong>HTML Feedback:</strong> ${surveyData.html_feedback}</p>
        
        <p><strong>CSS Confidence Rating:</strong> ${surveyData.css_confidence}</p>
        <p><strong>CSS Feedback:</strong> ${surveyData.css_feedback}</p>
        
        <p><strong>JavaScript Pacing Rating:</strong> ${surveyData.js_pacing}</p>
        <p><strong>JavaScript Feedback:</strong> ${surveyData.js_feedback}</p>
    `;
}
