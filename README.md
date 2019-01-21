
# react-native-card-swiper

## Getting started

`$ npm install react-native-card-swiper --save`

### Mostly automatic installation

`$ react-native link react-native-card-swiper`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.eraydemirok.react_native_card_swiper.RNCardSwiperPackage;` to the imports at the top of the file
  - Add `new RNCardSwiperPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-card-swiper'
  	project(':react-native-card-swiper').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-card-swiper/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-card-swiper')
  	```


## Usage
```javascript
import RNCardSwiper from 'react-native-card-swiper';

// TODO: What to do with the module?
RNCardSwiper;
```
  # react-native-card-swiper
