import 'package:flutter/material.dart';
import 'package:app/settings/generated/colors.dart';

@immutable
class Photon {
  static AppColors colors = AppColors();

  const Photon._();

  static ThemeData define() {
    return ThemeData();
  }
}
