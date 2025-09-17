<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://www.znuny.com/assets/znuny-logo.svg" width="384" height="96">
  <img alt="Znuny' Dark: 'Znuny'" src="https://www.znuny.com/assets/znuny-logo-black.svg" width="384" height="96">
</picture>

![Build status](https://badge.proxy.znuny.com/Znuny-CopyTicketNumber/rel-7_2)

# Znuny-CopyTicketNumber

This package adds a copy icon before the ticket number in the ticket detail view, allowing agents to easily copy either the ticket number alone or the ticket number with title to the clipboard.

## Features

- **Copy Icon**: A clipboard icon (📋) appears before the ticket number in the ticket zoom headline
- **Hover Menu**: Hover over the icon to see two copy options:
  - Copy Ticket Number: Copies only the ticket number
  - Copy Ticket Number + Title: Copies the ticket number followed by "—" and the ticket title
- **Visual Feedback**: Shows a success message when content is copied to clipboard
- **Multi-language Support**: Includes German translations

## Installation

Install the package through the Znuny package manager from the repository 'Znuny Open Source Add-ons'. The functionality will automatically be available in the ticket detail view.

## How It Works

The package automatically detects the ticket headline structure:
```
Ticket#4201338886 - Small suggestion for improvement - Copy ticket number
```

It then inserts a copy icon before the ticket number, and when clicked, provides two options to copy:
- Just the number: `4201338886`
- Number with title: `4201338886 - Small suggestion for improvement - Copy ticket number`

## Browser Support

- Modern browsers: Uses native clipboard API
- Older browsers: Falls back to document.execCommand method

## Configuration

No further configuration required.

## License

GNU AFFERO GENERAL PUBLIC LICENSE Version 3, November 2007

## Professional Support

For this add-on and for Znuny in general visit [www.znuny.com](https://www.znuny.com). Looking forward to hear from you!

Your Znuny Team!

[https://www.znuny.com](https://www.znuny.com)
