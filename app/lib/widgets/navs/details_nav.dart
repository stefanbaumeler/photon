import 'package:app/settings/photon.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';
import 'package:app/state.dart';

class DetailsNav extends StatelessWidget {
  const DetailsNav({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: context.watch<PageIndex>().layoutType.index,
      type: BottomNavigationBarType.fixed,
      backgroundColor: Photon.colors.grayLight,
      unselectedItemColor: Photon.colors.grayDark,
      selectedItemColor: Photon.colors.secondaryDark,
      onTap: (index) {},
      items: const [],
    );
  }
}
