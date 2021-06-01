# Goal

a webclient game that rewards you for going different places and walking

# Todo

General

-   [x] currently using a mixture of strings and numbers for ids, everything should be numbers
-   [x] denjuu index is off by one, pull it back
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
-   [x] implement move thunk. pattern: dispatch move type, setTimeout, dispatch move effect
-   [ ] implement move effect thunk
-   [ ] existing code is gross and needs a huge refactor
-   [ ] decouple experince + leveling from battle

Meeting Denju

-   [ ] design conversations
-   [ ] implement conversations

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
-   [ ] A mix of the small and details view of the items is being used. That is less than ideal
-   [x] Make items usable from items menu
-   [x] Add healing items
-   [ ] add secondary Exp items to denjuu

Walk Menu

-   [x] Update walk screen to at least use telefang imagery
-   [ ] Move the screen
-   [x] Generate random backgrounds
-   [ ] Pull in map data to generate backgrounds. use this maybe: https://dev.virtualearth.net/REST/v1/LocationRecog/${n},${n}?key=key&top=10&includeEntityTypes=businessAndPOI
-   [ ] Pull in map data to determine "type" of area and spawn denjuu and items accordingly
-   [ ] Persist counter but not map location

Alert Menu

-   [ ] Fusion Event type. Should allow users to fuse/mod evolve denju
-   [x] Alerts menu item should show when there are alerts
-   [ ] Spawn Store events where items can be purchased???? Add money???
-   [ ] Better alert type icons

Credits

-   [ ] implement credit menu. Call out https://startledpixels.itch.io/2d-pixel-item-asset-pack

Popup

-   [ ] implement proper zindex handling
