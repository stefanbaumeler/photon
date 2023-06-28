import 'package:app/screens/details_screen.dart';
import 'package:app/screens/gallery_screen.dart';
import 'package:app/screens/library_screen.dart';
import 'package:app/screens/list_screen.dart';
import 'package:app/screens/map_screen.dart';
import 'package:app/screens/search_screen.dart';
import 'package:app/screens/settings_screen.dart';
import 'package:app/screens/sharing_screen.dart';
import 'package:app/widgets/actions/default_actions.dart';
import 'package:app/widgets/navs/main_nav.dart';
import 'package:flutter/material.dart';

enum LayoutType {
  gallery(body: GalleryScreen(), actions: DefaultActions(), nav: MainNav()),
  sharing(body: SharingScreen(), actions: DefaultActions(), nav: MainNav()),
  search(body: SearchScreen(), actions: DefaultActions(), nav: MainNav()),
  library(body: LibraryScreen(), actions: DefaultActions(), nav: MainNav()),
  detail(body: DetailsScreen(), actions: DefaultActions(), nav: MainNav()),
  settings(body: SettingsScreen(), actions: DefaultActions(), nav: MainNav()),
  list(body: ListScreen(), actions: DefaultActions(), nav: MainNav()),
  map(body: MapScreen(), actions: DefaultActions(), nav: MainNav());

  const LayoutType(
      {required this.body, required this.actions, required this.nav});
  final Widget body;
  final PreferredSizeWidget actions;
  final Widget nav;
}
