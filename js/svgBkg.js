async function loadSvg(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching ${url}: ${response.status}`);
    }
    return await response.text();
}

async function setSvgBackground(dataAttribute) {
    const elements = document.querySelectorAll(`[${dataAttribute}]`);

    elements.forEach(async (element) => {
        const svgUrl = getComputedStyle(element).getPropertyValue("--svg-url").trim().slice(4, -1);
        const fillColor = getComputedStyle(element).getPropertyValue("--svg-fill").trim();
        const svgText = await loadSvg(svgUrl);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const paths = svgDoc.querySelectorAll("path");

        paths.forEach(path => {
            path.setAttribute("fill", fillColor);
        });

        const serializer = new XMLSerializer();
        const modifiedSvgText = serializer.serializeToString(svgDoc.documentElement);
        const encodedSvg = encodeURIComponent(modifiedSvgText);
        const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;

        element.style.backgroundImage = backgroundImage;
    });
}

setSvgBackground("data-svg-bkg");
