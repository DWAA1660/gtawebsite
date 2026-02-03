#! /usr/bin/perl

## This is a test script used to help verify and troubleshoot CGI script problems.
## If the .cgi extension is working properly, this script will display an HTML page that says Hello World.
## Sometime /usr/local/bin/perl is used instead of /usr/bin/perl

print<<TOEND;
Content-Type: text/html

<html>
<head>
<title>Hello World Test</title>
</head>
<body bgcolor="#000000" text="#CCCCCC" link="#AAEEEE" vlink="#AAEEEE">
<h1>Hello World</h1>
</body>
</html>
TOEND

exit;