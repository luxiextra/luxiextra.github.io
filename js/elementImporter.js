// This script fetches and imports HTML content into elements with the 'elementImporter' attribute.
// Example usage: <div elementImporter filePath="example.html"></div>

async function importElements()
{
    const elementImportRequests = document.querySelectorAll("[element-importer]");
    
    elementImportRequests.forEach(async (importRequest) =>
    {
        const filePath = `${importRequest.getAttribute('filePath')}`;
        const elementFile = await fetch(filePath);
        const content = await elementFile.text();

        importRequest.innerHTML = content;
    });

}

document.addEventListener("DOMContentLoaded", function () {
    importElements();
});