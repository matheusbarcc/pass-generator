import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid'
import * as Clipboard from 'expo-clipboard'

import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";
import ClockCounterClockwise from "phosphor-react-native/src/icons/ClockCounterClockwise";
import Lock from "phosphor-react-native/src/icons/Lock";

import { DsButton } from "../components/DsButton";
import { useState } from "react";

export function Home() {
  const [password, setPassword] = useState('')
  const { navigate } = useNavigation()

  function handleNewPassword() {
    const newPassword = uuidv4().slice(1, 8)

    setPassword(newPassword)
  }

  function handleCopyPassword() {
    Clipboard.setStringAsync(password)
  }

  function handleHistory() {
    navigate('history')
  }

  return (
    <>
      <VStack
        pt="$16"
        px="$6"
        bg="$background"
        flex={1}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$4xl" fontFamily="$heading" color="$green700">
            PassGen
          </Text>

          <DsButton
            h="$12"
            w="$12"
            borderRadius="$lg"
            bg="$green700"
            alignItems="center"
            justifyContent="center"
            onPress={handleHistory}
          >
            <ClockCounterClockwise color="#FFF" />
          </DsButton>
        </HStack>

        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <HStack
            w="$full"
            h="$16"
            p="$4"
            justifyContent="center"
            alignItems="center"
            bg="$base100"
            borderWidth={1}
            borderColor="$base500"
            borderRadius="$xl"
            position="relative"
          >
            <Lock
              color='#E4E4E4'
              style={{
                position: 'absolute',
                left: 24,
              }}
            />
            <Text fontFamily="$body" color="$black" fontSize="$2xl">
              {password ? password : <Text color='$base500'>Senha</Text>}
            </Text>
          </HStack>
          <Text
            w="$64"
            mt="$2"
            textAlign="center"
            fontSize="$xs"
            color="$base700"
          >
            As senhas geradas são únicas, você pode vê-las no histórico.
          </Text>
        </VStack>
      </VStack>
      <VStack
        pt="$6"
        pb="$16"
        px="$6"
        bg="$base100"
        gap="$3"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
      >
        <DsButton title="Gerar senha" onPress={handleNewPassword} />
        <DsButton title="Copiar" type="secondary" onPress={handleCopyPassword}>
          <ClipboardText weight="bold" color="#103214" />
        </DsButton>
      </VStack>
    </>
  )
}