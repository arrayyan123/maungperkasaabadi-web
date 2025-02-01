<!DOCTYPE html>
<html>
<head>
    <style>
        /* Inline CSS for better email rendering */
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
            background-color: #007BFF;
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
            color: #007BFF;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .email-body img {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
        .email-footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>{{ $title }}</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <h2>Hi, {{ $email }}</h2>

            <!-- Display image if available -->
            @if (!empty($image))
                <img src="{{ $image }}" alt="Newsletter Image" style="max-width: 100%; height: auto;">
            @else
                <p>No image available.</p> <!-- Tambahkan ini untuk menghindari undefined -->
            @endif

            <!-- Email content -->
            <p>{!! $body !!}</p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>You are receiving this email because you subscribed to our newsletter.</p>
            <p>
                <a href="{{ url('/') }}">Visit our website</a> |
                <a href="{{ url('/unsubscribe?email=' . urlencode($email)) }}">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>