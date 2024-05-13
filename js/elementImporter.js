import { initializeDynamicAttribute } from './dynamicAttributeInitializer.js';

// This script fetches and imports HTML content into elements with the 'elementImporter' attribute.
// Example usage: <div elementImporter filePath="example.html"></div>

async function importElementInto(importRequest)
{
    const filePath = `${importRequest.getAttribute('filePath')}`;
    const elementFile = await fetch(filePath);
    const content = await elementFile.text();

    importRequest.innerHTML = content;

    const nestedImports = importRequest.querySelectorAll("[element-import]");
    for (const nested of nestedImports) 
    {
        if (nested === importRequest) continue;
        await importElementInto(nested);
    }

}

initializeDynamicAttribute('element-import', importElementInto);
