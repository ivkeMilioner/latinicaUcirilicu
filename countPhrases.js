function toPhrases(text, wordCount) {
  const words = text.split(" ");
  const phrases = new Map();

  for (let i = 0; i < words.length; i++) {
    let phrase = words.slice(i, i + wordCount).join(" ");
    let hashedPhrases = phrases.get(phrase);

    if (hashedPhrases) {
      phrases.set(phrase, hashedPhrases + 1);
    } else {
      phrases.set(phrase, 1);
    }

    if (i + wordCount >= words.length) {
      break;
    }
  }

  return phrases;
}



function createPhrases() {
  const text = document.getElementById("textarea").value;
  document.getElementById("output-2").innerHTML = JSON.stringify([
    ...toPhrases(text.toString(), 2)
  ]);
  document.getElementById("output-3").innerHTML = JSON.stringify([
    ...toPhrases(text.toString(), 3)
  ]);
  document.getElementById("output-4").innerHTML = JSON.stringify([
    ...toPhrases(text.toString(), 4)
  ]);
}





/*document.getElementById("output-2").innerHTML = JSON.stringify([
    ...toPhrases(text.toString(), 2)
  ]);
  document.getElementById("output-3").innerHTML = JSON.stringify([
    ...toPhrases(text.toString(), 3)
  ]);
  document.getElementById("output-4").innerHTML = "<p>"+JSON.stringify([
    ...toPhrases(text.toString(), 4)
  ]);
}*/