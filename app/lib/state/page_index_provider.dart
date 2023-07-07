import 'package:app/settings/layout_type.dart';
import 'package:flutter/foundation.dart';

class PageIndexProvider with ChangeNotifier, DiagnosticableTreeMixin {
  LayoutType _layout = LayoutType.gallery;

  LayoutType get layoutType => _layout;

  void setLayoutType(LayoutType layout) {
    _layout = layout;

    notifyListeners();
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(EnumProperty('layoutType', layoutType));
  }
}
