<?php
session_start();

// Assuming you have a database connection
// Replace these variables with your actual database credentials
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user input from the form
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare a SQL statement to retrieve the user with the provided email
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    // User found, verify password
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Password is correct, create session and redirect to home page
        $_SESSION['user_id'] = $user['id'];
        header("Location: index.php"); // Redirect to home page after successful login
        exit();
    } else {
        // Password is incorrect, redirect back to login page with error message
        header("Location: signIn.php?error=invalidcredentials");
        exit();
    }
} else {
    // User not found, redirect back to login page with error message
    header("Location: signIn.php?error=invalidcredentials");
    exit();
}

// Close database connection
$stmt->close();
$conn->close();
?>
