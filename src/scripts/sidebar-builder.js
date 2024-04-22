/*
* Purpose: Automatically generate and style the contents of an articles sidebar
*
* Config:
*   Adding "no-index" to an <a> element's class attribute will prevent it from being added to the sidebar.
*   e.g. <a id="example" class="no-index">Hi!</a> will be ignored by this script.
*
*   The type of list used to generate the sidebar should match the empty list defined in HTML. This can be changed
*   by changed listType below.
*/

const listType = "ul";
let sidebarList = document.querySelector(`aside nav`);

if (sidebarList === null) {
    console.error("Unable to find an appropriate hook to generate sidebar contents into.");
} else {

    let navigationAnchors = document.querySelectorAll("a");

    let currentLevel = 2; // Current heading level, the lowest it can be at anytime is h2
    let startingPoint = document.createElement(listType);
    startingPoint.classList.add("sidebar-list");
    sidebarList.appendChild(startingPoint);
    let elementTrail = [startingPoint];

    for (let anchor of navigationAnchors) {
        /*
        * Get child, if it's a header compare it's level to the current level. Else continue
        *
        * If level is greater than current level, insert a list element than the navigation anchor.
        * If same, insert the navigation anchor.
        * If less, pop out by one element then create navigation anchor
        */
        let noIndex = anchor.matches(".no-index");
        let childrenCount = anchor.childElementCount;
        let anchorId = anchor.id;

        if (
            noIndex || // Ignores indexing
            childrenCount === 0 || // Has no children
            !anchorId // Doesn't contain a link
        ) {
            continue;
        }

        let header = anchor.firstElementChild;
        let headerType = header.tagName.toLowerCase();
        let headerLevel = parseInt(headerType.substring(1));

        if (isNaN(headerLevel)) {
            console.error("Unable to find heading level for element. Ignoring...");
            continue;
        }

        let listElement = elementTrail[elementTrail.length - 1];

        if (headerLevel < currentLevel) {
            // Pop out by 1 element
            elementTrail.pop();
            listElement = elementTrail[elementTrail.length - 1];
        } else if (headerLevel > currentLevel) {
            // Create a new list element
            let newList = document.createElement(listType);
            newList.classList.add("sidebar-list");
            listElement.appendChild(newList);
            elementTrail.push(newList);
            listElement = newList;
        }

        currentLevel = headerLevel;

        let navLiItem = document.createElement("li");
        navLiItem.classList.add("sidebar-item");

        let navAnchor = document.createElement("a");

        navAnchor.textContent = header.textContent;
        navAnchor.href = `#${anchor.id}`;
        navAnchor.classList.add("sidebar-link");
        navLiItem.appendChild(navAnchor);

        listElement.appendChild(navLiItem);
    }
}