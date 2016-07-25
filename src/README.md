# Joomlatools UI

An intuitive User Interface.

## Why

We wanted to create an intuitive User Interface that could be used on top of Joomla.

### The idea behind the UI

This is not a framework like Bootstrap is. You can't just copy paste anything anywhere. Most elements have a predefined spot. 
There are of course exceptions. You can take a look at the "templates" page for examples to copy paste.

### How the UI is built-up

[Make illustrations about the order of elements]

[Explain flexbox]

[Link to comeplete list and complete form page]

The UI basically consists out of the following two views:
- A list view that lists items
- A form view that displays a form to add or edit items

Modals are using the same views to keep thing recognizable

#### The list view

The list view consists out of a list of items and can be accompanied by the following elements

- A menubar
- A titlebar
- A left sidebar
- A right sidebar
- A toolbar
- Breadcrumbs
- A scopebar

In the left sidebar you can find elements like sub-navigation, a tree and quickfilters. These elements are all navigational elements to display something on the right (in the list).

The toolbar should always be placed on top of the list and never on top of the sidebar since the actions in the toolbar are about the list below it, and about not the elements in the left sidebar. The reason that the toolbar is on top is because the actions you take (for example creating a new item) could ignore the filters that are active on the list below it. For example you could have a filtered list that only shows items with a certain category. When creating a new item you could choose to add another category. 

After the toolbar a breadcrumbs may follow to display which folder or category we are currently viewing. Inside this category we can filter so the scopebar is to follow next.

The scopebar is the last row of filters to get a small list of items you are looking for. As a best practice the search can be found on the top right.

What you end up with is a list that only show the items that meet the set filters like:
- UI page 
- Page category / folder
- Page filters (user, date etc.)

Last but not least we've got the limit and pagination on the bottom showing you there is more than the items you just saw.

#### The form view

It is important to know that you should always only use a sidebar in a form view when there's autosaving enabled on the form. Otherwise people could lose their work.

For the form you should also never place the toolbar above the sidebar.

In the form view you can use a titlebar to display which page you are on. This is especially helpful on mobile views.
