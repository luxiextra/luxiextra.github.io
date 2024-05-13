export function initializeDynamicAttribute(attribute, applyFunction) 
{
    const observer = new MutationObserver(mutations => 
    {
        mutations.forEach(mutation => 
        {
            mutation.addedNodes.forEach(node => 
            {
                if (node.nodeType === 1 && node.hasAttribute(attribute))
                    applyFunction(node);
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("DOMContentLoaded", () => 
    {
        const elements = document.querySelectorAll(`[${attribute}]`);
        
        elements.forEach(element => 
        {
            applyFunction(element);
        });
    });
}