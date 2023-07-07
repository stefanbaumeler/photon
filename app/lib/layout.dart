import 'package:app/settings/layout_type.dart';
import 'package:app/state/page_index_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Layout extends StatelessWidget {
  const Layout({super.key});

  @override
  Widget build(BuildContext context) {
    LayoutType layout = context.watch<PageIndexProvider>().layoutType;

    return Scaffold(
      appBar: layout.actions,
      body: layout.body,
      bottomNavigationBar: layout.nav,
    );
  }
}
