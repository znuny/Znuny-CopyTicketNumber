// --
// Copyright (C) 2012 Znuny GmbH, https://znuny.com/
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var Core   = Core || {};
Core.Agent = Core.Agent || {};

/**
 * @namespace
 * @exports TargetNS as Core.Agent.ZnunyCopyTicketNumber
 * @description
 *      This namespace contains the special functions for ZnunyCopyTicketNumber.
 */
Core.Agent.ZnunyCopyTicketNumber = (function (TargetNS) {

    /**
     * @description
     *     Initialize the copy ticket number functionality
     */
    TargetNS.Init = function () {
        TargetNS.AddCopyIcon();
        TargetNS.BindEvents();
    };

    /**
     * @description
     *     Add copy icon before the ticket number in the headline
     */
    TargetNS.AddCopyIcon = function () {
        var $Headline = $('.Headline h1'),
            HeadlineText,
            TicketMatch,
            TicketNumber,
            TicketTitle,
            TitleMatch,
            $CopyIcon,
            $HoverMenu;

        if (!$Headline.length) {
            return;
        }

        // Check if copy icon already exists
        if ($Headline.find('.CopyTicketIcon').length) {
            return;
        }

        HeadlineText = $Headline.text();
        TicketMatch  = HeadlineText.match(/Ticket#(\d+)/);

        if (TicketMatch) {
            TicketNumber = TicketMatch[1];
            TicketTitle = '';

            // Extract title after the "—" character
            TitleMatch = HeadlineText.match(/—\s*(.+)/);
            if (TitleMatch) {
                TicketTitle = TitleMatch[1].trim();
            }

            // Create copy icon with hover menu
            $CopyIcon  = $('<span class="CopyTicketIcon" title="' + Core.Language.Translate('Copy ticket information') + '"><i class="fa fa-clipboard"></i></span>');
            $HoverMenu = $('<div class="CopyTicketMenu">'
                + '<div class="CopyOption" data-action="copy-number" data-number="' + TicketNumber + '">'
                + Core.Language.Translate('Copy Ticket Number') + '</div>'
                + '<div class="CopyOption" data-action="copy-number-title" data-number="' + TicketNumber + '" data-title="' + TicketTitle + '">'
                + Core.Language.Translate('Copy Ticket Number + Title') + '</div>'
                + '</div>'
            );

            // Clear the headline content and rebuild it properly
            $Headline.empty();

            // Add the copy icon first
            $Headline.append($CopyIcon);

            // Add the ticket text
            $Headline.append('Ticket#' + TicketNumber);

            // Add the title if it exists
            if (TicketTitle) {
                $Headline.append(' — ' + TicketTitle);
            }

            // Add the hover menu to the copy icon
            $CopyIcon.append($HoverMenu);
        }
    };

    /**
     * @description
     *     Bind events for the copy functionality
     */
    TargetNS.BindEvents = function () {
        $('.CopyOption').on('click', function (Event) {
            var Action       = $(this).data('action'),
                TicketNumber = $(this).data('number'),
                TicketTitle  = $(this).data('title');

            Event.preventDefault();
            Event.stopPropagation();

            if (Action === 'copy-number') {
                TargetNS.CopyToClipboard(TicketNumber);
            } else if (Action === 'copy-number-title') {
                TargetNS.CopyToClipboard(TicketNumber + ' — ' + TicketTitle);
            }
        });
    };

    /**
     * @param {String} Text
     * @description
     *     Copy text to clipboard
     */
    TargetNS.CopyToClipboard = function (Text) {
        if (navigator.clipboard && window.isSecureContext) {
            // Use modern clipboard API
            navigator.clipboard.writeText(Text).then(function () {
                TargetNS.ShowCopySuccess();
            }).catch(function () {
                TargetNS.FallbackCopy(Text);
            });
        } else {
            // Fallback for older browsers
            TargetNS.FallbackCopy(Text);
        }
    };

    /**
     * @param {String} Text
     * @description
     *     Fallback copy method for older browsers
     */
    TargetNS.FallbackCopy = function (Text) {
        var TextArea = document.createElement('textarea');

        TextArea.value          = Text;
        TextArea.style.position = 'fixed';
        TextArea.style.left     = '-999999px';
        TextArea.style.top      = '-999999px';
        document.body.appendChild(TextArea);
        TextArea.focus();
        TextArea.select();

        try {
            document.execCommand('copy');
            TargetNS.ShowCopySuccess();
        } catch (Error) {
            console.error('Copy failed:', Error);
        }

        document.body.removeChild(TextArea);
    };

    /**
     * Show copy success message
     */
    TargetNS.ShowCopySuccess = function () {
        var $SuccessMessage = $('<div class="CopySuccessMessage">' + Core.Language.Translate('Copied to clipboard!') + '</div>');

        $('body').append($SuccessMessage);

        setTimeout(function () {
            $SuccessMessage.fadeOut(function () {
                $(this).remove();
            });
        }, 2000);
    };

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.ZnunyCopyTicketNumber || {}));
