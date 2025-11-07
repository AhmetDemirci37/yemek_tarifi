import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [starScale] = useState(new Animated.Value(1));
  const [heartScale] = useState(new Animated.Value(1));

  const animatePress = (scale) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (tab) => {
    setActiveTab(tab);
    if (tab === 'star') {
      animatePress(starScale);
    } else if (tab === 'heart') {
      animatePress(heartScale);
    }
  };
  return (
    <SafeAreaView style={styles.appContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.menuButton} accessible accessibilityLabel="menu">
            <View style={styles.menuLine} />
            <View style={[styles.menuLine, { width: 14 }]} />
            <View style={[styles.menuLine, { width: 18 }]} />
          </TouchableOpacity>

          <Text style={styles.greeting}>Yemek Tarifleri</Text>

          <TouchableOpacity style={styles.avatar} accessible accessibilityLabel="profile">
            <Text style={styles.avatarText}>U</Text>
          </TouchableOpacity>
        </View>

        {/* Search box overlaps bottom of header */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Arama yapın"
            placeholderTextColor="#9aa"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchIcon} accessible accessibilityLabel="search">
            <Text style={{fontSize:16}}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content with scrollable sections */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ana Yemek Section */}
        <View>
          <Text style={styles.sectionTitle}>Ana Yemekler</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcyJaq65zm1cJiyL1dWMu-G2wUe13sfsM9A&s' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Kuru Fasulye</Text>
                <Text style={styles.productPrice}>200 Kalori</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://www.berceste.com.tr/idea/dm/86/myassets/blogs/pilav-tarifi-tane-tane.jpg?revision=1628682122' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Pirinç Pilavı</Text>
                <Text style={styles.productPrice}>540 kalori</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://www.hamzaefendi.com.tr/-324-28-O.jpg' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Kadayıf</Text>
                <Text style={styles.productPrice}>350 kalori</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tatlılar Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tatlılar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://cdn.yemek.com/mncrop/600/315/uploads/2015/04/firin-sutlac-tarifi.jpg' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Sütlaç</Text>
                <Text style={styles.productPrice}>280 kalori</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://cdn.yemek.com/mncrop/600/315/uploads/2020/11/baklava-tarifi.jpg' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Baklava</Text>
                <Text style={styles.productPrice}>420 kalori</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productCard}>
              <Image 
                source={{ uri: 'https://cdn.yemek.com/mncrop/600/315/uploads/2021/10/kunefe-tarifi.jpg' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Künefe</Text>
                <Text style={styles.productPrice}>380 kalori</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handlePress('star')}
          accessible 
          accessibilityLabel="favorites"
        >
          <View style={styles.navItemContent}>
            <Animated.Text 
              style={[
                styles.navIcon, 
                { transform: [{ scale: starScale }] },
                activeTab === 'star' && styles.activeNavIcon
              ]}
            >
              ⭐
            </Animated.Text>
            <Text 
              style={[
                styles.navText,
                activeTab === 'star' && styles.activeNavText
              ]}
            >
              Favoriler
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handlePress('heart')}
          accessible 
          accessibilityLabel="likes"
        >
          <View style={styles.navItemContent}>
            <Animated.Text 
              style={[
                styles.navIcon, 
                { transform: [{ scale: heartScale }] },
                activeTab === 'heart' && styles.activeNavIcon
              ]}
            >
              ♡
            </Animated.Text>
            <Text 
              style={[
                styles.navText,
                activeTab === 'heart' && styles.activeNavText
              ]}
            >
              Beğenilenler
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0FA46A', // green similar to screenshot
    paddingHorizontal: 18,
    paddingTop: 212,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 24,      // üst sol köşe yuvarlatma
    borderTopRightRadius: 24,     // üst sağ köşe yuvarlatma
    // ensure children that overlap (search) can position absolutely
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
  },
  menuLine: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginVertical: 2,
    width: 20,
    borderRadius: 2,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0FA46A',
    fontWeight: '700',
  },
  searchWrapper: {
    position: 'absolute',
    left: 18,
    right: 18,// sağdan boşluk
    bottom: -26,
    backgroundColor: '#fff',
    height: 52, // arama kutusu yüksekliği
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, //  arama içiboşluğu
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#222',
  },
  searchIcon: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
    marginTop: 36, // arama alanı için boşluk
    paddingHorizontal: 18,
  },
  section: {
    marginTop: 24, // kategoriler arası boşluk
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: '#0FA46A',
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activeNavIcon: {
    color: '#0c834d',
    textShadowColor: 'rgba(15, 164, 106, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  activeNavText: {
    color: '#0c834d',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
    color: '#222',
  },
  scrollView: {
    marginLeft: -18, // Container padding'i dengelemek için
    paddingLeft: 18,
  },
  productCard: {
    width: 200,
    height: 260, // sabit uzunluk
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  productPrice: {
    fontSize: 14,
    color: '#0FA46A',
    fontWeight: '600',
    marginTop: 4,
  },
});
