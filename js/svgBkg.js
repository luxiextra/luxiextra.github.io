async function loadSvg(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching ${url}: ${response.status}`);
    }
    return await response.text();
}

async function applyBackgroundTo(element)
{
    const svgUrl = getComputedStyle(element).getPropertyValue("--svg-url").trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    const fillColor = getComputedStyle(element).getPropertyValue("--svg-fill").trim();
    const fillColorSecondary = getComputedStyle(element).getPropertyValue("--svg-fill-secondary").trim();
    const svgText = await loadSvg(svgUrl);
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const primaryElements = svgDoc.querySelectorAll("#primary");
    const secondaryElements = svgDoc.querySelectorAll("#secondary");

    primaryElements.forEach((elem) => 
    {
        if (fillColor) 
            elem.setAttribute("fill", fillColor);
    });

    secondaryElements.forEach((elem) => 
    {
        if (fillColorSecondary) 
            elem.setAttribute("fill", fillColorSecondary);
    });

    const serializer = new XMLSerializer();
    const modifiedSvgText = serializer.serializeToString(svgDoc.documentElement);
    const encodedSvg = encodeURIComponent(modifiedSvgText);
    const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;

    element.style.backgroundImage = backgroundImage;
}


const observer = new MutationObserver(mutations => 
{
    mutations.forEach(mutation =>
    {
        mutation.addedNodes.forEach(node =>
        {
            if (node.nodeType == 1 && node.hasAttribute('data-svg-bkg'))
                applyBackgroundTo(node);
        });
    });
});

observer.observe(document.body, {childList: true, subtree: true});  

document.addEventListener("DOMContentLoaded", function () 
{
    const elements = document.querySelectorAll(`[data-svg-bkg]`);

    elements.forEach(async (element) => 
    {
       applyBackgroundTo(element);
    });

});