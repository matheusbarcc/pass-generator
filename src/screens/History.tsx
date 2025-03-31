import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import { SectionList } from "react-native";
import { useEffect, useState } from "react";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import { PasswordCard } from "../components/PasswordCard";
import { EmptyList } from "../components/EmptyList";
import { useNavigation } from "@react-navigation/native";
import { getAllPasswords } from "../storage/get-all-passwords";
import { DayList } from "../storage/storageConfig";


export function History() {
  const [passwordsDayLists, setPasswordsDayLists] = useState<DayList[]>([])
  const [clipboard, setClipboard] = useState('')

  const { goBack } = useNavigation()

  async function fetchPasswords() {
    const dayLists = await getAllPasswords()

    console.log(dayLists)

    setPasswordsDayLists(dayLists)
  }

  function handleGoBack() {
    goBack()
  }

  useEffect(() => {
    fetchPasswords()
  }, [])

  function copyPassword(password: string) {
    setClipboard(password)
  }

  return (
    <>
      <HStack
        bg="$base100"
        pt="$16"
        pb="$7"
        alignItems="flex-end"
        justifyContent="center"
        borderBottomLeftRadius="$3xl"
        borderBottomRightRadius="$3xl"
      >
        <HStack
          w="$full"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Pressable
            position="absolute"
            left={24}
            onPress={handleGoBack}
          >
            <ArrowLeft
              color="#103214"
            />
          </Pressable>

          <Heading
            textTransform="uppercase"
            fontSize="$xl"
            color="$green700"
          >
            Histórico
          </Heading>
        </HStack>
      </HStack>
      <VStack
        px="$6"
        bg="$background"
        flex={1}
      >
        <SectionList
          sections={passwordsDayLists}
          keyExtractor={(item) => item}
          renderItem={({ section, index }) => (
            <PasswordCard
              content={section.data[index]}
              clipboard={clipboard}
              copyPassword={copyPassword}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$green800"
              fontSize="$lg"
              mt="$10"
              mb="$4"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            passwordsDayLists.length === 0 ? {
              flex: 1,
              justifyContent: 'center',
              paddingBottom: 32,
            } : {
              paddingBottom: 32,
            }
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList />
          }
        />
      </VStack>
    </>
  )
}