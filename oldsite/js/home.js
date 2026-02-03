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

function gtaGetText(node) {
  if (!node) return "";
  return (node.textContent || node.innerText || "");
}

function gtaExtractDate(value) {
  if (!value) return null;
  var trimmed = value.replace(/^\s+|\s+$/g, "");
  var normalized = trimmed.replace(/\s+/g, " ");

  var m = normalized.match(/^(\d{1,2}\/\d{1,2}(?:-\d{1,2})?\/\d{2,4})\b/);
  if (m && m[1]) return m[1];

  m = normalized.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4})\b/);
  if (m && m[1]) return m[1];

  return null;
}

function gtaIsDateToken(value) {
  if (!value) return false;
  value = value.replace(/\s+/g, "");
  return /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value);
}

function gtaTitleFromParagraph(p, dateToken) {
  var text = gtaGetText(p).replace(/\s+/g, " ").trim();
  if (dateToken) {
    text = text.replace(dateToken, "").trim();
  }

  if (!text) return "Update";

  var sentence = text;
  var dot = sentence.indexOf(".");
  if (dot > 30) sentence = sentence.substring(0, dot + 1);

  if (sentence.length > 90) sentence = sentence.substring(0, 87) + "...";
  return sentence;
}

function gtaBuildNewsExplorer() {
  var container = document.getElementById("newsitem");
  if (!container) return;

  if (container.className && container.className.indexOf("is-enhanced") !== -1) return;
  container.className = (container.className ? container.className + " " : "") + "is-enhanced";

  var paragraphs = container.getElementsByTagName("p");
  if (!paragraphs || paragraphs.length === 0) return;

  var blocks = [];
  for (var i = 0; i < paragraphs.length; i++) {
    blocks.push(paragraphs[i]);
  }

  var articles = [];
  var current = null;

  for (var j = 0; j < blocks.length; j++) {
    var p = blocks[j];
    var firstBold = p.getElementsByTagName("b")[0];
    var boldText = firstBold ? gtaGetText(firstBold) : "";
    var extractedDate = firstBold ? gtaExtractDate(boldText) : null;
    var isStart = firstBold && extractedDate;

    if (isStart) {
      if (current) articles.push(current);
      current = {
        date: extractedDate,
        title: gtaTitleFromParagraph(p, extractedDate),
        nodes: [p.cloneNode(true)]
      };
      continue;
    }

    if (current) {
      current.nodes.push(p.cloneNode(true));
    }
  }

  if (current) articles.push(current);
  if (articles.length === 0) return;

  container.innerHTML = "";

  var explorer = document.createElement("div");
  explorer.className = "gta-news-explorer";

  var list = document.createElement("div");
  list.className = "gta-news-list";
  explorer.appendChild(list);

  var panel = document.createElement("div");
  panel.className = "gta-news-panel";
  explorer.appendChild(panel);

  function showArticle(index) {
    if (index < 0 || index >= articles.length) return;

    var btns = list.getElementsByTagName("button");
    for (var k = 0; k < btns.length; k++) {
      if (k === index) {
        btns[k].className = "gta-news-item-btn is-active";
      } else {
        btns[k].className = "gta-news-item-btn";
      }
    }

    panel.innerHTML = "";
    var header = document.createElement("div");
    header.className = "gta-news-panel-header";

    var dateEl = document.createElement("div");
    dateEl.className = "gta-news-panel-date";
    dateEl.appendChild(document.createTextNode(articles[index].date));

    var titleEl = document.createElement("div");
    titleEl.className = "gta-news-panel-title";
    titleEl.appendChild(document.createTextNode(articles[index].title));

    header.appendChild(dateEl);
    header.appendChild(titleEl);
    panel.appendChild(header);

    var body = document.createElement("div");
    body.className = "gta-news-panel-body";
    for (var n = 0; n < articles[index].nodes.length; n++) {
      body.appendChild(articles[index].nodes[n]);
    }
    panel.appendChild(body);
  }

  for (var a = 0; a < articles.length; a++) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gta-news-item-btn";
    btn.setAttribute("data-index", String(a));

    var meta = document.createElement("div");
    meta.className = "gta-news-item-meta";
    meta.appendChild(document.createTextNode(articles[a].date));

    var title = document.createElement("div");
    title.className = "gta-news-item-title";
    title.appendChild(document.createTextNode(articles[a].title));

    btn.appendChild(meta);
    btn.appendChild(title);

    btn.onclick = function() {
      var idx = parseInt(this.getAttribute("data-index"), 10);
      showArticle(idx);
      return false;
    };

    list.appendChild(btn);
  }

  container.appendChild(explorer);
  showArticle(0);
}

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", gtaBuildNewsExplorer, false);
} else {
  window.attachEvent("onload", gtaBuildNewsExplorer);
}
