import 'package:app/settings/layout_type.dart';
import 'package:app/settings/photon.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';
import 'package:app/state.dart';

class MainNav extends StatelessWidget {
  const MainNav({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: context.watch<PageIndex>().layoutType.index,
      type: BottomNavigationBarType.fixed,
      backgroundColor: Photon.colors.grayLight,
      unselectedItemColor: Photon.colors.grayDark,
      selectedItemColor: Photon.colors.secondaryDark,
      onTap: (index) {
        LayoutType layout = LayoutType.values[index];
        context.read<PageIndex>().setLayoutType(layout);
      },
      items: [
        BottomNavigationBarItem(
          icon: const Icon(Icons.image_sharp),
          label: AppLocalizations.of(context)!.photo_plural,
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.people_alt_outlined),
          label: AppLocalizations.of(context)!.sharing,
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.search),
          label: AppLocalizations.of(context)!.search,
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.collections_sharp),
          label: AppLocalizations.of(context)!.library,
        ),
      ],
    );
  }
}
