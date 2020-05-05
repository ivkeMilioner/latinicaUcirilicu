function saveTextAsFile()
{
    let textToSave = document.getElementById("textarea").value;
    let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
 
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
 
function loadFileAsText()
{
    let fileToLoad = document.getElementById("fileToLoad").files[0];
 
    let fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        let textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("textarea").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
 