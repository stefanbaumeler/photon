import 'package:flutter/foundation.dart';

class Medium {
  double x = 0;
  double y = 0;

  Medium(this.x, this.y)
}

class MediaProvider with ChangeNotifier, DiagnosticableTreeMixin {
  final List<Medium> _media = [];

  List<Medium> get media => _media;

  Medium myMedium = Medium(0, 0);

  MediaProvider() {
    double f = myMedium.x;
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(EnumProperty('media', media));
  }
}
