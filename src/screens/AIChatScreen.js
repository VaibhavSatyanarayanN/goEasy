import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import getChatResponse from '../data/chatResponses';

export default function AIChatScreen({ route, navigation }) {
  // Get destinationName if available (defaults to 'Japan')
  const destinationName = route.params?.destinationName || 'Japan';

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hi! I'm your AI travel assistant. I can help refine your TripBoard for ${destinationName}. Ask me to suggest local food, find cheaper hotels, or change activities!`,
      chips: ['Change hotel', 'Cheaper flights', 'Local food spots', 'Add activity']
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: text,
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // 2. Show Typing Indicator
    setIsTyping(true);

    // 3. Simulate Bot Reply after 1.5s delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getChatResponse(text, destinationName);
      
      const botMsg = {
        id: `m-bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        chips: botResponse.chips,
      };

      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const handleChipPress = (chipText) => {
    handleSend(chipText);
  };

  const renderMessageItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.bubbleWrapper, isUser ? styles.userWrapper : styles.botWrapper]}>
        {/* Avatar for bot */}
        {!isUser && (
          <View style={styles.botAvatar}>
            <Ionicons name="sparkles" size={12} color="#ffffff" />
          </View>
        )}

        <View style={styles.bubbleContent}>
          {isUser ? (
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.userBubble}
            >
              <Text style={styles.userBubbleText}>{item.text}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.botBubble}>
              <Text style={styles.botBubbleText}>{item.text}</Text>
            </View>
          )}

          {/* Render Action Chips under Bot message */}
          {!isUser && item.chips && item.chips.length > 0 && (
            <View style={styles.chipsRow}>
              {item.chips.map((chip, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.chip}
                  onPress={() => handleChipPress(chip)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <View style={styles.onlineIndicatorRow}>
            <View style={styles.indicatorDot} />
            <Text style={styles.indicatorText}>Ready to refine {destinationName}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isTyping && (
              <View style={[styles.bubbleWrapper, styles.botWrapper, { marginBottom: 12 }]}>
                <View style={styles.botAvatar}>
                  <Ionicons name="sparkles" size={12} color="#ffffff" />
                </View>
                <View style={[styles.botBubble, styles.typingBubble]}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              </View>
            )
          }
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask AI to change hotels, add days..."
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !inputText.trim() && styles.disabledSendBtn]}
            onPress={() => handleSend()}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  onlineIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  indicatorText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  closeBtn: {
    padding: spacing.xs,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  bubbleWrapper: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    alignItems: 'flex-end',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  botWrapper: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginBottom: 2,
  },
  bubbleContent: {
    maxWidth: '85%',
  },
  userBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: spacing.borderRadius.md,
    borderBottomRightRadius: 2,
  },
  userBubbleText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  botBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    borderBottomLeftRadius: 2,
    ...spacing.shadows.sm,
  },
  botBubbleText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  typingBubble: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 0.5,
    borderColor: colors.cardBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: spacing.borderRadius.full,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.text,
    marginRight: spacing.sm,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...spacing.shadows.sm,
  },
  disabledSendBtn: {
    backgroundColor: '#cbd5e1',
  },
});
