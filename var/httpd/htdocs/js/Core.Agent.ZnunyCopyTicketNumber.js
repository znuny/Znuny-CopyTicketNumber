// --
// Core.Agent.ZnunyCopyTicketNumber.js - special functions for ZnunyCopyTicketNumber
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
     * Initialize the copy ticket number functionality
     */
    TargetNS.Init = function () {
        TargetNS.AddCopyIcon();
        TargetNS.BindEvents();
    };

    /**
     * Add copy icon before the ticket number in the headline
     */
    TargetNS.AddCopyIcon = function () {
        var $Headline = $('.Headline h1');
        if (!$Headline.length) {
            return;
        }

        var $TicketText = $Headline.contents().filter(function() {
            return this.nodeType === 3 && this.textContent.trim().indexOf('Ticket#') !== -1;
        });

        if ($TicketText.length) {
            var TicketText = $TicketText[0].textContent;
            var TicketMatch = TicketText.match(/Ticket#(\d+)/);

            if (TicketMatch) {
                var TicketNumber = TicketMatch[1];
                var TicketTitle = '';

                // Extract title after the "—" character
                var TitleMatch = $Headline.text().match(/—\s*(.+)/);
                if (TitleMatch) {
                    TicketTitle = TitleMatch[1].trim();
                }

                // Create copy icon with hover menu
                var $CopyIcon = $('<span class="CopyTicketIcon" title="' + Core.Language.Translate('Copy ticket information') + '">📋</span>');
                var $HoverMenu = $('<div class="CopyTicketMenu">' +
                    '<div class="CopyOption" data-action="copy-number" data-number="' + TicketNumber + '">' +
                    '<span class="Icon">🔢</span> ' + Core.Language.Translate('Copy Number') + '</div>' +
                    '<div class="CopyOption" data-action="copy-number-title" data-number="' + TicketNumber + '" data-title="' + TicketTitle + '">' +
                    '<span class="Icon">📝</span> ' + Core.Language.Translate('Copy Number + Title') + '</div>' +
                    '</div>');

                // Insert copy icon before the ticket text
                $TicketText[0].textContent = TicketText.replace('Ticket#', '');
                $CopyIcon.insertBefore($TicketText[0]);
                $CopyIcon.before('Ticket#');

                // Add hover menu to the copy icon
                $CopyIcon.append($HoverMenu);
            }
        }
    };

    /**
     * Bind events for the copy functionality
     */
    TargetNS.BindEvents = function () {
        $(document).on('click', '.CopyOption', function (Event) {
            Event.preventDefault();
            Event.stopPropagation();

            var Action = $(this).data('action');
            var TicketNumber = $(this).data('number');
            var TicketTitle = $(this).data('title');

            if (Action === 'copy-number') {
                TargetNS.CopyToClipboard(TicketNumber);
            } else if (Action === 'copy-number-title') {
                var CopyText = TicketNumber + ' — ' + TicketTitle;
                TargetNS.CopyToClipboard(CopyText);
            }
        });

        // Show/hide hover menu
        $(document).on('mouseenter', '.CopyTicketIcon', function () {
            $(this).find('.CopyTicketMenu').show();
        });

        $(document).on('mouseleave', '.CopyTicketIcon', function () {
            $(this).find('.CopyTicketMenu').hide();
        });
    };

    /**
     * Copy text to clipboard
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
     * Fallback copy method for older browsers
     */
    TargetNS.FallbackCopy = function (Text) {
        var TextArea = document.createElement('textarea');
        TextArea.value = Text;
        TextArea.style.position = 'fixed';
        TextArea.style.left = '-999999px';
        TextArea.style.top = '-999999px';
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

    // Initialize when document is ready
    $(document).ready(function () {
        TargetNS.Init();
    });

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.ZnunyCopyTicketNumber || {}));
