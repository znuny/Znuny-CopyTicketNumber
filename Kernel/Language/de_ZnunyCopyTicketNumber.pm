# --
# Copyright (C) 2012 Znuny GmbH, https://znuny.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (AGPL). If you
# did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
# --

package Kernel::Language::de_ZnunyCopyTicketNumber;

use strict;
use warnings;
use utf8;


sub Data {
    my $Self = shift;

    # Custom language strings for ZnunyCopyTicketNumber
    $Self->{Translation}->{'Copy ticket information'} = 'Ticket-Informationen kopieren';
    $Self->{Translation}->{'Copy Ticket Number'} = 'Ticketnummer kopieren';
    $Self->{Translation}->{'Copy Ticket Number + Title'} = 'Ticketnummer + Titel kopieren';
    $Self->{Translation}->{'Copied to clipboard!'} = 'In Zwischenablage kopiert!';


    $Self->{JavaScriptStrings} //= [];
    push @{$Self->{JavaScriptStrings}},(
        'Copy ticket information',
        'Copy Ticket Number',
        'Copy Ticket Number + Title',
        'Copied to clipboard!',
    );
    return 1;
}

1;