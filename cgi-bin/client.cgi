#! /usr/local/bin/perl
$name =  "client v 1.1 (28 Feb 04)" ;
## Called by index page via home.js verify function to process client login request.
## Arguments passed are username (GTU) & password (GTP)
## Program use spinner.txt file.
  open(theLog, ">>client/log.txt") ;
  print(theLog "$name\n");
  close (theLog) ;

$| = 1;     ### Flush the buffer after every print.

### Debug script (yes, NO) -- Always 'NO'
$test = "NO";

### Where to send error e-mails
$to = "dave\@wildandfreed.com";

### Where to send the clients
$next = "client/client.htm";

### Evalutate Input
if ($test eq "yes") {
  %input = ('GTU', "rullman01", 'GTP', "at6",);
  print("$name\n");
}else{
  if ($ENV{'REQUEST_METHOD'} eq "GET") {
    print("Location: index.html\n\n");
    exit;
  }elsif ($ENV{'REQUEST_METHOD'} eq "POST") {
    for ($i = 0; $i < $ENV{'CONTENT_LENGTH'}; $i++) {
      $in .= getc;
    }
  }elsif ($ENV{'REQUEST_METHOD'} eq "HEAD") {
    print("Location: ../images/logo.gif\n\n");
    exit;
  }else{  
    $errorReason = "Evaluate Input: Could not interpret a Request Method of $ENV{'REQUEST_METHOD'}." ;
    &PageError;
  }

  @list = split/&/, $in ;
  $numPairs = @list ;
  for ($i = 0; $i < $numPairs; $i++) {
    ($first, $value) = split/=/, $list[$i] ;
    $key = uc($first);
    $value =~ s/\+/ /g ;
    $value =~ s/%(..)/pack("c", hex($1))/ge ;
    $input{$key} = $value ;
  }
}

### Verify Password
$matchFlag = 0;
$spinnerF = 'client/spinner.txt';
if(-e $spinnerF) {
  open(datFile, "<$spinnerF");
  while($line = <datFile>) {
   chomp($line);
   ($customer, $user, $pass) = split/, /, $line, 3;
   if ($input{'GTU'} eq $user) {
     if ($input{'GTP'} eq $pass) {
       $matchFlag = 1;
     }
     last;
   }
  }
  close(datFile);
}else{
  $errorReason = "Could not find the password file: $spinnerF" ;
  &PageError;
}

if (!$matchFlag) {
  ## Username not found and/or password did not match.
  print("Location: index.html\n\n");
  exit;
}

### Logging script calls to troubleshoot.
$log = "no" ;
if ($log eq "yes") {
  ($seconds, $minutes, $hour, $monthDate, $month, $year) = localtime($^T) ;
  $theTime = "$year:$month:$monthDate $hour:$minutes:$seconds" ;
  open(theLog, ">>client/log.txt") ;
  print theLog "$theTime,$customer,$next\n" ;
  close (theLog) ;
}

### Open Next Page
if (-e $next){
  open(txtFile, "<$next");
  print("Content-type: text/html\n\n");
  while ($line = <txtFile>) {
    chomp($line);
    print("$line\n");
  }
  close(txtFile);
}else{
  $errorReason = "Could not locate the next page: $next";
  &PageError;
}

#===================== SUBROUTINS ==================================
sub PageError {
  if ($test eq "yes") {
    print("$errorReason");
    exit;
  }else{
    open(MAIL, "| /usr/sbin/sendmail -t");
    print(MAIL "To: $to\n");
    print(MAIL "From: CGI Scripts <mailer\@gtaeronautics.com>\n");
    print(MAIL "Reply-To: $to\n");
    print(MAIL "Errors-To: $to\n");
    print(MAIL "Subject: Script Error: $name\n");

    print(MAIL "The time: " . time() . "\n");
    print(MAIL "Process ID: $$\n");
    print(MAIL "\$0 : $0\n\n");
    print(MAIL "$name\n");
    print(MAIL "$errorReason\n\n");
    print(MAIL "Arguments passed where:\n");
    foreach $key (sort keys(%input)) {
      print(MAIL $key . " = " . $input{$key} . "\n");
    }
    print(MAIL "Request Method: $ENV{'REQUEST_METHOD'}\n");
    print(MAIL "Query String: $ENV{'QUERY_STRING'}\n");
    print(MAIL "\$in : $in\n");
    print(MAIL "HTTP_REFERER: $ENV{'HTTP_REFERER'}\n");
    print(MAIL "HTTP_USER_AGENT: $ENV{'HTTP_USER_AGENT'}\n");
    print(MAIL "HTTP_FROM: $ENV{'HTTP_FROM'}\n");
    print(MAIL "REMOTE_HOST: $ENV{'REMOTE_HOST'}\n");
    print(MAIL "REMOTE_ADDR: $ENV{'REMOTE_ADDR'}\n");
    print(MAIL "REMOTE_USER: $ENV{'REMOTE_USER'}\n");
    close(MAIL);
    print("Location: index.html\n\n");
    exit(0);
  }
}