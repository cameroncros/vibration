#!/usr/bin/perl

use CGI;
use CGI::Carp qw ( fatalsToBrowser );

print "Content-type: text/html\n\n";

my $query = new CGI;
my $dir = $query->param('comm');
#print "$dir";
my $out = `mpc $dir`;
print "$out";
exit 0;
