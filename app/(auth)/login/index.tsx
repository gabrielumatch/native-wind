import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/sessions`,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Here you would typically store the token
      // and handle the authentication state
      router.replace("/(app)");
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <View className="w-full max-w-sm space-y-6">
        <View className="space-y-2">
          <Text className="text-2xl font-bold text-center text-gray-900">
            Login
          </Text>
          <Text className="text-gray-500 text-center">
            Please enter your credentials
          </Text>
        </View>

        <View className="space-y-4">
          {error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : null}

          <View className="space-y-2">
            <Text className="text-gray-700">Email</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="space-y-2">
            <Text className="text-gray-700">Password</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="w-full bg-blue-600 p-4 rounded-lg items-center"
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
