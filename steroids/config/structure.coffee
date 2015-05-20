# Read more about app structure at http://docs.appgyver.com

module.exports =

  rootView:
    location: "http://localhost/index.html"

  drawers:
    left:
      id: "leftDrawer"
      location: "http://localhost/#/about"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"
