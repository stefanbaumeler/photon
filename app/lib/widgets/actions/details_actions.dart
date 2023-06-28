import 'package:app/settings/photon.dart';
import 'package:app/widgets/controls/sort_control.dart';
import 'package:app/widgets/controls/view_control.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DefaultActions extends StatefulWidget implements PreferredSizeWidget {
  const DefaultActions({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  State<DefaultActions> createState() => _DefaultActionsState();
}

class _DefaultActionsState extends State<DefaultActions> {
  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Photon.colors.grayLight,
      foregroundColor: Photon.colors.grayDark,
      title: const Text('Photon'),
      actions: [
        const SortControl(),
        const ViewControl(),
        IconButton(
          icon: const Icon(Icons.settings_sharp),
          tooltip: AppLocalizations.of(context)!.setting_plural,
          onPressed: () {},
        ),
      ],
    );
  }
}
