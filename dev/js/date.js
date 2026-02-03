var myday="";
var mymonth="";
var myweekday="";
var year="";
mydate = new Date();

myday = mydate.getDay();
mymonth = mydate.getMonth();
myweekday= mydate.getDate();
year= mydate.getYear();

if (year < 2000) year = year + 1900;

arday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
armonth = new Array("January","February","March","April","May","June","July","August","September", "October","November","December")
ardate = new Array("0TH","1ST","2ND","3RD","4TH","5TH","6TH","7TH","8TH","9TH","10TH","11TH","12TH","13TH","14TH","15TH","16TH","17TH","18TH","19TH","20TH","21ST","22ND","23RD","24TH","25TH","26TH","27TH","28TH","29TH","30TH","31ST");

var time = (armonth[mymonth] + " " + myweekday + ", " + year );
document.write(time);