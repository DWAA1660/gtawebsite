// Scripts used on the Index Page
// 27 Mar 04

function menu() { 
  var i,p,v,obj,news,q,args=menu.arguments;
  v=args[2];
  var isNetscape = navigator.appName.indexOf("Netscape") != -1;
  if(isNetscape && ((news=findObj('newsitem'))!=null)) {
    if (news.style) {
      news=news.style;
      q=(v=='show')?'hidden':(v='hide')?'auto':q;
    }
    news.overflow=q;
  }

  if ((obj=findObj(args[0]))!=null) { 
   if (obj.style) {
     obj=obj.style;
     v=(v=='show')?'visible':(v='hide')?'hidden':v;
   }
    obj.visibility=v; }
}

function findObj(n, d) { 
  var p,i,x;
  if(!d) d=document;
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document;
    n=n.substring(0,p);
  }
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function verify() {
  var msg;
  msg="Missing Information:\n\n";
  if((document.login.gtu.value == "") || (document.login.gtu.value == null)) {
    msg += "Username requiered.";
    document.login.gtu.focus();
    alert(msg);
    return;
  }
  if((document.login.gtp.value == "") || (document.login.gtp.value == null)) {
    msg += "Password ";
    document.login.gtp.focus();
    alert(msg);
    return;
  }
  document.login.action = "client.cgi";
  document.login.submit();
  return;
}
 