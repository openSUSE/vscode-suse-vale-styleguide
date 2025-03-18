# Change Log

## 0.6.16
- improved 'single sign-on' rule
- detects `<figure>` with no xml:id defined
- 'native' is inclusive in 'cloud native'
## 0.6.15
- detects empty image alt text for AsciiDoc
## 0.6.14
- fixed wrongly detected capitalized word after a colon
## 0.6.13
- detects none or empty object description
## 0.6.12
- detection of lower-cased table headers aligned for ADOC and DB
## 0.6.11
- detect empty table headers (DB) or headers starting with lowercase (ADOC)
## 0.6.10
- long lines in DocBook `<screen/>` are correctly detected eve if contain regexp
  characters
## 0.6.9
- Vale now provides spell-checking capabilities
## 0.6.8
- AsciiDoc code blocks are now checked for lines longer than 80 characters
## 0.6.7
- `<screen/>` is now checked for lines longer than 80 characters
## 0.6.6
- add rule to suggest `<figure>` over `<informalfigure>`
## 0.6.5
- fixed 'Oauth 2.0', 'drop-down list' and 'single sign-on'
## 0.6.4
- fresh export from TermWeb
## 0.6.3
- updated SurroundingCommas + added test
- added a new Slash rule
- updated entities in tests
- removed 'in this case' at the end of sentence
## 0.6.2
- added rule for apostrophes in acronyms
- updated rule for semicolons
- updated Will and Pronouns rules
- fixed spacing in Latin forms
- updated rule for contractions
## 0.6.1
- added 'Kanidm'
- fresh Termweb export
- removed YAML from linted files
- fixed `ignorecase` where applicable
## 0.6.0
- introduced SUSE and 3rd party products
- fresh export from Termweb
- limited linted file formats
## 0.5.2
- fixed empty dir failure
## 0.5.1
- improved debugging
## 0.5.0
- made a split between common, adoc and docbook rules
- added an example .vale.ini file
## 0.4.6
- merged 3 files into 1 for wordiness
- updated list of wordiness suggestions
- split tests into correct and wrong
## 0.4.5
- fixed terms:
    * in this case
    * plug-in
    * NVIDIA
    * `<link>`here`</link>`
## 0.4.4
- added asciidoc support
## 0.4.3
- fixes the following terms:
    * dialog box -> dialog
## 0.4.2
- fixes the following terms:
    * config
## 0.4.1
- new version of TermWeb XSL stylesheet with `valeRegex` attribute
- removed product names from TermWeb export (use entities)
- fixes the following terms:
    * unit file
    * unit
    * drop-in
    * drop-down
    * dialog box
    * solves
## 0.4.0
- introduced export of suggestions from TermWeb
## 0.3.8
- suggest to replace 2 dashes with &mdash;
- excluded 'sle' and 'sles' as part of words
- 'usually' is now fine
- 'system-wide' is correct
## 0.3.7
- updates for GRUB and XEN
## 0.3.6
- fixed patterns for 'system d' and 'ram'
## 0.3.5
- improved command-line rule
## 0.3.4
- valeCLI.config is written to user settings instead of workspace
## 0.3.3
- scope 'link' no longer exists, updated to 'raw'
- global storage directory creation fixed
## 0.3.2
- updated 'for example' phrases at sentence end and comma at line break
## 0.3.1
- updated 'for example' phrases for comma at line break
## 0.3.0
- removed static .vale.ini
- auto-generating .vale.ini on extension startup
## 0.2.3
- added 'For example:' exception
## 0.2.2
- migrated to a separate repository
- suggest 'command-line' when 'command line' matched
## 0.2.1
### Styles
- removed checking for 'might'
- improved matching for 'for example,' at line break

## 0.2.0
### Extension
- added customized DocBook XSLT stylesheet
- added test file with correct and wrong sentence examples
- icon made transparent
### Styles
- added new rule to surround specific terms with commas
- improved quote detection to omit possessives
- improved detection of number + unit sequence
- removed swap for 'static IP address'
- removed confusing 'more than 3 commas' rule
- removed confusing 'serial comma rule'
- improved detection of capital letter after a colon

## 0.1.0
- Initial release
