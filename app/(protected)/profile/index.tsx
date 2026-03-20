import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/authContext";
import { Button } from "react-native-paper";
import SignOutButton from "@/components/logout";

const Profile = () => {
  return (
    <Screen>
      <Text>Profile</Text>
      <SignOutButton />
    </Screen>
  );
};

export default Profile;

const styles = StyleSheet.create({});
