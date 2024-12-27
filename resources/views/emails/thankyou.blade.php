<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #28a745;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h2 {
            color: #28a745;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>Thank You for Subscribing!</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <h2>Hello, {{ $name }} ({{ $email }})</h2>
            <p>
                Thank you for subscribing to our website! We're excited to have you on board. 
                Stay tuned for the latest updates, news, and special offers.
            </p>
            <p>
                If you have any questions, feel free to contact us anytime.
            </p>
            <p>Best regards,<br>Website Team</p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>You are receiving this email because you subscribed to our newsletter.</p>
        </div>
    </div>
</body>
</html>