// HtmlUtils.js

function extractTextFromHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
}

function extractImageSrcFromHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgElement = doc.querySelector("img");
  return imgElement ? imgElement.getAttribute("src") : "";
}

export const extractFirstParagraph = (val) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = val.content;

  const paragraphs = tempElement.querySelectorAll("p");
  for (const paragraph of paragraphs) {
    const text = extractTextFromHTML(paragraph.innerHTML);
    if (text && text !== "\u00A0") {
      return text;
    }
    else {
      return null;
    }
  }
  return "";
};

export const extractFirstHeading = (val) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = val.content;

  const headings = tempElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
  if (headings.length > 0) {
    const headingText = extractTextFromHTML(headings[0].outerHTML);
    return headingText;
  }
  return "";
};

export const extractFirstImage = (val) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = val.content;

  const images = tempElement.querySelectorAll("img");
  const image = extractImageSrcFromHTML(images[0].outerHTML);
  if (image) {
    return image;
  }
  else {
    return null
  }
};
