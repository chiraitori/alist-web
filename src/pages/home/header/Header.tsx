import {
  HStack,
  useColorModeValue,
  Image,
  Center,
  Icon,
  Kbd,
  CenterProps,
} from "@hope-ui/solid"
import { changeColor } from "seemly"
import { Show, createMemo } from "solid-js"
import { getMainColor, getSetting, local, objStore, State } from "~/store"
import { BsSearch } from "solid-icons/bs"
import { CenterLoading } from "~/components"
import { Container } from "../Container"
import { bus } from "~/utils"
import { Layout } from "./layout"
import { isMac } from "~/utils/compatibility"

export const Header = () => {
  const logos = getSetting("logo").split("\n")
  const logo = useColorModeValue(logos[0], logos.pop())

  const stickyProps = createMemo<CenterProps>(() => {
    switch (local["position_of_header_navbar"]) {
      case "sticky":
        return { position: "sticky", zIndex: "$sticky", top: 0 }
      default:
        return { position: undefined, zIndex: undefined, top: undefined }
    }
  })

  return (
    <Center
      {...stickyProps}
      class="header"
      w="$full"
      css={{
        "background": "rgba(var(--hope-colors-background), 0.4)",
        "backdrop-filter": "blur(12px)",
        "-webkit-backdrop-filter": "blur(12px)",
        "border-bottom": "1px solid rgba(255, 255, 255, 0.1)",
        "box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <HStack
          px="calc(2% + 0.5rem)"
          py="$2"
          w="$full"
          justifyContent="space-between"
        >
          <HStack class="header-left" h="44px">
            <Image
              src={logo()!}
              h="$full"
              w="auto"
              fallback={<CenterLoading />}
            />
          </HStack>
          <HStack class="header-right" spacing="$2">
            <Show when={objStore.state === State.Folder}>
              <Show when={getSetting("search_index") !== "none"}>
                <HStack
                  w="$32"
                  p="$1"
                  rounded="$md"
                  justifyContent="space-between"
                  cursor="pointer"
                  color={getMainColor()}
                  css={{
                    "background": "rgba(var(--hope-colors-background), 0.3)",
                    "backdrop-filter": "blur(8px)",
                    "-webkit-backdrop-filter": "blur(8px)",
                    "border": "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  _hover={{
                    background: "rgba(var(--hope-colors-background), 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  onClick={() => {
                    bus.emit("tool", "search")
                  }}
                >
                  <Icon 
                    as={BsSearch} 
                    boxSize="$5"
                    p="$1"
                    rounded="$full"
                    bg="rgba(var(--hope-colors-background), 0.3)"
                  />
                  <HStack>
                    {isMac ? <Kbd>Cmd</Kbd> : <Kbd>Ctrl</Kbd>}
                    <Kbd>K</Kbd>
                  </HStack>
                </HStack>
              </Show>
              <Layout />
            </Show>
          </HStack>
        </HStack>
      </Container>
    </Center>
  )
}
