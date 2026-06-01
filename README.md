# Setup

```
yarn
yarn dev
```
then open http://localhost:5173/

# UIDB

This Single Page Application consists of two general views - list of devices and a detailed view of one specific device.

The list can be viewed as a table or as a grid. Additionally with the list, the user can use the search box to find a device by its product name, line name and shortnames, or use the line ID filter checkboxes.

The device detail page provides you with basic information and some specifications about the device. It is possible to toggle from text format to JSON if you prefer to check the data available more in detail.

As the application is supposed to be used internally to discover, verify, share and align on these products displayed, the priorities are navigation and search/filter functionality. The search query and all the line ID filters are constantly updated in the URL so the user can share the list or specific device's information quickly with colleagues. All buttons that would lead to a specific device's page are anchor tags, so the user can quickly navigate around the page - back, forward, open in new tab or window etc. For developers the JSON preview has syntax highlighting and two buttons - one to open the JSON in new tab, another one to copy it.

Changes from the given design:
- Removed search box dropdown with list items, as it seemed logical to filter the list the user already sees as table or grid instead. By design the user would have to type precisely what they are looking for to see it in the dropdown list that only contains 3 items.
- Added notification style counter to line ID filter, so the user is aware that there may be checkboxes checked in the dropdown that disappears.
- The "See All Details as JSON" button was changed to a toggle between the "Text with an image" view and a "formatted JSON" with syntax highlighting. The toggle is located at the top so its easier click on it (most noteably on phones), compared to where it would have been in design, especially if the device has a long list of specifications.

There are changes I thought about, but ended out of scope for the time limit. To name a few:
- More selectors for device specification. Currently there are only three and their current functionality is based on assumption after looking at the design. This logic can be easily adjusted and extended with `DEVICE_SPECS_LIST`.
- More advanced search, for example, "3 ant" would find devices with "3Ghz Antenna" in their name
- Replace "Show More" with virtualized or infinite scroll list (if needed)
- Use already cached images from the list when opening specific device's page, so you see lower resolution image instead of nothing (if needed)
- Save preffered list style - table or grid

JSON syntax highlighting logic and Copy, NewTab, Text, Json icons were generated with Claude.
