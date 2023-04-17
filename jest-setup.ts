// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";

/**
react-testing-libary Query guidance
Ref. https://testing-library.com/docs/queries/about/#priority
    1. Queries Accessible to Everyone Queries that reflect the experience of visual/mouse users as well as those that use assistive technology.
        `getByRole`: This can be used to query every element that is exposed in the accessibility tree. With the name option you can filter the returned elements by their accessible name. This should be your top preference for just about everything. There's not much you can't get with this (if you can't, it's possible your UI is inaccessible). Most often, this will be used with the name option like so: getByRole('button', {name: /submit/i}). Check the list of roles.
        `getByLabelText`: This method is really good for form fields. When navigating through a website form, users find elements using label text. This method emulates that behavior, so it should be your top preference.
        `getByPlaceholderText`: A placeholder is not a substitute for a label. But if that's all you have, then it's better than alternatives.
        `getByText`: Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (like divs, spans, and paragraphs).
        `getByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.
    2. Semantic Queries HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.
        `getByAltText`: If your element is one which supports alt text (img, area, input, and any custom element), then you can use this to find that element.
        `getByTitle`: The title attribute is not consistently read by screenreaders, and is not visible by default for sighted users
    3. Test IDs
        `getByTestId`: The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).
 */
