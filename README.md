# Goal

a webclient game that rewards you for going different places and walking

# Todo

General

-   [ ] currently using a mixture of strings and numbers for ids, everything should be ids
-   [ ] denjuu index is off by one, pull it back
-   [ ] Load all denjuu
-   [ ] decided which telefang to pull info from
-   [ ] load all items
-   [ ] load all moves

Battle

-   [ ] Transition out of battle nicely
-   [ ] P1 defeat logic
-   [ ] Switching denjuu logic
-   [ ] actually use stats
-   [ ] implement attack effect types
-   [ ] implement move thunk. pattern: dispatch move type, setTimeout, dispatch move effect
-   [ ] existing code is gross and needs a huge refactor
-   [ ] decouple experince + leveling from battle

Setting Menu

-   [x] Add settings menu
-   [ ] Actually have settings

Denjuu Menu

-   [x] Add denjuu menu
-   [ ] make items usable from denjuu menu
-   [ ] allow changing of active denju

Items Menu

-   [x] Add items menu
-   [ ] Better item descriptions and menus
-   [ ] Make items usable from items menu

Walk Menu

-   [x] Update walk screen to at least use telefang imagery
-   [ ] Move the screen
-   [ ] Generate random backgrounds
-   [ ] Pull in map data to generate backgrounds. use this maybe: https://dev.virtualearth.net/REST/v1/LocationRecog/${n},${n}?key=key&top=10&includeEntityTypes=businessAndPOI
-   [ ] Pull in map data to determine "type" of area and spawn denjuu and items accordingly

Alert Menu

-   [ ] Fusion Event type. Should allow users to fuse/mod evolve denju
-   [x] Alerts menu item should show when there are alerts
-   [ ] Spawn Store events where items can be purchased???? Add money???
-   [ ] Better alert type icons
