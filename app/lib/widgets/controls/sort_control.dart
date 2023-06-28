import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SortControl extends StatelessWidget {
  const SortControl({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
      itemBuilder: (context) {
        return [
          PopupMenuItem(
            child: Text(AppLocalizations.of(context)!.newest_first),
          ),
          PopupMenuItem(
            child: Text(AppLocalizations.of(context)!.oldest_first),
          ),
          PopupMenuItem(
            child: Text(AppLocalizations.of(context)!.most_recent),
          ),
        ];
      },
      icon: const Icon(Icons.sort),
      tooltip: AppLocalizations.of(context)!.sort,
    );
  }
}
