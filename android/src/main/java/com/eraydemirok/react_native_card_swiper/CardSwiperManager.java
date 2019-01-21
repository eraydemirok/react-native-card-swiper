package com.eraydemirok.react_native_card_swiper;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

public class CardSwiperManager extends ViewGroupManager<CardSwiperView> {

    @Override
    public String getName() {
        return "CardSwiper";
    }

    @Override
    protected CardSwiperView createViewInstance(ThemedReactContext reactContext) {

        // RN View Group
        ReactViewGroup reactViewGroup = new ReactViewGroup(reactContext);

        // card
        CardSwiperView cardSwiperView = new CardSwiperView(reactContext);
        cardSwiperView.addView(reactViewGroup);

        return cardSwiperView;
    }

    //

    @ReactProp(name = "radius", defaultFloat = 0f)
    public void setRadius(CardSwiperView cardSwiperView, float radius) {
        cardSwiperView.setRadius(radius);
    }

    @ReactProp(name = "color")
    public void setColor(CardSwiperView cardSwiperView, String cardColor) {
        cardSwiperView.setCardBackgroundColor(Color.parseColor(cardColor));
    }

    @ReactProp(name = "elevation", defaultFloat = 0f)
    public void setElevation(CardSwiperView cardSwiperView, float cardElevation) {
        cardSwiperView.setCardElevation(cardElevation);
    }

    //

    @Override
    public View getChildAt(CardSwiperView parent, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildAt(index);
        }
        return null;
    }

    @Override
    public int getChildCount(CardSwiperView parent) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildCount();
        }
        return 0;
    }

    @Override
    public void addView(CardSwiperView parent, View child, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).addView(child, index);
        }
    }

    @Override
    public void removeViewAt(CardSwiperView parent, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeViewAt(index);
        }
    }

    @Override
    public void removeAllViews(CardSwiperView parent) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeAllViews();
        }
    }
}
