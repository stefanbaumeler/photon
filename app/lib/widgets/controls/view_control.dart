import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ViewControl extends StatelessWidget {
  const ViewControl({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
      icon: const Icon(Icons.visibility),
      tooltip: AppLocalizations.of(context)!.sort,
      itemBuilder: (context) {
        return [
          PopupMenuItem(
            child: Row(
              children: [
                const Icon(Icons.view_comfy),
                const SizedBox(width: 8),
                Text(AppLocalizations.of(context)!.gallery_view),
              ],
            ),
          ),
          PopupMenuItem(
            child: Row(
              children: [
                const Icon(Icons.pin_drop),
                const SizedBox(width: 8),
                Text(AppLocalizations.of(context)!.map_view),
              ],
            ),
          ),
          PopupMenuItem(
            child: Row(
              children: [
                const Icon(Icons.list),
                const SizedBox(width: 8),
                Text(AppLocalizations.of(context)!.list_view),
              ],
            ),
          ),
        ];
      },
    );
  }
}
