
package com.eraydemirok.react_native_card_swiper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class CardSwiperModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public CardSwiperModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "CardSwiper";
  }
}