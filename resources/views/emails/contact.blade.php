<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: #4CAF50;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            padding: 20px;
            color: #333;
        }
        .email-body h2 {
            margin-top: 0;
        }
        .email-footer {
            background: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .email-footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            {!! $header !!}
        </div>
        <div class="email-body">
            <h2>Hello {{ $name }},</h2>
            <p>{!! $body !!}</p>
        </div>
        <div class="email-footer">
            <p>Thank you for contacting us!</p>
            <p>&copy; {{ date('Y') }} PT.Maung Perkasa Abadi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>