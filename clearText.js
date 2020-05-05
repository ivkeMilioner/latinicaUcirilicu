function clearText() {
    var entered_text;

    
    entered_text = document.getElementById("textarea").value;
   // entered_text = entered_text.replace(/[^a-zA-Z ]/g, " ")
   //entered_text = entered_text.stringToReplace.replace(/[^\w\s]/gi, '')
   //entered_text = entered_text.replace(/^https?:\/\//,'');
  
   entered_text = entered_text.replace(/^(https?):\/\/[^\s$.?#].[^\s]*$/gm);
   
   
   entered_text = entered_text.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
   

  
  
   entered_text = entered_text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
   //entered_text = entered_text.replace(/\s{2,}/g, "");
   entered_text = entered_text.replace(/\s+/g, ' ').trim();
    
 
    document.getElementById("textarea").style.color = "#6200EA";
    document.getElementById("textarea").value = entered_text;
  }



  document.onmousedown = clearSelectedText;
document.onmouseup = getSelectedText;
if (!document.all) document.captureEvents(Event.MOUSEUP);
if (!document.all) document.captureEvents(Event.DBLCLICK);