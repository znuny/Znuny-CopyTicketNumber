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

    my $Lang = $Self->{Translation} || {};

    # Custom language strings for ZnunyCopyTicketNumber
    $Lang->{'Copy ticket information'} = 'Ticket-Informationen kopieren';
    $Lang->{'Copy Number'} = 'Nummer kopieren';
    $Lang->{'Copy Number + Title'} = 'Nummer + Titel kopieren';
    $Lang->{'Copied to clipboard!'} = 'In Zwischenablage kopiert!';

    return $Lang;
}

1;