# Znuny Copy Ticket Number

This package adds a copy icon before the ticket number in the ticket zoom view, allowing agents to easily copy either the ticket number alone or the ticket number with title to the clipboard.

## Features

- **Copy Icon**: A clipboard icon (📋) appears before the ticket number in the ticket zoom headline
- **Hover Menu**: Hover over the icon to see two copy options:
  - Copy Number: Copies only the ticket number
  - Copy Number + Title: Copies the ticket number followed by "—" and the ticket title
- **Visual Feedback**: Shows a success message when content is copied to clipboard
- **Multi-language Support**: Includes German translations

## Installation

1. Install the package through the Znuny package manager
2. The functionality will automatically be available in the AgentTicketZoom view

## How It Works

The package automatically detects the ticket headline structure:
```
Ticket#4201338886 — Kleine Verbesserungsvorschlag - TicketNr. kopieren
```

It then inserts a copy icon before the ticket number, and when clicked, provides options to copy:
- Just the number: `4201338886`
- Number with title: `4201338886 — Kleine Verbesserungsvorschlag - TicketNr. kopieren`

## Technical Details

- **JavaScript Loader**: Registered for AgentTicketZoom only
- **Clipboard API**: Uses modern clipboard API with fallback for older browsers
- **Responsive Design**: Hover menu with proper positioning and styling
- **Accessibility**: Includes proper titles and hover states

## Files

- `Kernel/Config/Files/XML/ZnunyCopyTicketNumber.xml` - Configuration
- `Kernel/Language/de_ZnunyCopyTicketNumber.pm` - German translations
- `var/httpd/htdocs/js/Core.Agent.ZnunyCopyTicketNumber.js` - JavaScript functionality
- `var/httpd/htdocs/skins/Agent/default/css/Core.ZnunyCopyTicketNumber.css` - Styling

## Browser Support

- Modern browsers: Uses native clipboard API
- Older browsers: Falls back to document.execCommand method

## License

GNU AFFERO GENERAL PUBLIC LICENSE Version 3, November 2007
