
document.getElementById("helpForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        displayMessage("danger", "Please fill out all fields.");
        return;
    }

    // Assuming you have a backend endpoint to handle form submission
    // You can use fetch or any other method to send data to the server
    // Example:

    fetch("/submit", {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, message: message }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayMessage("success", "Message sent successfully.");
                document.getElementById("helpForm").reset();
            } else {
                displayMessage("danger", "Failed to send message. Please try again later.");
            }
        })
        .catch(error => {
            displayMessage("danger", "An error occurred. Please try again later.");
        });


    // Simulate response for demonstration purposes
    displayMessage("success", "Message sent successfully.");
    document.getElementById("helpForm").reset();
});

function displayMessage(type, message) {
    var responseDiv = document.getElementById("response");
    responseDiv.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

















