# React Native Card Swiper (react-native-card-swiper)

Tinder ve Badoo benzeri kart yığınları oluşturabileceğiniz React Native kütüphanesi.


## Kurulum

Kütüphanenin kurulumu aşağıdaki gibi yapılır.


#### Önemli not

Bu kütüphane `react-native-interactable` kütüphanesini kullanır, bu nedenle projenize bu kütüphaneyi de dahil etmeniz gerekir. Ayrıca kütüphanenin Android'te doğru şekilde çalışabilmesi için React versiyonunuzun en az `16.7.0` React Native versiyonunuzunda en az `0.57.8` olması gerekir.


#### Kütüphaneye projeyi dahil edin

```
yarn add https://github.com/eraydemirok/react-native-card-swiper
```

veya

```
npm install https://github.com/eraydemirok/react-native-card-swiper
```


#### Android

1. `android/app/build.gradle` dosyasını açın ve içine şu kodu ekleyin

   ```
   include ':react-native-card-swiper'
   project(':react-native-card-swiper').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-card-swiper/android')
   ```
   
2. `android/settings.gradle` dosyasını açın ve `dependencies` bloğuna şu kodu ekleyin

   ```
     compile project(':react-native-card-swiper')
   ```
   
3. Projenizi senkron edin (Sync Now)

4. `android/app/src/main/java/[...]/MainActivity.java` dosyanızı açın ve şu aşamaları takip edin

- `import com.eraydemirok.react_native_card_swiper.CardSwiperPackage;` kodunu import alanına ekleyin
- `getPackages()` methodunun içine `new CardSwiperPackage()` kodunu ekleyin


## Kullanım

Kütüphaneyi aşağıdaki gibi kullanabilirsiniz


#### Import

```javascript
import { CardStack, Card } from "react-native-card-swiper";
```


#### Render

```javascript
return (
  <CardStack>
    <Card>
      <Text>Example</Text>
    </Card>
  </CardStack>
);
```


#### Props (CardStack)

| Adı               | Default | Tipi   | Açıklama                                                                                                          |
| ----------------- | ------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| horizontalOnly    | true    | bool   | Kartların sadece yatay olarak hareket etmesini sağlar.                                                            |
| padding           | 16      | number | Kartların yığından uzaklığını ayarlar.                                                                            |
| inactiveCardScale | 0.95    | number | Alttan gelen kartların boyunu ayarlar.                                                                            |
| activeCardRotate  | 10      | number | Kartların kayrıdıldığındaki dönüş açısını ayarlar.                                                                |
| renderNoMoreCard  | null    | func   | Kartlar tükendiğinde yığında render eilecek alanı ayarlar.                                                        |
| onLike            | -       | func   | Kart sağa kaydırıldığında tetiklenir, kaydırılan kartın index değerini döner.                                     |
| onDislike         | -       | func   | Kart sola kaydırıldığında tetiklenir, kaydırılan kartın index değerini döner.                                     |
| onSuperlike       | -       | func   | Kart yukarı kaydırıldığında tetiklenir, kaydırılan kartın index değerini döner.                                   |
| onUndo            | -       | func   | Son kart geri çağırıldığında tetiklenir, geri alınan kartın index değerini döner.                                 |
| onCardIsOver      | -       | func   | Yığında kart bittiğinde tetiklenir.                                                                               |
| canBeUndone       | -       | func   | Yığında geri alınabilir kart var mı, yok mu durumunu bildirir, true veya false değeri döner.                      |
| onAnimated        | -       | func   | Yığının en üstündeki kartın animated değerini döner, kart her değiştiğinde en üstteki kart için veri güncellenir. |


#### Props (Card)

| Adı       | Default     | Tipi   | Açıklama                            |
| --------- | ----------- | ------ | ----------------------------------- |
| radius    | 0           | number | Kartın köşe ovalliklerini belirler. |
| color     | transparent | string | Kartın arkaplan rengini belirler.   |
| elevation | 0           | number | Kartın gölgesini belirler.          |


#### Methodlar (CardStack)

Bu methodlar `CardStack`'ten ref alınarak kullanılır.

| Adı       | Açıklama                         |
| --------- | -------------------------------- |
| like      | Beğenme işlemini tetikler.       |
| dislike   | Beğenmeme işlemini tetikler.     |
| superlike | Süper beğenme işlemini tetikler. |
| undo      | Son kartı geri çağırır.          |
