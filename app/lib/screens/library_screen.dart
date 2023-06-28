import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

Card CardButton(text) {
  return Card(
    child: Container(
      padding: const EdgeInsets.all(4),
      child: Row(
        children: [
          const Icon(Icons.tram_sharp),
          Text(text),
        ],
      ),
    ),
  );
}

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Row(
            children: [
              CardButton(AppLocalizations.of(context)!.trash),
              CardButton(AppLocalizations.of(context)!.archive),
              CardButton(AppLocalizations.of(context)!.favorites)
            ],
          ),
        ],
      ),
    );
  }
}
