import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Modal, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
];

export default function AuthScreen() {
  const [mode, setMode] = useState<'landing' | 'login' | 'signup'>('landing');
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');

  // New input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const router = useRouter();

  const getRequirements = (pass: string) => [
    { label: 'Minimum 8 characters', met: pass.length >= 8 },
    { label: '1 Uppercase letter', met: /[A-Z]/.test(pass) },
    { label: '1 Number', met: /[0-9]/.test(pass) },
    { label: '1 Special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(pass) },
  ];

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (pass.length < minLength) return 'Minimum 8 characters';
    if (!hasUpperCase) return 'At least 1 uppercase letter';
    if (!hasNumber) return 'At least 1 number';
    if (!hasSpecialChar) return 'At least 1 special character';
    return '';
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // iOS stays open, Android closes
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isSignupValid =
    name.trim().length > 0 &&
    validateEmail(email) &&
    mobile.length === 10 &&
    dob !== undefined &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    validatePassword(password) === '';

  const isLoginValid =
    validateEmail(loginEmail) &&
    loginPassword.trim().length > 0;

  const handleLogin = () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    if (!validateEmail(loginEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    router.replace('/(tabs)');
  };

  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (mobile.length !== 10) {
      Alert.alert('Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!dob) {
      Alert.alert('Date of Birth', 'Please select your date of birth.');
      return;
    }
    const passError = validatePassword(password);
    if (passError) {
      Alert.alert('Password Criteria', passError);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Account created successfully! Please log in.');
    setLoginEmail(email);
    setMode('login');
  };

  const handleForgotPassword = () => {
    Alert.alert('Reset Password', 'If an account exists for this email, you will receive a password reset link.');
  };

  const renderLanding = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => setMode('login')}
      >
        <ThemedText style={styles.loginButtonText}>Log in</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => setMode('signup')}
      >
        <ThemedText style={styles.signupButtonText}>Sign up</ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.form}>
      <ThemedText type="title" style={styles.formTitle}>Welcome Back</ThemedText>
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        style={styles.input}
        value={loginEmail}
        onChangeText={setLoginEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {loginEmail && !validateEmail(loginEmail) ? (
        <ThemedText style={styles.errorText}>Invalid email format</ThemedText>
      ) : null}
      <View style={styles.inputWithIconContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          secureTextEntry={!showLoginPassword}
          style={[styles.input, styles.innerInput]}
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowLoginPassword(!showLoginPassword)}
        >
          <Ionicons name={showLoginPassword ? "eye-off-outline" : "eye-outline"} size={22} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.forgotPasswordLink} 
        onPress={handleForgotPassword}
      >
        <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleLogin}
      >
        <ThemedText style={styles.loginButtonText}>Log in</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMode('signup')}>
        <ThemedText type="link" style={styles.switchText}>{"Don't have an account? Sign up"}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMode('landing')}>
        <ThemedText type="default" style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderSignupForm = () => (
    <View style={styles.form}>
      <ThemedText type="title" style={[styles.formTitle, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}>Create Account</ThemedText>

      <TextInput
        placeholder="Name"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        style={[styles.input, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}
        value={name}
        onChangeText={setName}
        editable={!showDatePicker && !showCountryPicker}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        keyboardType="email-address"
        style={[styles.input, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!showDatePicker && !showCountryPicker}
      />
      {email && !validateEmail(email) && !showDatePicker && !showCountryPicker ? (
        <ThemedText style={styles.errorText}>Invalid email format</ThemedText>
      ) : null}
      <View style={[styles.inputWithIconContainer, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}>
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={() => !showDatePicker && setShowCountryPicker(true)}
          disabled={showDatePicker}
        >
          <ThemedText style={styles.countryCodeText}>
            {selectedCountry.flag} {selectedCountry.code}
          </ThemedText>
          <Ionicons name="chevron-down" size={12} color="rgba(255, 255, 255, 0.4)" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          keyboardType="phone-pad"
          maxLength={10}
          style={[styles.input, styles.innerInput]}
          editable={!showDatePicker && !showCountryPicker}
          value={mobile}
          onChangeText={setMobile}
        />
      </View>

      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <ThemedText style={styles.pickerTitle}>Select Country</ThemedText>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Search country..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              style={styles.searchBar}
              onChangeText={setSearchCountry}
              value={searchCountry}
            />
            <ScrollView style={{ maxHeight: height * 0.6 }}>
              {COUNTRY_CODES.filter(c =>
                c.country.toLowerCase().includes(searchCountry.toLowerCase()) ||
                c.code.includes(searchCountry)
              ).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryPicker(false);
                    setSearchCountry('');
                  }}
                >
                  <ThemedText style={styles.countryItemFlag}>{item.flag}</ThemedText>
                  <ThemedText style={styles.countryItemName}>{item.country}</ThemedText>
                  <ThemedText style={styles.countryItemCode}>{item.code}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.inputWithIconContainer, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}
        onPress={() => {
          if (!showCountryPicker) {
            Keyboard.dismiss();
            setShowDatePicker(!showDatePicker);
          }
        }}
        activeOpacity={0.8}
        disabled={showCountryPicker}
      >
        <TextInput
          placeholder="Date of Birth (DD-MM-YYYY)"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          style={[styles.input, styles.innerInput]}
          value={formatDate(dob)}
          editable={false}
          pointerEvents="none"
        />
        <View style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={22} color="rgba(255, 255, 255, 0.7)" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#BCC7CE', '#D2DBE0']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.modalPickerCard}
          >
            <View style={styles.pickerHeader}>
              <ThemedText style={[styles.pickerLabel, { color: '#334155', flex: 1, textAlign: 'center' }]}>Select a date</ThemedText>
              <TouchableOpacity onPress={() => setShowDatePicker(false)} style={{ position: 'absolute', right: 0 }}>
                <Ionicons name="close-circle-outline" size={22} color="#334155" />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerColumnHeaders}>
              <ThemedText style={[styles.pickerColumnLabel, { color: 'rgba(51, 65, 85, 0.6)', flex: 1 }]}>Day</ThemedText>
              <ThemedText style={[styles.pickerColumnLabel, { color: 'rgba(51, 65, 85, 0.6)', flex: 1 }]}>Month</ThemedText>
              <ThemedText style={[styles.pickerColumnLabel, { color: 'rgba(51, 65, 85, 0.6)', flex: 1 }]}>Year</ThemedText>
            </View>
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display="spinner"
              onChange={onDateChange}
              maximumDate={new Date()}
              themeVariant="light"
              textColor="#000000"
              style={styles.picker}
            />
            <TouchableOpacity
              style={[styles.modalDoneButton, styles.loginButton]}
              onPress={() => setShowDatePicker(false)}
            >
              <ThemedText style={styles.modalDoneButtonText}>Done</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      <View style={[styles.inputWithIconContainer, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          secureTextEntry={!showPassword}
          style={[styles.input, styles.innerInput]}
          value={password}
          onChangeText={handlePasswordChange}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          editable={!showDatePicker && !showCountryPicker}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => !showDatePicker && !showCountryPicker && setShowPassword(!showPassword)}
          disabled={showDatePicker || showCountryPicker}
        >
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      {isPasswordFocused && !showDatePicker && !showCountryPicker && (
        <View style={styles.requirementContainer}>
          {getRequirements(password).map((req, index) => (
            <View key={index} style={styles.requirementItem}>
              <Ionicons
                name={req.met ? "checkmark-circle" : "ellipse-outline"}
                size={14}
                color={req.met ? "#4CAF50" : "rgba(255, 255, 255, 0.4)"}
              />
              <ThemedText style={[styles.requirementText, req.met && styles.requirementMetText]}>
                {req.label}
              </ThemedText>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.inputWithIconContainer, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          secureTextEntry={!showConfirmPassword}
          style={[styles.input, styles.innerInput]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!showDatePicker && !showCountryPicker}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => !showDatePicker && !showCountryPicker && setShowConfirmPassword(!showConfirmPassword)}
          disabled={showDatePicker || showCountryPicker}
        >
          <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>
      {confirmPassword && password !== confirmPassword && !showDatePicker && !showCountryPicker ? (
        <ThemedText style={[styles.errorText, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }]}>Passwords do not match</ThemedText>
      ) : null}
      <TouchableOpacity
        style={[styles.button, styles.signupButton, (!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.18 }]}
        onPress={handleSignup}
        disabled={showDatePicker || showCountryPicker}
      >
        <ThemedText style={styles.signupButtonText}>Sign up</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => !showDatePicker && !showCountryPicker && setMode('login')}
        disabled={showDatePicker || showCountryPicker}
        style={(!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }}
      >
        <ThemedText type="link" style={styles.switchText}>Already have an account? Log in</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => !showDatePicker && !showCountryPicker && setMode('landing')}
        disabled={showDatePicker || showCountryPicker}
        style={(!showDatePicker && !showCountryPicker) ? {} : { opacity: 0.35 }}
      >
        <ThemedText type="default" style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('@/assets/images/auth-bg-clean.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.content}>
            {mode === 'landing' && (
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.header}
              >
                <ThemedText type="title" style={styles.welcomeHeaderText}>Welcome</ThemedText>
              </Animated.View>
            )}

            {mode === 'landing' && renderLanding()}
            {(mode === 'login' || mode === 'signup') && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {mode === 'login' ? renderLoginForm() : renderSignupForm()}
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Very light overlay, just for slightly better contrast
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: height * 0.15, // Slightly above absolute center to account for buttons
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Allow touches to pass through to buttons
  },
  welcomeHeaderText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 44,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: height * 0.05,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  formContainer: {
    flexDirection: 'row', // side-by-side
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1, // share the width when in a row
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  loginButton: {
    backgroundColor: '#0E818C',
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  signupButtonText: {
    color: '#0A1A1F',
    fontSize: 18,
    fontWeight: '700',
  },
  form: {
    gap: 18,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  formTitle: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 28,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 0, // removed marginBottom here, added gap manually in forms
  },
  inputWithIconContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 14,
    paddingRight: 6,
    overflow: 'hidden',
  },
  innerInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  iconButton: {
    padding: 10,
  },
  switchText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  backText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#ddd',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 2,
    marginRight: 4,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  modalPickerCard: {
    width: width * 0.85,
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignSelf: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  modalDoneButton: {
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalDoneButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  picker: {
    width: '100%',
    height: 130,
    transform: [{ scale: 0.85 }],
  },
  pickerColumnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
    paddingHorizontal: 0,
    marginTop: 8,
  },
  pickerColumnLabel: {
    flex: 1,
    color: '#1F2937',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  inlineDoneButton: {
    marginTop: 5,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  pickerDoneText: {
    color: '#0E818C',
    fontSize: 12,
    fontWeight: '600',
  },

  pickerLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 0,
    textAlign: 'center',
  },

  errorText: {
    color: '#FF4B4B',
    fontSize: 12,
    marginTop: -10,
    marginLeft: 4,
  },
  requirementContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    marginTop: -10,
    gap: 6,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  requirementMetText: {
    color: '#4CAF50',
  },
  countryCodeContainer: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  countryCodeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginVertical: 15,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  countryItemFlag: {
    fontSize: 20,
    marginRight: 15,
  },
  countryItemName: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  countryItemCode: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
